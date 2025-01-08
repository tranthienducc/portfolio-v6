"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const SplitText = ({ title }: { title: string }) => {
  const textRef = useRef<HTMLDivElement>(null);

  const splitText =
    typeof title === "string"
      ? title.split("").map((char, index) => (
          <span
            key={index}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {char === " " ? "\u00A0\u00A0" : char}
          </span>
        ))
      : [];

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll("span");

      // GSAP animation for each letter
      gsap.fromTo(
        chars,
        { bottom: "-100px" }, // Start position (below the container)
        {
          bottom: "0", // End position (visible in normal place)
          duration: 1.125,
          ease: "power3.out",
          stagger: 0.05, // Delay between each letter animation
        }
      );
    }
  }, [title]);

  return <div ref={textRef}>{splitText}</div>;
};

export default SplitText;
