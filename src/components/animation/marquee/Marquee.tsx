"use client";
import IconsStar from "@/components/icons/IconsStar";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Marquee = () => {
  const firstText = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  let xPercent = -100; // Start from outside to the left

  useEffect(() => {
    if (!container.current || !firstText.current) return;

    const containerWidth = container.current.offsetWidth;
    const contentWidth = firstText.current.offsetWidth;

    if (contentWidth < containerWidth) {
      const repeatTimes = Math.ceil(containerWidth / contentWidth) + 6;
      const content = firstText.current.innerHTML;

      if (firstText.current) {
        firstText.current.innerHTML = content.repeat(repeatTimes);
      }
    }

    requestAnimationFrame(animation);
  }, []);

  const animation = () => {
    if (xPercent >= 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent });
    xPercent += 0.05; // Increased to make it faster (was 0.01)

    requestAnimationFrame(animation);
  };

  return (
    <div ref={container} className="mx-auto overflow-hidden relative">
      <div
        className="flex flex-row items-center whitespace-nowrap gap-6"
        ref={firstText}
      >
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex flex-row items-center gap-3">
              <p className="text-4xl font-medium">Thien Duc</p>
              <IconsStar />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
