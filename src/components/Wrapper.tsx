"use client";
import BlockReveal from "@/components/animation/BlockReveal";
// import { Header } from "@/components/shared";
import { ChildProps } from "@/utils/types";
import { ReactLenis } from "@studio-freight/react-lenis";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/shared";

gsap.registerPlugin(CustomEase);

type SplitTextOptions = {
  type: "chars" | "words" | "lines";
  charsClass?: string;
  wordsClass?: string;
  linesClass?: string;
  mask?: string;
};

export class SplitText {
  element: HTMLElement;
  type: "chars" | "words" | "lines";
  result: HTMLElement[] = [];

  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  constructor(selector: string, options: SplitTextOptions) {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`Element not found: ${selector}`);
    this.element = el as HTMLElement;
    this.type = options.type;
    this.split(options);
  }

  static create(selector: string, options: SplitTextOptions) {
    return new SplitText(selector, options);
  }

  private split(options: SplitTextOptions) {
    const { type } = options;
    const text = this.element.textContent || "";
    this.element.textContent = "";

    if (type === "chars") {
      const chars = [...text].map((char) => {
        const mask = document.createElement("div");
        mask.classList.add("char-mask");
        mask.style.overflow = "hidden";
        mask.style.display = "inline-block";

        const span = document.createElement("span");
        span.classList.add(options.charsClass || "char");
        span.textContent = char === " " ? "\u00A0" : char;

        mask.appendChild(span);
        this.element.appendChild(mask);

        return span;
      });
      this.result = chars;
      this.chars = chars;
    }

    if (type === "words") {
      const words = text.split(" ").map((word, i) => {
        const span = document.createElement("span");
        span.classList.add(options.wordsClass || "word");
        span.textContent = word;
        this.element.appendChild(span);
        if (i !== text.split(" ").length - 1)
          this.element.appendChild(document.createTextNode(" "));
        return span;
      });
      this.result = words;
      this.words = words;
    }

    if (type === "lines") {
      // Giả lập split theo dòng (dùng CSS để wrap)
      const lines = text.split(/\n/).map((line) => {
        const div = document.createElement("div");
        div.classList.add(options.linesClass || "line");
        div.textContent = line;
        this.element.appendChild(div);
        return div;
      });
      this.result = lines;
      this.lines = lines;
    }
  }
}
type SplitType = "chars" | "words" | "lines";
const Wrapper = ({ children }: ChildProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const createSplit = (
      selector: string,
      type: SplitType,
      className?: string
    ) => {
      const el = document.querySelector(selector);
      if (!el) {
        console.warn(`⚠️ SplitText skipped: element not found (${selector})`);
        return { chars: [], words: [], lines: [] };
      }

      // Nếu không truyền className → dùng mặc định bằng type
      const finalClass = className || type.slice(0, -1); // "chars" → "char", "lines" → "line"

      return SplitText.create(selector, {
        type,
        [`${type}Class`]: finalClass,
        mask: type,
      });
    };

    const splitPreloaderHeader = createSplit(
      ".preloader-header a",
      "chars",
      "char"
    );
    const splitPreloaderCopy = createSplit(
      ".preloader-copy p",
      "lines",
      "line"
    );

    const chars = splitPreloaderHeader.chars;
    const lines = splitPreloaderCopy.lines;
    const initialChar = chars[0];
    const lastChar = chars[chars.length - 1];

    chars.forEach((char: HTMLElement, index: number) => {
      gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
    });
    gsap.set(lines, { yPercent: 100 });

    const preloaderImages = gsap.utils.toArray(".preloader-images .image");
    const preloaderImagesInner = gsap.utils.toArray(
      ".preloader-images .image img"
    );

    const tl = gsap.timeline({ delay: 0.25 });

    tl.to(".progress-bar", {
      scaleX: 1,
      duration: 4,
      ease: "power3.inOut",
    })
      .set(".progress-bar", { transformOrigin: "right" })
      .to(".progress-bar", {
        scaleX: 0,
        duration: 1,
        ease: "power3.in",
      });

    preloaderImages.forEach((preloaderImg: any, index: number) => {
      tl.to(
        preloaderImg,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100% , 0% 100%)",
          duration: 1,
          ease: "hop",
          delay: index * 0.75,
        },
        "-=5"
      );
    });

    preloaderImagesInner.forEach((preloaderImageInner: any, index: number) => {
      tl.to(
        preloaderImageInner,
        {
          scale: 1,
          duration: 1.5,
          ease: "hop",
          delay: index * 0.75,
        },
        "-=5.25"
      );
    });

    tl.to(
      lines,
      {
        yPercent: 0,
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=5.5"
    );

    tl.to(
      chars,
      {
        yPercent: 0,
        duration: 1,
        ease: "hop",
        stagger: 0.025,
      },
      "-=5"
    );

    tl.to(
      ".preloader-images",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0% , 0% 0%)",
        duration: 1,
        ease: "hop",
      },
      "-=1.5"
    );

    tl.to(
      lines,
      {
        y: "-125%",
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=2"
    );

    tl.to(
      chars,
      {
        yPercent: (index: number) => {
          if (index === 0 || index === chars.length - 1) return 0;
          return index % 2 === 0 ? 100 : -100;
        },
        duration: 1,
        ease: "hop",
        stagger: 0.025,
        delay: 0.5,
        onStart: () => {
          const initialCharMask = initialChar.parentElement;
          const lastCharMask = lastChar.parentElement;

          if (initialCharMask?.classList.contains("char-mask"))
            initialCharMask.style.overflow = "visible";
          if (lastCharMask?.classList.contains("char-mask"))
            lastCharMask.style.overflow = "visible";

          const viewportWidth = window.innerWidth;
          const centerX = viewportWidth / 2;
          const initialCharRect = initialChar.getBoundingClientRect();
          const lastCharRect = lastChar.getBoundingClientRect();

          gsap.to([initialChar, lastChar], {
            duration: 1,
            ease: "hop",
            delay: 0.5,
            x: (i) =>
              i === 0
                ? centerX - initialCharRect.left - initialCharRect.width
                : centerX - lastCharRect.left,
            onComplete: () => {
              gsap.set(".preloader-header", { mixBlendMode: "difference" });
              gsap.to(".preloader-header", {
                y: "2rem",
                scale: 0.35,
                duration: 1.75,
                ease: "hop",
              });
            },
          });
        },
      },
      "-=2.5"
    );

    tl.to(
      ".preloader",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0% , 0% 0%)",
        duration: 1.75,
        ease: "hop",
      },
      "-=0.5"
    );
    tl.to(
      ".contained",
      {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5900);
    document.body.style.overflow = isLoading ? "hidden" : "auto";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <div className="relative w-full">
      {isLoading && (
        <div ref={preloaderRef} className="preloader">
          <div className="progress-bar" />

          <div className="preloader-images">
            <div className="image">
              <Image
                src="/assets/images/img6.jpg"
                alt=""
                width={400}
                height={400}
                className="object-cover w-full h-full scale-[1.2]"
              />
            </div>
            <div className="image">
              <Image
                src="/assets/images/img7.jpg"
                alt=""
                width={400}
                height={400}
                className="object-cover w-full h-full scale-[1.2]"
              />
            </div>
            <div className="image">
              <Image
                src="/assets/images/img8.jpg"
                alt=""
                width={400}
                height={400}
                className="object-cover w-full h-full scale-[1.2]"
              />
            </div>
            <div className="image">
              <Image
                src="/assets/images/img9.jpg"
                alt=""
                width={400}
                height={400}
                className="object-cover w-full h-full scale-[1.2]"
              />
            </div>
          </div>

          <div className="preloader-copy ">
            <p className="text-[0.8rem] font-medium uppercase text-[#ebe5d9] text-center">
              A visual storyteller focused on shaping timeless fashion
              narratives through bold composition and refined tone.
            </p>
          </div>
        </div>
      )}
      {/* Tôi đã cho nó ra ngoài nó hiển thị */}
      <div className="preloader-header">
        <Link
          href="/"
          className="uppercase text-[7.5rem] font-semibold leading-[0.9] text-[#ebe5d9] block font-NeuroX tracking-wider"
        >
          tran thien duc
        </Link>
      </div>

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
