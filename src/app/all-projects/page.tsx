"use client";

import { projects } from "@/components/icons/project-vr/data";
import {
  fragmentShader,
  vertexShader,
} from "@/app/all-projects/_components/shaders";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const config = {
  cellSize: 0.75,
  zoomLevel: 1.25,
  lerpFactor: 0.075,
  borderColor: "rgba(255, 255, 255, 0.15)",
  backgroundColor: "rgba(0, 0, 0, 1)",
  textColor: "rgba(128, 128, 128, 1)",
  hoverColor: "rgba(255, 255, 255, 0)",
};

const ProjectsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);

  // State for interaction
  const isDraggingRef = useRef(false);
  const clickStartTimeRef = useRef<number>(0);
  const isClickRef = useRef<boolean>(false);
  // Refs for mouse and offset tracking
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: -1, y: -1 });
  const zoomLevelRef = useRef(1.0);
  const targetZoomRef = useRef(1.0);
  const textTextureRef = useRef<THREE.CanvasTexture[]>([]);
  const animationIdRef = useRef<number | null>(null);

  const rgbaToHex = (rgba: string) => {
    const match = rgba.match(/rgba?\(([^]+)\)/);
    if (!match) return [1, 1, 1, 1];
    return match[1]
      .split(",")
      .map((v, i) =>
        i < 3 ? parseFloat(v.trim()) / 255 : parseFloat(v.trim() || "1")
      );
  };

  const createTextTextureLocal = (title: string, year: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }
    ctx.clearRect(0, 0, 2048, 256);
    ctx.font = "80px Inter";
    ctx.fillStyle = config.textColor;
    ctx.textBaseline = "middle";
    ctx.imageSmoothingEnabled = false;

    ctx.textAlign = "left";
    ctx.fillText(title.toUpperCase(), 30, 128);
    ctx.textAlign = "right";
    ctx.fillText(year.toString().toUpperCase(), 2048 - 30, 128);

    const texture = new THREE.CanvasTexture(canvas);
    Object.assign(texture, {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      flipY: false,
      generateMipmaps: false,
      format: THREE.RGBAFormat,
    });

    return texture;
  };

  const createTextureAtlasLocal = (
    textures: THREE.Texture[],
    isText: boolean = false
  ) => {
    const atlasSize = Math.ceil(Math.sqrt(textures.length));
    const textureSize = 512;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = atlasSize * textureSize;
    const ctx = canvas.getContext("2d");

    if (isText) {
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    textures.forEach((texture, index) => {
      const x = (index % atlasSize) * textureSize;
      const y = Math.floor(index / atlasSize) * textureSize;

      if (isText && texture.source?.data && ctx) {
        ctx.drawImage(texture.source.data, x, y, textureSize, textureSize);
      } else if (!isText && texture.image?.complete && ctx) {
        ctx.drawImage(texture.image, x, y, textureSize, textureSize);
      }
    });

    const atlasTexture = new THREE.CanvasTexture(canvas);
    Object.assign(atlasTexture, {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      flipY: false,
    });

    return atlasTexture;
  };

  const loadTextures = () => {
    const textureLoader = new THREE.TextureLoader();
    const imageTextures: THREE.Texture[] = [];
    let loadedCount = 0;

    return new Promise((resolve) => {
      projects.forEach((project) => {
        const texture = textureLoader.load(project.image, () => {
          if (++loadedCount === projects.length) resolve(imageTextures);
        });

        Object.assign(texture, {
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
        });

        imageTextures.push(texture);
        textTextureRef.current.push(
          createTextTextureLocal(project.title, project.year)
        );
      });
    });
  };

  const updateMousePosition = (event: { clientX: number; clientY: number }) => {
    if (!rendererRef.current) return;
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    mousePositionRef.current.x = event.clientX - rect.left;
    mousePositionRef.current.y = event.clientY - rect.top;
    (
      planeRef.current?.material as THREE.ShaderMaterial
    ).uniforms.uMousePos.value.set(
      mousePositionRef.current.x,
      mousePositionRef.current.y
    );
  };

  const startDrag = (x: number, y: number) => {
    isDraggingRef.current = true;
    isClickRef.current = true;
    clickStartTimeRef.current = Date.now();
    document.body.classList.add("dragging");
    previousMouseRef.current.x = x;
    previousMouseRef.current.y = y;
    setTimeout(() => {
      if (isDraggingRef.current) targetZoomRef.current = config.zoomLevel;
    }, 150);
  };

  const onPointDown = (e: { clientX: number; clientY: number }) => {
    isClickRef.current = true;
    isDraggingRef.current = false;
    clickStartTimeRef.current = Date.now();

    document.body.classList.add("dragging");
    startDrag(e.clientX, e.clientY);
  };

  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMouseMove = (
    currentX: number | undefined,
    currentY: number | undefined
  ) => {
    if (
      !isDraggingRef.current ||
      currentX === undefined ||
      currentY === undefined
    )
      return;
    const deltaX = currentX - previousMouseRef.current.x;
    const deltaY = currentY - previousMouseRef.current.y;
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      isClickRef.current = true;
      if (targetZoomRef.current === 1.0)
        targetZoomRef.current = config.zoomLevel;
    }
    targetOffsetRef.current.x += (deltaX / window.innerWidth) * 2;
    targetOffsetRef.current.y += (deltaY / window.innerHeight) * 2;
    previousMouseRef.current.x = currentX;
    previousMouseRef.current.y = currentY;
  };

  const onPointMove = (e: {
    clientX: number | undefined;
    clientY: number | undefined;
  }) => {
    handleMouseMove(e.clientX, e.clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    handleMouseMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onPointUp = (event: MouseEvent | TouchEvent) => {
    console.log("[onPointUp] start", event.type, {
      isClick: isClickRef.current,
      clickDuration: Date.now() - clickStartTimeRef.current,
      hasRenderer: !!rendererRef.current,
    });

    document.body.classList.remove("dragging");
    isDraggingRef.current = false;
    targetZoomRef.current = 1.0;

    const clickDuration = Date.now() - clickStartTimeRef.current;

    if (isClickRef.current && clickDuration < 200) {
      console.log("[onPointUp] inside click check");

      let endX: number | undefined;
      let endY: number | undefined;

      if ("changedTouches" in event && event.changedTouches.length > 0) {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
      } else if ("clientX" in event && "clientY" in event) {
        endX = (event as MouseEvent).clientX;
        endY = (event as MouseEvent).clientY;
      }

      console.log("[onPointUp] coords", { endX, endY });

      if (endX !== undefined && endY !== undefined && rendererRef.current) {
        console.log("[onPointUp] has renderer, calculating texIndex");
        const rect = rendererRef.current.domElement.getBoundingClientRect();
        const screenX = ((endX - rect.left) / rect.width) * 2 - 1;
        const screenY = ((endY - rect.top) / rect.height) * 2 - 1;

        // Distortion
        const radius = Math.sqrt(screenX * screenX + screenY * screenY);
        const distortion = 1.0 - 0.08 * radius * radius;

        const worldX = screenX * distortion * (rect.width / rect.height);
        const worldY =
          screenY * distortion * zoomLevelRef.current + offsetRef.current.y;

        const cellX = Math.floor(worldX / config.cellSize);
        const cellY = Math.floor(worldY / config.cellSize);
        const numCols = Math.ceil(Math.sqrt(projects.length));

        let texIndex = (cellX + cellY * numCols) % projects.length;
        if (texIndex < 0) texIndex += projects.length;

        if (projects[texIndex]?.href) {
          window.location.href = projects[texIndex].href;
        }
      }
    }

    // Reset
    isClickRef.current = false;
  };

  const onWindowResize = () => {
    const container = containerRef.current;
    if (
      !container ||
      !cameraRef.current ||
      !rendererRef.current ||
      !planeRef.current
    )
      return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const aspect = width / height;

    // cập nhật camera theo aspect
    cameraRef.current.left = -aspect;
    cameraRef.current.right = aspect;
    cameraRef.current.top = 1;
    cameraRef.current.bottom = -1;
    cameraRef.current.updateProjectionMatrix();

    // scale plane để phủ đầy viewport
    planeRef.current.scale.set(aspect, 1, 1);

    // cập nhật renderer + uniforms
    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    (
      planeRef.current.material as THREE.ShaderMaterial
    ).uniforms.uResolution.value.set(width, height);
  };
  const animate = () => {
    animationIdRef.current = requestAnimationFrame(animate);

    offsetRef.current.x +=
      (targetOffsetRef.current.x - offsetRef.current.x) * config.lerpFactor;
    offsetRef.current.y +=
      (targetOffsetRef.current.y - offsetRef.current.y) * config.lerpFactor;
    zoomLevelRef.current +=
      (targetZoomRef.current - zoomLevelRef.current) * config.lerpFactor;

    const shaderMaterial = planeRef.current?.material as THREE.ShaderMaterial;
    if (shaderMaterial?.uniforms) {
      shaderMaterial.uniforms.uOffset.value.set(
        offsetRef.current.x,
        offsetRef.current.y
      );
      shaderMaterial.uniforms.uZoom.value = zoomLevelRef.current;
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  const init = async () => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize Three.js scene
    sceneRef.current = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    cameraRef.current = new THREE.OrthographicCamera(
      -aspect,
      aspect,
      1,
      -1,
      0.1,
      10
    );
    cameraRef.current.position.set(0, 0, 1);

    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    rendererRef.current.setSize(container.offsetWidth, container.offsetHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.domElement.style.position = "absolute";
    rendererRef.current.domElement.style.top = "0";
    rendererRef.current.domElement.style.left = "0";
    const bgColor = rgbaToHex(config.backgroundColor);
    rendererRef.current.setClearColor(
      new THREE.Color(bgColor[0], bgColor[1], bgColor[2]),
      bgColor[3]
    );
    container.appendChild(rendererRef.current.domElement);

    // Load textures and create atlases
    const imageTextures = (await loadTextures()) as THREE.Texture[];
    const imageAtlas = createTextureAtlasLocal(imageTextures, false);
    const textAtlas = createTextureAtlasLocal(textTextureRef.current, true);

    // Create shader uniforms
    const uniforms = {
      uOffset: { value: new THREE.Vector2(0, 0) },
      uResolution: {
        value: new THREE.Vector2(container.offsetWidth, container.offsetHeight),
      },
      uBorderColor: {
        value: new THREE.Vector4(...rgbaToHex(config.borderColor)),
      },
      uHoverColor: {
        value: new THREE.Vector4(...rgbaToHex(config.hoverColor)),
      },
      uBackgroundColor: {
        value: new THREE.Vector4(...rgbaToHex(config.backgroundColor)),
      },
      uMousePos: { value: new THREE.Vector2(-1, -1) },
      uZoom: { value: 1.0 },
      uCellSize: { value: config.cellSize },
      uTextureCount: { value: projects.length },
      uImageAtlas: { value: imageAtlas },
      uTextAtlas: { value: textAtlas },
    };

    // Create geometry and material
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    planeRef.current = new THREE.Mesh(geometry, material);
    planeRef.current.scale.set(aspect, 1, 1); // <-- QUAN TRỌNG
    sceneRef.current.add(planeRef.current);

    // Start animation loop
    animate();
  };

  const setupEventListeners = () => {
    const canvas = rendererRef.current?.domElement;
    if (!canvas) return;

    // Sự kiện chuột
    canvas.addEventListener("mousedown", onPointDown);
    canvas.addEventListener("mousemove", onPointMove);
    canvas.addEventListener("mouseup", onPointUp);
    canvas.addEventListener("mouseleave", onPointUp);

    // Sự kiện cảm ứng
    const passiveOpts = { passive: false };
    canvas.addEventListener("touchstart", onTouchStart, passiveOpts);
    canvas.addEventListener("touchmove", onTouchMove, passiveOpts);
    canvas.addEventListener("touchend", onPointUp, passiveOpts);

    // Sự kiện cửa sổ
    window.addEventListener("resize", onWindowResize);
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());

    // Cập nhật vị trí chuột
    canvas.addEventListener("mousemove", updateMousePosition);
    canvas.addEventListener("mouseleave", () => {
      mousePositionRef.current.x = mousePositionRef.current.y = -1;
      (
        planeRef.current?.material as THREE.ShaderMaterial
      ).uniforms.uMousePos.value.set(-1, -1);
    });
  };

  const removeEventListeners = () => {
    const canvas = rendererRef.current?.domElement;
    if (!canvas) return;

    canvas.removeEventListener("mousedown", onPointDown);
    canvas.removeEventListener("mousemove", onPointMove);
    canvas.removeEventListener("mouseup", onPointUp);
    canvas.removeEventListener("mouseleave", onPointUp);

    const passiveOpts = { passive: false } as AddEventListenerOptions;
    canvas.removeEventListener(
      "touchstart",
      onTouchStart as EventListener,
      passiveOpts
    );
    canvas.removeEventListener(
      "touchmove",
      onTouchMove as EventListener,
      passiveOpts
    );
    canvas.removeEventListener(
      "touchend",
      onPointUp as EventListener,
      passiveOpts
    );
    window.addEventListener("mouseup", onPointUp);
    window.addEventListener("touchend", onPointUp);
    window.removeEventListener("resize", onWindowResize);
    canvas.removeEventListener("contextmenu", (e) => e.preventDefault());

    canvas.removeEventListener("mousemove", updateMousePosition);
    canvas.removeEventListener("mouseleave", () => {
      mousePositionRef.current.x = mousePositionRef.current.y = -1;
      (
        planeRef.current?.material as THREE.ShaderMaterial
      ).uniforms.uMousePos.value.set(-1, -1);
    });
  };

  // Setup event listeners
  useEffect(() => {
    const start = async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await init();
      setupEventListeners();
      onWindowResize();
      setTimeout(onWindowResize, 0);
    };

    start();

    return () => {
      removeEventListeners();
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (planeRef.current) {
        planeRef.current.geometry.dispose();
        if (Array.isArray(planeRef.current.material)) {
          planeRef.current.material.forEach((mat) => mat.dispose());
        } else {
          planeRef.current.material.dispose();
        }
      }
      textTextureRef.current.forEach((texture) => texture.dispose());
    };
  }, []);

  return (
    <section ref={containerRef} id="gallery" className="cursor-grabbing">
      <div className="vignette-overplay" />
    </section>
  );
};

export default ProjectsPage;
