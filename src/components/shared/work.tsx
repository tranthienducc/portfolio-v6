"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

const sliderContent = [
  { name: "Serene Space", img: "/assets/images/bg-1.png" },
  { name: "Gentle Horizon", img: "/assets/images/bg-2.png" },
  { name: "Quiet Flow", img: "/assets/images/bg-3.png" },
  { name: "Ethereal Light", img: "/assets/images/bg-4.png" },
  { name: "Calm Drift", img: "/assets/images/bg-5.png" },
  { name: "Subtle Balance", img: "/assets/images/bg-6.png" },
  { name: "Soft Whisper", img: "/assets/images/bg-7.png" },
];

const clipPath = {
  closed: "polygon(25% 30%, 75% 30%, 75% 70%, 25% 70%)",
  open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
};

const slidePositions = {
  prev: { left: "15%", rotation: -90 },
  active: { left: "50%", rotation: 0 },
  next: { left: "85%", rotation: 90 },
};

const Work = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderTitleRef = useRef<HTMLDivElement>(null);
  const sliderPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1"
    );

    // Set initial positions
    Object.entries(slidePositions).forEach(([key, value]) => {
      gsap.set(`.slide-container.${key}`, {
        ...value,
        xPercent: -50,
        yPercent: -50,
        clipPath: key === "active" ? clipPath.open : clipPath.closed,
      });

      if (key !== "active") {
        gsap.set(`.slide-container.${key} .slide-img`, {
          rotation: -value.rotation,
        });
      }
    });

    // Animate initial title
    if (sliderTitleRef.current) {
      const initialTitle = sliderTitleRef.current?.querySelector("h1");
      if (initialTitle) {
        splitTextIntoSpans(initialTitle);
        gsap.fromTo(
          initialTitle.querySelectorAll("span"),
          { y: 60 },
          {
            y: 0,
            duration: 1,
            stagger: 0.02,
            ease: "hop",
          }
        );
      }
    }
  }, []);

  const splitTextIntoSpans = (element: HTMLHeadingElement) => {
    element.innerHTML = element.innerText
      .split("")
      .map((char) => `<span>${char === "" ? "&nbsp;&nbsp;" : char}</span>`)
      .join("");
  };

  const createAnimateTitle = (
    content: { name: string; img: string },
    direction: string
  ) => {
    const newTitle = document.createElement("h1");
    newTitle.innerText = content.name;
    if (sliderTitleRef.current) {
      sliderTitleRef.current.appendChild(newTitle);
    }
    splitTextIntoSpans(newTitle);

    const yOffset = direction === "next" ? 60 : -60;
    gsap.set(newTitle.querySelectorAll("span"), { y: yOffset });
    gsap.to(newTitle.querySelectorAll("span"), {
      y: 0,
      duration: 1.25,
      stagger: 0.02,
      ease: "hop",
      delay: 0.25,
    });

    const currentTitle = sliderTitleRef.current?.querySelector(
      "h1:not(:last-child)"
    );
    if (currentTitle) {
      gsap.to(currentTitle.querySelectorAll("span"), {
        y: -yOffset,
        duration: 1.25,
        stagger: 0.02,
        ease: "hop",
        delay: 0.25,
        onComplete: () => currentTitle.remove(),
      });
    }
  };

  const getSlideIndex = (increment: number) => {
    return (
      ((activeSlideIndex + increment - 1 + sliderContent.length) %
        sliderContent.length) +
      1
    );
  };

  const updatePreviewImage = (content: { name: string; img: string }) => {
    const newImage = document.createElement("img");
    newImage.src = content.img;
    newImage.alt = content.name;
    if (sliderPreviewRef.current) {
      sliderPreviewRef.current.appendChild(newImage);
    }

    gsap.fromTo(
      newImage,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.5,
        onComplete: () => {
          const oldImage = sliderPreviewRef.current?.querySelector(
            "img:not(:last-child)"
          );
          if (oldImage) oldImage.remove();
        },
      }
    );
  };

  const animateSlide = (
    slide: HTMLElement,
    props: { left: string; rotation: number; clipPath: string }
  ) => {
    gsap.to(slide, { ...props, duration: 2, ease: "hop" });
    gsap.to(slide.querySelector(".slide-img"), {
      rotation: -props.rotation,
      duration: 2,
      ease: "hop",
    });
  };

  const transitionSlides = (direction: string) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const [outgoingPos, incomingPos]: [
      "prev" | "active" | "next",
      "prev" | "active" | "next"
    ] = direction === "next" ? ["prev", "next"] : ["next", "prev"];

    if (!sliderRef.current) return;
    const outgoingSlide = (sliderRef.current as HTMLElement).querySelector(
      `.${outgoingPos}`
    );
    const activeSlide = (sliderRef.current as HTMLElement).querySelector(
      ".active"
    ) as HTMLElement;
    const incomingSlide = (sliderRef.current as HTMLElement).querySelector(
      `.${incomingPos}`
    ) as HTMLElement;

    if (incomingSlide) {
      animateSlide(incomingSlide, {
        ...slidePositions.active,
        clipPath: clipPath.open,
      });
    }

    if (activeSlide) {
      animateSlide(activeSlide, {
        ...slidePositions[outgoingPos],
        clipPath: clipPath.closed,
      });
    }

    gsap.to(outgoingSlide, {
      scale: 0,
      opacity: 0,
      duration: 2,
      ease: "hop",
    });

    const newSlideIndex = getSlideIndex(direction === "next" ? 2 : -2);
    const newSlide = createSlide(sliderContent[newSlideIndex - 1], incomingPos);
    sliderRef.current.appendChild(newSlide);

    gsap.set(newSlide, {
      ...slidePositions[incomingPos],
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
      clipPath: clipPath.closed,
    });

    gsap.to(newSlide, {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "hop",
    });

    const newActiveIndex = getSlideIndex(direction === "next" ? 1 : -1);
    createAnimateTitle(sliderContent[newActiveIndex - 1], direction);
    updatePreviewImage(sliderContent[newActiveIndex - 1]);

    setTimeout(() => {
      outgoingSlide?.remove();
      activeSlide.className = `slide-container ${outgoingPos}`;
      incomingSlide.className = "slide-container active";
      newSlide.className = `slide-container ${incomingPos}`;
      setActiveSlideIndex(newActiveIndex);
      setIsAnimating(false);
    }, 2000);
  };

  const createSlide = (
    content: { name: string; img: string },
    className: string
  ) => {
    const slide = document.createElement("div");
    slide.className = `slide-container ${className}`;
    slide.innerHTML = `
      <div class="slide-img">
        <img src=${content.img} alt=${content.name} loading="lazy" class="cover-img">
      </div>
    `;
    return slide;
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedSlide = (e.target as HTMLElement).closest(".slide-container");
    if (clickedSlide && !isAnimating) {
      transitionSlides(
        clickedSlide.classList.contains("next") ? "next" : "prev"
      );
    }
  };

  const handleItemClick = (index: number) => {
    if (index + 1 !== activeSlideIndex && !isAnimating) {
      transitionSlides(index + 1 > activeSlideIndex ? "next" : "prev");
    }
  };

  return (
    <section className="w-full relative mb-[20rem] h-screen max-w-full">
      <div className="slider" ref={sliderRef} onClick={handleSliderClick}>
        <div className="slide-container prev">
          <div className="slide-img">
            <Image
              src="/assets/images/bg-7.png"
              alt=""
              width={500}
              height={500}
              className="cover-img"
              priority={true}
            />
          </div>
        </div>
        <div className="slide-container active">
          <div className="slide-img">
            <Image
              src="/assets/images/bg-1.png"
              alt=""
              width={500}
              height={500}
              className="cover-img"
              priority={true}
            />
          </div>
        </div>
        <div className="slide-container next">
          <div className="slide-img">
            <Image
              src="/assets/images/bg-2.png"
              alt=""
              width={500}
              height={500}
              className="cover-img"
              priority={true}
            />
          </div>
        </div>

        <div className="slider-title" ref={sliderTitleRef}>
          <h1>Serene Space</h1>
        </div>

        <div className="slider-counter">
          <p className="text-[13px] font-medium text-[#5e5e5e] uppercase">
            <span>{activeSlideIndex}</span>
            <span>/</span>
            <span>{sliderContent.length}</span>
          </p>
        </div>

        <div className="slider-items">
          {sliderContent.map((item, index) => (
            <p
              key={item.name}
              className={
                index + 1 === activeSlideIndex
                  ? "activeItem uppercase text-[13px] font-medium"
                  : "text-[13px] font-medium text-[#5e5e5e] uppercase"
              }
              onClick={() => handleItemClick(index)}
            >
              {item.name}
            </p>
          ))}
        </div>

        <div className="slider-preview" ref={sliderPreviewRef}>
          <Image
            src="/assets/images/bg-1.png"
            alt=""
            width={500}
            height={500}
            className="cover-img"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Work;
