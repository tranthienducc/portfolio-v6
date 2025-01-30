"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const wrapperWidth = 180;
    const finalPosition = windowWidth - wrapperWidth;
    const stepDistance = finalPosition / 6;

    tlRef.current = gsap.timeline();

    tlRef.current.to(".counter-num", {
      x: -900,
      duration: 0.85,
      delay: 0.5,
      ease: "power4.inOut",
    });

    for (let i = 1; i <= 6; i++) {
      const xPosition = -900 + i * 180;
      tlRef.current.to(".counter-num", {
        x: xPosition,
        duration: 0.85,
        ease: "power4.inOut",
        onStart: () => {
          gsap.to(".count-wrapper", {
            x: stepDistance * i,
            duration: 0.85,
            ease: "power4.inOut",
          });
        },
      });
    }

    gsap.set(".revealer svg", {
      scale: 0,
    });

    const delays = [6, 6.5, 7];
    document.querySelectorAll(".revealer svg").forEach((el, i) => {
      gsap.to(el, {
        scale: 45,
        duration: 1.5,
        ease: "power4.inOut",
        delay: delays[i],
        onComplete: () => {
          if (i === delays.length - 1) {
            gsap.to(loaderRef.current, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => setIsVisible(false),
            });
          }
        },
      });
    });

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      gsap.killTweensOf(".revealer svg");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="w-full h-full bg-[#000] overflow-hidden z-[9999] fixed top-0 left-0 flex items-end text-white font-BiggerDisplay"
    >
      <div className="count-wrapper">
        <div className="counter-num">
          <div className="digit">
            <h1>9</h1>
          </div>
          <div className="digit">
            <h1>8</h1>
          </div>
          <div className="digit">
            <h1>7</h1>
          </div>
          <div className="digit">
            <h1>4</h1>
          </div>
          <div className="digit">
            <h1>2</h1>
          </div>
          <div className="digit">
            <h1>0</h1>
          </div>
        </div>
      </div>
      <div className="count-wrapper">
        <div className="counter-num">
          <div className="digit">
            <h1>9</h1>
          </div>
          <div className="digit">
            <h1>5</h1>
          </div>
          <div className="digit">
            <h1>9</h1>
          </div>
          <div className="digit">
            <h1>7</h1>
          </div>
          <div className="digit">
            <h1>4</h1>
          </div>
          <div className="digit">
            <h1>0</h1>
          </div>
        </div>
      </div>
      <div className="revealer revealer-1">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 10 L108 70 C110 85 115 90 130 95 L190 100 L130 105 C115 110 110 115 108 130 L100 190 L92 130 C90 115 85 110 70 105 L10 100 L70 95 C85 90 90 85 92 70 Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="revealer revealer-2">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 10 L108 70 C110 85 115 90 130 95 L190 100 L130 105 C115 110 110 115 108 130 L100 190 L92 130 C90 115 85 110 70 105 L10 100 L70 95 C85 90 90 85 92 70 Z"
            fill="#fe3d00"
          />
        </svg>
      </div>
      <div className="revealer revealer-3">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 10 L108 70 C110 85 115 90 130 95 L190 100 L130 105 C115 110 110 115 108 130 L100 190 L92 130 C90 115 85 110 70 105 L10 100 L70 95 C85 90 90 85 92 70 Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default Preloader;
