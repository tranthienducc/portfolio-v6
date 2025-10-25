"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ChildProps } from "@/utils/types";
import Logo from "@/components/icons/Logo";

const BlockReveal = ({ children }: ChildProps) => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const blockRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const transition = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    const creatBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blockRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "blocks";
        overlayRef.current.appendChild(block);
        blockRef.current.push(block);
      }
    };
    creatBlocks();

    gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left" });

    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
        });
      }
    }

    revealPage();

    const handleRouteChange = (url: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    // Define the click handler so it can be referenced for both add/remove
    const handleLinkClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement | null;
      if (target && target.href) {
        const href = target.href;
        const url = new URL(href).pathname;
        if (url !== pathname) {
          handleRouteChange(url);
        }
      }
    };

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });
    if (pathname !== currentPath) {
      setTimeout(() => setCurrentPath(pathname), 1500); // Delay để chờ animation chạy xong
    }

    // Cleanup function
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      if (transition.current) {
        gsap.killTweensOf(transition.current);
      }
    };
  }, [pathname]); // Re-run effect when pathname changes

  const coverPage = (url: string) => {
    const tl = gsap.timeline({
      onComplete: () => router.push(url),
    });

    tl.to(blockRef.current, {
      scaleX: 1,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "left",
    })

      .set(logoOverlayRef.current, { opacity: 1 }, "-=0.2")
      .set(
        logoOverlayRef.current
          ? logoOverlayRef.current.querySelector<SVGPathElement>("path")
          : null,
        {
          strokeDashoffset: logoRef.current
            ?.querySelector("path")
            ?.getTotalLength(),
          fill: "transparent",
        },
        "-=0.25"
      )
      .to(
        logoRef.current?.querySelector("path") ?? [],
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
        },
        "-=0.5"
      )
      .to(
        logoRef.current?.querySelector("path")
          ? logoRef.current.querySelector("path")!
          : [],
        {
          fill: "#ebe5d9",
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(logoOverlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      });
  };

  const revealPage = () => {
    gsap.set(blockRef.current, { scaleX: 1, transformOrigin: "right" });

    gsap.to(blockRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  };
  return (
    <>
      <div className="transition-overlay" ref={overlayRef}></div>
      <div className="logo-overlay" ref={logoOverlayRef}>
        <div className="logo-container">
          <Logo ref={logoRef} />
        </div>
      </div>
      <div className={`transition-opacity duration-1000 opacity-100`}>
        {children}
      </div>
    </>
  );
};

export default BlockReveal;
