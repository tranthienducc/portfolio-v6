"use client";
import Image from "next/image";
import { fragmentShader, vertexShader } from "./sharders";
import * as THREE from "three";
import React, { useEffect, useRef } from "react";

const InversionLens = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const isMouseInsideContainer = useRef(false);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const isSetupCompleteRef = useRef(false);

  const uniformsRef = useRef<{
    u_texture: { value: THREE.Texture };
    u_mouse: { value: THREE.Vector2 };
    u_time: { value: number };
    u_resolution: { value: THREE.Vector2 };
    u_radius: { value: number };
    u_speed: { value: number };
    u_imageAspect: { value: number };
    u_turbulenceIntensity: { value: number };
  } | null>(null);

  const config = {
    maskRadius: 0.15, // Giảm kích thước vùng ảnh hưởng
    maskSpeed: 0.75, // Giữ nguyên tốc độ
    lerpFactor: 0.05, // Giữ nguyên tốc độ chuyển động
    radiusLerpSpeed: 0.1, // Giữ nguyên tốc độ thay đổi bán kính
    turbulenceIntensity: 0.075,
  };

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetRadius = useRef(0.5);
  const animationFrameId = useRef<number | null>(null);
  const isInView = useRef(false);

  const updateCursorState = (x: number, y: number) => {
    if (!containerRef.current) return;

    lastMouseX.current = x;
    lastMouseY.current = y;

    const rect = containerRef.current.getBoundingClientRect();
    const inside =
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    isMouseInsideContainer.current = inside;

    if (inside) {
      targetMouse.current.x = (x - rect.left) / rect.width;
      targetMouse.current.y = 1.0 - (y - rect.top) / rect.height;
      targetRadius.current = config.maskRadius;
    } else {
      targetRadius.current = 0.0;
    }
  };

  const setupEventListeners = () => {
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorState(e.clientX, e.clientY);
    };
    const handleScroll = () => {
      updateCursorState(lastMouseX.current, lastMouseY.current);
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    if (containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInView.current = entry.isIntersecting;
            if (!isInView.current) {
              targetRadius.current = 0.0;
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
      };
    }
  };

  const setupScreen = (texture: THREE.Texture) => {
    if (!containerRef.current) return;

    const imageAspect = texture.image.width / texture.image.height;

    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const uniforms = {
      u_texture: { value: texture },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_radius: { value: 0.0 },
      u_speed: { value: config.maskSpeed },
      u_imageAspect: { value: imageAspect },
      u_turbulenceIntensity: { value: config.turbulenceIntensity },
    };
    uniformsRef.current = uniforms;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderRef.current = renderer;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    console.log("Max anisotropy:", renderer.capabilities.getMaxAnisotropy());
    containerRef.current.appendChild(renderer.domElement);

    const handleResize = () => {
      if (!containerRef.current || !renderRef.current || !uniformsRef.current)
        return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderRef.current.setSize(width, height);
      uniformsRef.current.u_resolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  };

  const animate = () => {
    if (
      !uniformsRef.current ||
      !renderRef.current ||
      !sceneRef.current ||
      !cameraRef.current
    ) {
      animationFrameId.current = requestAnimationFrame(animate);
      return;
    }

    uniformsRef.current.u_mouse.value.copy(targetMouse.current);
    uniformsRef.current.u_time.value += 0.01;
    uniformsRef.current.u_radius.value +=
      (targetRadius.current - uniformsRef.current.u_radius.value) *
      config.radiusLerpSpeed;

    renderRef.current.render(sceneRef.current, cameraRef.current);
    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loadTexture = () => {
      loader.load(src, (texture) => {
        setupScreen(texture);
        setupEventListeners();
        animate();
        isSetupCompleteRef.current = true;
      });
    };

    loadTexture();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (renderRef.current) {
        renderRef.current.dispose();

        if (containerRef.current) {
          const canvas = containerRef.current.querySelector("canvas");
          if (canvas) {
            containerRef.current.removeChild(canvas);
          }
        }
      }
    };
  }, [src]);

  return (
    <div className={`inversion-lens ${className || ""}`} ref={containerRef}>
      <Image
        src={src}
        loading="lazy"
        fill
        alt="profile-img"
        style={{ display: "none" }}
        className="rounded-2xl object-cover" // Đảm bảo <Image> nằm dưới canvas
      />
    </div>
  );
};

export default InversionLens;
