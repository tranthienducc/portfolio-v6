"use client";
import BlockReveal from "@/components/animation/BlockReveal";
import { Header } from "@/components/shared";
import { ChildProps } from "@/utils/types";
import { ReactLenis } from "@studio-freight/react-lenis";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type SplitTextOptions = {
  type?: "chars" | "words" | "lines" | ("chars" | "words" | "lines")[];
};

class SplitText {
  element: HTMLElement;
  options: SplitTextOptions;
  originalHTML: string;
  text: string;
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];

  constructor(element: HTMLElement, options = {}) {
    this.element = element;
    this.options = options;

    this.originalHTML = this.element.innerHTML;
    this.text = this.element.textContent?.trim() || "";

    this.chars = [];
    this.words = [];
    this.lines = [];

    this.split();
  }

  split() {
    const { type = "chars" } = this.options;
    this.element.innerHTML = "";

    if (type.includes("chars")) this.splitChars();
    if (type.includes("words")) this.splitWords();
    if (type.includes("lines")) this.splitLines();
  }

  splitChars() {
    this.text.split("").forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.className = "char-wrapper";

      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;

      wrapper.appendChild(span);
      this.element.appendChild(wrapper);

      this.chars.push(span);
    });
  }

  splitWords() {
    this.text.split(" ").forEach((word, i, arr) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      this.element.appendChild(span);
      this.words.push(span);

      if (i < arr.length - 1)
        this.element.appendChild(document.createTextNode(" "));
    });
  }

  splitLines() {
    const lines = this.text.split(/\n/);
    lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.className = "line-wrapper";

      const div = document.createElement("div");
      div.className = "line";
      div.textContent = line;

      wrapper.appendChild(div);
      this.element.appendChild(wrapper);

      this.lines.push(div);
    });
  }

  revert() {
    this.element.innerHTML = this.originalHTML;
  }

  static create(element: HTMLElement, options: SplitTextOptions) {
    return new SplitText(element, options);
  }
}

const Wrapper = ({ children }: ChildProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const logoRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!logoRef.current || !footerRef.current) return;

    const splitElements = [
      { key: "logoChars", element: logoRef.current, type: "chars" as const },
      {
        key: "footerLines",
        element: footerRef.current,
        type: "lines" as const,
      },
    ];

    type SplitKeys = "logoChars" | "footerLines";
    const splits: Partial<Record<SplitKeys, SplitText>> = {};
    splitElements.forEach(({ key, element, type }) => {
      splits[key as SplitKeys] = SplitText.create(element, { type });
    });

    if (splits.logoChars) {
      gsap.set(splits.logoChars.chars, { x: "100%" });
    }
    if (splits.footerLines) {
      gsap.set(splits.footerLines.lines, { y: "100%" });
    }

    function animateProgress(duration = 4) {
      const tl = gsap.timeline();
      const counterSteps = 5;
      let currentProgress = 0;

      for (let i = 0; i < counterSteps; i++) {
        const finalStep = i === counterSteps - 1;
        const targetProgress = finalStep
          ? 1
          : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
        currentProgress = targetProgress;

        tl.to(".preloader-progress-bar", {
          scaleX: targetProgress,
          duration: duration / counterSteps,
          ease: "power2.out",
        });
      }

      return tl;
    }

    const tl = gsap.timeline({ delay: 0.5 });

    if (splits.logoChars) {
      tl.to(splits.logoChars.chars, {
        x: "0%",
        stagger: 0.05,
        duration: 1,
        ease: "power4.inOut",
      });
    }
    if (splits.footerLines) {
      tl.to(
        splits.footerLines.lines,
        {
          y: "0%",
          stagger: 0.05,
          duration: 1,
          ease: "power4.inOut",
        },
        "0.25"
      );
    }
    tl.add(animateProgress(), "<").set(".preloader-progress", {
      backgroundColor: "var(--base-300)",
    });
    if (splits.logoChars) {
      tl.to(
        splits.logoChars.chars,
        {
          x: "-100%",
          stagger: 0.05,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.5"
      );
    }
    if (splits.footerLines) {
      tl.to(
        splits.footerLines.lines,
        {
          y: "-100%",
          stagger: 0.1,
          duration: 1,
          ease: "power4.inOut",
        },
        "<"
      );
    }
    tl.to(
      ".preloader-progress",
      {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.25"
    )
      .to(
        ".preloader-mask",
        {
          scale: 5,
          duration: 2.5,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        ".contained",
        {
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 9000);
    document.body.style.overflow = isLoading ? "hidden" : "auto";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-svh pointer-events-none z-[99999]">
          <div className="preloader-progress">
            <div className="preloader-progress-bar" />
            <div className="preloader-logo">
              <h1
                ref={logoRef}
                className="relative text-[#f5f5f5] text-[3rem] font-medium leading-[1] uppercase"
              >
                Thien Duc
              </h1>
            </div>
          </div>

          <div className="preloader-mask" />
          <div className="preloader-content">
            <div className="preloader-footer">
              <p ref={footerRef} className="text-[#f5f5f5] opacity-[0.5]">
                Space unfold in light and shadow, where structure finds its
                quiet rhythm, and time align in harmony.
              </p>
            </div>
          </div>
        </div>
      )}

      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
        <Header />
        <main>
          <BlockReveal>
            <div className="max-w-full w-full contained z-10 relative">
              {children}
            </div>
          </BlockReveal>
        </main>
      </ReactLenis>
    </div>
  );
};

export default Wrapper;
