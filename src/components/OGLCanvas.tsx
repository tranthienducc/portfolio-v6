"use client";
import React, { useEffect, useRef } from "react";
import {
  Renderer,
  Vec2,
  Vec4,
  Geometry,
  Program,
  Mesh,
  Flowmap,
  Texture,
} from "ogl";

const WaterEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new Vec2(-1));
  const velocityRef = useRef(Object.assign(new Vec2(), { needsUpdate: false }));
  const lastMouseRef = useRef(new Vec2());
  const lastTimeRef = useRef<number | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const flowmapRef = useRef<Flowmap | null>(null);
  const aspectRef = useRef(1);

  useEffect(() => {
    const loadShaders = async () => {
      const [vertexShader, fragmentShader] = await Promise.all([
        fetch("/shaders/vertexShader.glsl").then((r) => r.text()),
        fetch("/shaders/fragmentShader.glsl").then((r) => r.text()),
      ]);

      initScene(vertexShader, fragmentShader);
    };

    loadShaders();

    return () => {
      if (rendererRef.current) {
        rendererRef.current.gl.canvas.remove();
      }
    };
  }, []);

  const initScene = (vertexShader: string, fragmentShader: string) => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: 2 });
    rendererRef.current = renderer;
    const { gl } = renderer;
    container.appendChild(gl.canvas);

    const flowmap = new Flowmap(gl, {
      falloff: 0.3,
      dissipation: 0.92,
      alpha: 0.5,
    });
    flowmapRef.current = flowmap;

    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3]),
      },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        res: { value: new Vec4(window.innerWidth, window.innerHeight) },
        tFlow: flowmap.uniform,
        tWater: { value: new Texture(gl) }, // Thêm placeholder
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    requestAnimationFrame(update);
  };

  const resize = () => {
    const container = containerRef.current;
    if (!container || !rendererRef.current) return;

    const rect = container.getBoundingClientRect();
    const { gl } = rendererRef.current;

    gl.canvas.width = rect.width * 2.0;
    gl.canvas.height = rect.height * 2.0;
    gl.canvas.style.width = `${rect.width}px`;
    gl.canvas.style.height = `${rect.height}px`;

    const imageAspect = 2000 / 2500;
    const canvasAspect = rect.width / rect.height;
    let a1, a2;

    if (canvasAspect > imageAspect) {
      a1 = imageAspect / canvasAspect;
      a2 = 1.0;
    } else {
      a1 = 1.0;
      a2 = canvasAspect / imageAspect;
    }

    if (meshRef.current) {
      meshRef.current.program.uniforms.res.value = new Vec4(
        rect.width,
        rect.height,
        a1,
        a2
      );
    }

    rendererRef.current.setSize(rect.width, rect.height);
    aspectRef.current = rect.width / rect.height;
  };

  const updateMouse = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouse = mouseRef.current;
    const velocity = velocityRef.current as Vec2 & { needsUpdate: boolean };
    const lastMouse = lastMouseRef.current;

    // Khởi tạo với giá trị từ lastMouse
    let x: number = lastMouse.x;
    let y: number = lastMouse.y;

    if ("changedTouches" in e && e.changedTouches.length) {
      x = e.changedTouches[0].pageX - rect.left;
      y = e.changedTouches[0].pageY - rect.top;
    } else if (e instanceof MouseEvent) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Bây giờ x và y đã chắc chắn có giá trị
    mouse.set(x / rect.width, 1.0 - y / rect.height);

    if (!lastTimeRef.current) {
      lastTimeRef.current = performance.now();
      lastMouse.set(x, y);
    }

    // Có thể sử dụng x và y trực tiếp vì đã được khởi tạo
    const deltaX = x - lastMouse.x;
    const deltaY = y - lastMouse.y;

    lastMouse.set(x, y);

    const time = performance.now();
    const delta = Math.min(10.4, time - (lastTimeRef.current || 0));
    lastTimeRef.current = time;

    velocity.x = deltaX / delta;
    velocity.y = deltaY / delta;
    velocity.needsUpdate = true;
  };

  const update = (t: number) => {
    requestAnimationFrame(update);

    const velocity = velocityRef.current;
    const mouse = mouseRef.current;

    if (!velocity.needsUpdate) {
      mouse.set(-1);
      velocity.set(0);
    }
    velocity.needsUpdate = false;

    if (flowmapRef.current && meshRef.current && rendererRef.current) {
      flowmapRef.current.mouse.copy(mouse);
      flowmapRef.current.velocity.lerp(velocity, velocity.len() ? 0.15 : 0.1);
      flowmapRef.current.update();

      meshRef.current.program.uniforms.uTime.value = t * 0.01;
      rendererRef.current.render({ scene: meshRef.current });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resize);

    const container = containerRef.current;
    if (container) {
      const isTouchCapable = "ontouchstart" in window;
      if (isTouchCapable) {
        container.addEventListener("touchstart", updateMouse);
        container.addEventListener("touchmove", updateMouse, {
          passive: false,
        });
      } else {
        container.addEventListener("mousemove", updateMouse);
      }
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (container) {
        container.removeEventListener("touchstart", updateMouse);
        container.removeEventListener("touchmove", updateMouse);
        container.removeEventListener("mousemove", updateMouse);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-full w-full h-screen">
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-hero-pattern rounded-xl m-[15px]" />
    </div>
  );
};

export default WaterEffect;
