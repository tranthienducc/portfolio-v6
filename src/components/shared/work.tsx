"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

const slideContent = ["Strive", "Lenas", "Blog", "Todo App"];

const Work = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(2);
  const [currentContentIndex, setCurrentContentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSplitTextIntoSpan = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const text = element.textContent || "";
      const splitText = text
        .split("")
        .map(
          (char: string) =>
            `<span style="position: relative;">${
              char === " " ? "&nbsp;&nbsp;" : char
            }</span>`
        )
        .join("");
      element.innerHTML = splitText;
    });
  };

  const handleAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    handleSplitTextIntoSpan(".slider-content-active h1");

    const nextIndex = (currentImageIndex % slideContent.length) + 1;
    setCurrentImageIndex(nextIndex);

    // Tạo HTML cho slide mới
    const newSlideHTML = ` 
      <div class="slide-next">
        <div class="slide-next-img">
          <img src="/assets/images/imgproject${nextIndex}.webp" alt="Image" width="1300" height="1300" class="object-cover w-full h-full" loading="lazy" />
        </div>
      </div>
    `;
    document
      ?.querySelector(".slider")
      ?.insertAdjacentHTML("beforeend", newSlideHTML);

    // Animation cho text
    gsap.to(".slider-content-active h1 span", {
      top: "-175px",
      stagger: 0.05,
      ease: "power3.out",
      duration: 0.5,
      onComplete: () => {
        gsap.to(".slider-content-active", {
          top: "-175px",
          duration: 0.25,
          ease: "power3.out",
        });
      },
    });

    // Animation cho slide mới
    const slideNextElement = document.querySelector(".slide-next img");
    gsap.to(slideNextElement, {
      scale: 2,
      duration: 2,
      ease: "power3.out",
    });

    // Content animation
    handleSplitTextIntoSpan(".slider-content-next h1");
    gsap.set(".slider-content-next h1 span", {
      top: "200px",
      visibility: "hidden",
    });

    gsap.to(".slider-content-next", {
      top: "0",
      duration: 1.125,
      ease: "power3.out",
      onComplete: () => {
        const activeContent = document.querySelector(".slider-content-active");
        if (activeContent) activeContent.remove();

        gsap.to(".slider-content-next h1 span", {
          top: 0,
          stagger: 0.05,
          ease: "power3.out",
          duration: 0.5,
          visibility: "visible",
        });

        const nextContent = document.querySelector(".slider-content-next");
        nextContent?.classList.remove("slider-content-next");
        nextContent?.classList.add("slider-content-active");
        if (nextContent) {
          (nextContent as HTMLElement).style.top = "0";
        }

        setCurrentContentIndex(
          (prevIndex) => (prevIndex + 1) % slideContent.length
        );

        const newContentText = slideContent[currentContentIndex];
        const newContentHTML = `<div class="slider-content-next" style="top: 200px; visibility: hidden;"><h1 class="heading">${newContentText}</h1></div>`;
        const sliderContent = document.querySelector(".slider-content");
        if (sliderContent) {
          sliderContent.insertAdjacentHTML("beforeend", newContentHTML);
        }
      },
    });

    gsap.to(".slide-next-img", {
      width: "100vw",
      height: "100vh",
      duration: 2,
      ease: "power3.out",
      onComplete: () => {
        const currentActiveSlide = document.querySelector(".slide-active");
        if (currentActiveSlide) {
          currentActiveSlide?.parentNode?.removeChild(currentActiveSlide);
        }

        const nextSlide = document.querySelector(".slide-next");
        if (nextSlide) {
          nextSlide.classList.remove("slide-next");
          nextSlide.classList.add("slide-active");

          const nextSlideImg = nextSlide.querySelector(".slide-next-img");
          nextSlideImg?.classList.remove("slide-next-img");
        }

        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      },
    });
  };

  useEffect(() => {
    gsap.to(".slide-next-img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power3.out",
      delay: 1,
    });

    document.addEventListener("click", handleAnimation);

    return () => {
      document.removeEventListener("click", handleAnimation);
    };
  }, [isAnimating, currentImageIndex, currentContentIndex]);

  return (
    <section className="w-full relative mb-[20rem] h-screen max-w-full">
      <div className="copy">
        <p>Projects Catalogue</p>
        <p>2024 / 2025</p>
      </div>

      <div className="slider">
        <div className="slide-active">
          <Image
            src="/assets/images/imgproject1.webp"
            alt="Slide 1"
            width={1300}
            height={1300}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="slide-next">
          <div className="slide-next-img">
            <Image
              src="/assets/images/imgproject2.webp"
              alt="Slide 2"
              width={1300}
              height={1300}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="slider-content">
        <div className="slider-content-active">
          <Link href="/case-study">
            <h1 className="heading">{slideContent[currentContentIndex]}</h1>
          </Link>
        </div>
        <div className="slider-content-next">
          <h1 className="heading">
            {slideContent[(currentContentIndex + 1) % slideContent.length]}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Work;
