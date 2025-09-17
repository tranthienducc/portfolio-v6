"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import SplitType from "split-type";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const marqueeTrack = containerRef.current.querySelector(".marquee-track");
    if (!marqueeTrack) return;

    const distance = marqueeTrack.scrollWidth / 2; // nửa chiều dài (vì ta có 2 bản copy)

    gsap.to(marqueeTrack, {
      x: `-=${distance}`, // di chuyển liên tục
      duration: 10,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => {
          // reset về 0 khi chạy hết distance
          return `${parseFloat(x) % distance}px`;
        },
      },
    });
    const targets =
      containerRef.current.querySelectorAll<HTMLElement>(".split-animate");

    targets.forEach((el, index) => {
      const split = new SplitType(el, { types: "lines" });

      gsap.fromTo(
        split.lines,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          delay: 6 + index * 0.2,
          ease: "power4.out",
          stagger: 0.05,
        }
      );
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const config = {
      imageCount: 3,
      imageLifespan: 750,
      removalDelay: 50,
      mouseThreshold: 100,
      inDuration: 750,
      outDuration: 1000,
      inEasing: "cubic-bezier(.07,.5,.5,1)",
      outEasing: "cubic-bezier(.87,0,.13,1)",
    };

    const images = Array.from(
      { length: config.imageCount },
      (_, i) => `/assets/images/model-${i + 1}.avif`
    );
    interface TrailItem {
      element: HTMLImageElement;
      rotation: number;
      removeTime: number;
    }
    const trail: TrailItem[] = [];

    let mouseX = 0,
      mouseY = 0,
      lastMouseX = 0,
      lastMouseY = 0;
    let isMoving = false,
      isCursorInContainer = false;
    let lastRemovalTime = 0;

    const isInContainer = (x: number, y: number) => {
      const rect = container.getBoundingClientRect();
      return (
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
      );
    };

    const hasMouseEnough = () => {
      const distance = Math.sqrt(
        Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
      );
      return distance > config.mouseThreshold;
    };

    const createTrailImage = () => {
      if (!isCursorInContainer || !isMoving || !hasMouseEnough()) return;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      createImage();
    };

    const createImage = () => {
      const img = document.createElement("img");
      img.classList.add("trail-img");
      const randomIndex = Math.floor(Math.random() * images.length);
      const rotation = (Math.random() - 0.5) * 50;
      img.src = images[randomIndex];

      const rect = container.getBoundingClientRect();
      const relativeX = mouseX - rect.left;
      const relativeY = mouseY - rect.top;

      img.style.position = "absolute";
      img.style.left = `${relativeX}px`;
      img.style.top = `${relativeY}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
      img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;
      img.style.pointerEvents = "none";
      container.appendChild(img);

      setTimeout(() => {
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
      }, 10);

      trail.push({
        element: img,
        rotation: rotation,
        removeTime: Date.now() + config.imageLifespan,
      });
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (now - lastRemovalTime < config.removalDelay || trail.length === 0)
        return;
      const oldestImage = trail[0];
      if (now >= oldestImage.removeTime) {
        const imgToRemove = trail.shift();
        if (imgToRemove) {
          imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
          imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;
          lastRemovalTime = now;
          setTimeout(() => {
            if (imgToRemove.element.parentNode) {
              imgToRemove.element.parentNode.removeChild(imgToRemove.element);
            }
          }, config.outDuration);
        }
      }
    };
    let moveTimeout: ReturnType<typeof setTimeout> | undefined;
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isCursorInContainer = isInContainer(mouseX, mouseY);

      if (isCursorInContainer) {
        isMoving = true;
        if (moveTimeout !== undefined) {
          clearTimeout(moveTimeout);
        }
        moveTimeout = setTimeout(() => {
          isMoving = false;
        }, 100);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      createTrailImage();
      removeOldImages();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      trail.forEach((t) => t.element.remove());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative mb-[18%] h-screen flex flex-col px-[1rem] lg:px-[1rem] py-[45px] w-full text-black leading-[1.4] lg:leading-[0.8] overflow-hidden"
      id="hero"
    >
      <div className="absolute inset-0 -z-10 bg-center bg-cover bg-custom-pattern"></div>
      <Image
        src="/assets/images/rectangles.png"
        loading="lazy"
        width={203}
        height={151}
        className="w-[203px] h-[151px] object-cover absolute top-[27%] left-[9%]"
        alt="bg-abstract"
      />
      <Image
        src="/assets/images/rectangles.png"
        loading="lazy"
        width={203}
        height={151}
        className="w-[203px] h-[151px] object-cover absolute top-[35%] left-[45%]"
        alt="bg-abstract"
      />
      <Image
        src="/assets/images/rectangles.png"
        loading="lazy"
        width={203}
        height={151}
        className="w-[203px] h-[151px] object-cover absolute bottom-[27%] right-[1%]"
        alt="bg-abstract"
      />
      <div className="uppercase font-bold font-NeuroX text-[366.688px] leading-[103.75px] text-[#ebe5d9] flex flex-col gap-[6.5rem] z-10 mt-[7rem]">
        <span className="pl-[31rem] split-animate">tran</span>
        <span className="pl-[12rem] split-animate">thien</span>
        <span className="pl-[76rem] split-animate">duc</span>
      </div>
      <div className="absolute top-[10%] right-[2%]">
        <p className="uppercase text-[13.73px] font-medium text-[#ebe5d9] leading-[16px] max-w-[200.5px] w-full text-right split-animate">
          We live in the Viet Nam. Its those small sweated over details in the
          <span className="text-white opacity-40">pixels</span>, the code, and
          the moments that make a{" "}
          <span className="text-white opacity-40">digital experience</span> feel
          effortless.
        </p>
      </div>
      <div className="flex flex-row items-center gap-[30rem] pt-6">
        <div className="flex flex-row items-center gap-3">
          <span className="text-[11.73px] font-semibold text-[#000] uppercase bg-white rounded-md p-[5.61px]">
            Scroll Down
          </span>
          <ArrowDown
            size={20}
            color="#000"
            className="bg-white rounded-md p-0"
          />
        </div>
        <p className="text-[13.73px] font-medium text-[#ebe5d9] leading-[16px] text-center max-w-[300px] w-full uppercase split-animate">
          Passionate about imagery and movement, I create unique visual
          universes.
        </p>
      </div>

      <div className="max-w-[376.66px] w-full h-[241.3px] absolute left-[52%] top-[43%] ml-4 z-10">
        <div className="bg-white rounded-[.8rem] p-[10.61px] relative">
          <div className="pt-[.8rem] ps-[0.4rem] pe-[0.4rem] text-black overflow-hidden relative flex flex-row items-center gap-3 justify-center">
            <div className="marquee-track flex whitespace-nowrap">
              <h4 className="text-[54.61px] leading-[0.9em] font-bold font-NeuroX uppercase">
                show case &nbsp; * &nbsp; show case &nbsp; * &nbsp; show case
                &nbsp; * &nbsp;
              </h4>
              <h4 className="text-[54.61px] leading-[0.9em] font-bold font-NeuroX uppercase">
                show case &nbsp; * &nbsp; show case &nbsp; * &nbsp; show case
                &nbsp; * &nbsp;
              </h4>
            </div>
          </div>
          <div className="cursor-pointer relative w-[33.5rem]">
            <video
              src="/assets/video/reel-short.mp4"
              autoPlay
              preload="metadata"
              height={1080}
              width={1920}
              playsInline
              loop
              muted
              className="w-[355.46px] h-[199.94px] "
            ></video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
