"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Define custom interfaces to extend Three.js types
interface CustomLine extends THREE.Line {
  letterElements?: HTMLDivElement[];
}

// Define the position interface
interface Position {
  current: { x: number; y: number };
  target: { x: number; y: number };
}

const Preloader = () => {
  const workSectionRef = useRef<HTMLDivElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const letterPositions = useRef(new Map<HTMLDivElement, Position>());
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const animationRef = useRef<number>(0);
  const pathsRef = useRef<CustomLine[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const curvesRef = useRef<Map<CustomLine, THREE.CatmullRomCurve3>>(new Map());

  const lerp = (start: number, end: number, t: number) =>
    start + (end - start) * t;

  useEffect(() => {
    if (!workSectionRef.current) return;
    const workSection = workSectionRef.current;

    const gridCanvas = document.createElement("canvas");
    gridCanvas.id = "grid-canvas";
    workSection.appendChild(gridCanvas);
    gridCanvasRef.current = gridCanvas;

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    if (cameraRef.current) {
      cameraRef.current.position.z = 20;
    }

    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    if (rendererRef.current) {
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setClearColor(0x000000, 0);
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
      rendererRef.current.domElement.id = "letters-canvas";
      workSection.appendChild(rendererRef.current.domElement);
    }

    const spacingFactor = 1.2;
    const xCenter = 5;
    const xWidth = 50 * spacingFactor;

    const createTextAnimationPath = (
      yPos: number,
      amplitude: number
    ): CustomLine => {
      const points = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        points.push(
          new THREE.Vector3(
            xCenter + xWidth * (t - 0.5),
            yPos + Math.sin(t * Math.PI) * -amplitude,
            (1 - Math.pow(Math.abs(t - 0.5) * 2, 2)) * -5
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(100)
      );
      const material = new THREE.LineBasicMaterial({
        color: 0x000,
        linewidth: 1,
      });

      const line = new THREE.Line(geometry, material);
      const customLine = line as CustomLine;
      curvesRef.current.set(customLine, curve);

      return customLine;
    };

    const paths = [
      createTextAnimationPath(10, 2),
      createTextAnimationPath(3.5, 1),
      createTextAnimationPath(-3.5, -1),
      createTextAnimationPath(-10, -2),
    ];
    pathsRef.current = paths;

    if (sceneRef.current) {
      paths.forEach((line) => sceneRef.current?.add(line));
    }

    const textContainer = textContainerRef.current;
    if (textContainer) {
      const letterText = ["T", "R", "A", "N"];
      paths.forEach((line, i) => {
        const elements: HTMLDivElement[] = Array.from({ length: 15 }, () => {
          const el = document.createElement("div");
          el.className = "letter";
          el.textContent = letterText[i];
          textContainer.appendChild(el);
          letterPositions.current.set(el, {
            current: { x: 0, y: 0 },
            target: { x: 0, y: 0 },
          });
          return el;
        });
        line.letterElements = elements;
      });
    }

    const handleResize = () => {
      resizeGridCanvas();
      drawGrid(loadingProgress / 100);
      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
      updateTargetPosition(loadingProgress / 100);
    };

    window.addEventListener("resize", handleResize);
    resizeGridCanvas();
    animate();
    updateTargetPosition(0);
    drawGrid(0);

    startLoadingAnimation();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      pathsRef.current.forEach((path) => {
        if (path.geometry) path.geometry.dispose();
        if (path.material) {
          if (Array.isArray(path.material)) {
            path.material.forEach((material) => material.dispose());
          } else {
            path.material.dispose();
          }
        }
      });
      curvesRef.current.clear();
    };
  }, []);

  const resizeGridCanvas = () => {
    const gridCanvas = gridCanvasRef.current;
    if (!gridCanvas) return;

    const gridCtx = gridCanvas.getContext("2d");
    if (!gridCtx) return;

    const dpr = window.devicePixelRatio || 1;

    gridCanvas.width = window.innerWidth * dpr;
    gridCanvas.height = window.innerHeight * dpr;
    gridCanvas.style.width = `${window.innerWidth}px`;
    gridCanvas.style.height = `${window.innerHeight}px`;

    gridCtx.scale(dpr, dpr);
  };

  const drawGrid = (progress: number) => {
    const gridCanvas = gridCanvasRef.current;
    if (!gridCanvas) return;

    const gridCtx = gridCanvas.getContext("2d");
    if (!gridCtx) return;

    gridCtx.fillStyle = "black";
    gridCtx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);
    gridCtx.fillStyle = "#f40c3f";

    const dotSize = 1;
    const spacing = 30;
    const rows = Math.ceil(gridCanvas.height / spacing);
    const cols = Math.ceil(gridCanvas.width / spacing) + 15;
    const offset = (progress * spacing * 10) % spacing;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        gridCtx.beginPath();
        gridCtx.arc(x * spacing - offset, y * spacing, dotSize, 0, Math.PI * 2);
        gridCtx.fill();
      }
    }
  };

  const updateTargetPosition = (progress: number) => {
    if (!cameraRef.current) return;

    const lineSpeedMultiplier = [0.8, 1, 0.7, 0.9];

    pathsRef.current.forEach((line, index) => {
      if (!line.letterElements) return;

      const curve = curvesRef.current.get(line);
      if (!curve) return;

      line.letterElements.forEach((element, i) => {
        const point = curve.getPoint(
          (i / 14 + progress * lineSpeedMultiplier[index]) % 1
        );

        const vector = point.clone().project(cameraRef.current!);
        const positions = letterPositions.current.get(element);

        if (positions) {
          positions.target = {
            x: (-vector.x * 0.5 + 0.5) * window.innerWidth,
            y: (-vector.y * 0.5 + 0.5) * window.innerHeight,
          };
        }
      });
    });
  };

  const updateLetterPosition = () => {
    letterPositions.current.forEach((position, element) => {
      const distX = position.target.x - position.current.x;
      const distY = position.target.y - position.current.y;

      // Giảm ngưỡng để tránh nhảy đột ngột
      if (Math.abs(distX) > window.innerWidth * 0.2) {
        position.current.x = position.target.x;
      } else {
        position.current.x = lerp(position.current.x, position.target.x, 0.15); // Tăng lerp factor
      }

      if (Math.abs(distY) > window.innerHeight * 0.2) {
        position.current.y = position.target.y;
      } else {
        position.current.y = lerp(position.current.y, position.target.y, 0.15); // Tăng lerp factor
      }

      element.style.transform = `translate(-50%, -50%) translate3d(${position.current.x}px, ${position.current.y}px, 0px)`;
    });
  };

  const animate = () => {
    updateLetterPosition();
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  const startLoadingAnimation = () => {
    const duration = 3;
    const startTime = Date.now();

    const updateLoadingProgress = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min((elapsed / duration) * 100, 100);

      setLoadingProgress(progress);
      drawGrid(progress / 100);
      updateTargetPosition(progress / 100);

      if (progress < 100) {
        requestAnimationFrame(updateLoadingProgress);
      } else {
        console.log("Preloader animation completed");
      }
    };

    updateLoadingProgress();
  };

  return (
    <div
      className="w-[100vw] h-full bg-[#000] overflow-hidden z-[9999] fixed top-0 left-0 font-BiggerDisplay"
      ref={workSectionRef}
    >
      <div className="text-container" ref={textContainerRef}></div>
    </div>
  );
};

export default Preloader;
