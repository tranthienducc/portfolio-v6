"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ChildProps } from "@/utils/types";

const BlockReveal = ({ children }: ChildProps) => {
  const transition = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAnimating = useRef(false);
  const [currentPath, setCurrentPath] = useState(pathname);
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (!transition.current) return;
    const transitionCols =
      transition.current.querySelectorAll(".transition-column");
    const transitionColTexts = transition.current.querySelectorAll(
      ".transition-column-text > span"
    );
    const transitionElementTexts = transition.current.querySelectorAll(
      ".transition-element > h1"
    );

    const initTransition = () => {
      gsap.set(transition.current, { display: "none", autoAlpha: 0 });
      gsap.set(transitionCols, { y: "-101%" });
      gsap.set(transitionColTexts, { autoAlpha: 0, y: "-101%" });
      gsap.set(transitionElementTexts, { autoAlpha: 0 });
      isAnimating.current = false;
    };

    const hide = () => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          initTransition();
          setIsPageReady(true);
        },
      });

      tl.to(
        transitionElementTexts,
        {
          duration: 1,
          autoAlpha: 0,
          stagger: 0.055,
        },
        0
      )
        .to(
          transitionCols,
          {
            duration: 1.25,
            y: "101%",
            stagger: {
              each: 0.045,
              from: "random",
              grid: "auto",
            },
          },
          0.75
        )
        .to(transition.current, {
          duration: 0.2,
          display: "none",
          autoAlpha: 0,
        });
    };

    const show = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setIsPageReady(false);

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
      });

      tl.to(
        transition.current,
        {
          duration: 0.2,
          display: "block",
          autoAlpha: 1,
        },
        0
      )
        .to(
          transitionCols,
          {
            duration: 1.25,
            y: 0,
            stagger: {
              each: 0.045,
              from: "random",
              grid: "auto",
            },
          },
          0.05
        )
        .to(
          transitionColTexts,
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
          },
          0.5
        )
        .to(
          transitionColTexts,
          {
            duration: 1,
            autoAlpha: 0,
            y: "101%",
          },
          2.75
        )
        .to(
          transitionElementTexts,
          {
            duration: 1,
            autoAlpha: 1,
            stagger: {
              each: 0.055,
              from: "random",
            },
            onComplete: () => {
              hide();
            },
          },
          0.75
        );
    };

    // Initialize transition
    initTransition();

    if (pathname !== currentPath) {
      show();
      setTimeout(() => setCurrentPath(pathname), 1500); // Delay để chờ animation chạy xong
    }

    // Cleanup function
    return () => {
      if (transition.current) {
        gsap.killTweensOf(transition.current);
        gsap.killTweensOf(transitionCols);
        gsap.killTweensOf(transitionColTexts);
        gsap.killTweensOf(transitionElementTexts);
      }
    };
  }, [pathname]); // Re-run effect when pathname changes

  return (
    <>
      <section ref={transition} className="transitioned">
        <div className="transition-wrapper">
          <div className="transition-element">
            <h1>W</h1>
            <h1>A</h1>
            <h1>D</h1>
            <h1>M</h1>
          </div>

          <div className="transition-columns">
            <div className="transition-column">
              <div className="transition-column-text">
                <span>We</span>
                <span>W</span>
              </div>
            </div>

            <div className="transition-column">
              <div className="transition-column-text">
                <span>Are</span>
                <span>A</span>
              </div>
            </div>

            <div className="transition-column"></div>

            <div className="transition-column">
              <div className="transition-column-text">
                <span>Digital</span>
                <span>D</span>
              </div>
            </div>
            <div className="transition-column">
              <div className="transition-column-text">
                <span>Makers</span>
                <span>M</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`transition-opacity duration-1000 opacity-100`}>
        {children}
      </div>
    </>
  );
};

export default BlockReveal;
