"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import gsap from "gsap";

const sliderContent = ["Blog", "Todo App", "Strive", "Lenas"];

const Work = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [allowScrollNextSection, setAllowScrollNextSection] = useState(false);
  let lastScrollTime = 0;
  const throttleDelay = 200;

  const handleScroll = (e: { deltaY: number }) => {
    const currentTime = Date.now();
    if (currentTime - lastScrollTime < throttleDelay) return;
    lastScrollTime = currentTime;

    // Kiểm soát cuộn
    if (!allowScrollNextSection) {
      if (e.deltaY > 0 && activeSlide < sliderContent.length - 1) {
        // Cuộn xuống
        setActiveSlide((prev) => prev + 1);
      } else if (e.deltaY < 0 && activeSlide > 0) {
        // Cuộn lên
        setActiveSlide((prev) => prev - 1);
      }

      // Kích hoạt cho phép cuộn tiếp khi đã đạt slide cuối
      if (e.deltaY > 0 && activeSlide === sliderContent.length - 1) {
        setAllowScrollNextSection(true);
      } else if (e.deltaY < 0 && activeSlide === 0) {
        setAllowScrollNextSection(false); // Không cho cuộn về section trước nếu đang ở đầu
      }
    }
  };

  useEffect(() => {
    const slider = document.querySelector(".slider") as HTMLElement;
    const currentSlide = slider?.querySelector(".slide:not(.exiting)");

    // Xóa slide hiện tại
    if (currentSlide) {
      const exitingImgs = currentSlide.querySelectorAll("img");
      gsap.to(exitingImgs, {
        top: activeSlide < 1 ? "0%" : "100%", // Điều chỉnh hướng animation
        duration: 1.5,
        ease: "power4.inOut",
      });
      currentSlide.classList.add("exiting");
    }

    const newSlide = document.createElement("div");
    newSlide.classList.add("slide", "light");
    newSlide.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

    const newSlideImg1 = document.createElement("div");
    newSlideImg1.className = "slide-img slide-img-1";
    const img1 = document.createElement("img");
    img1.src = `/assets/images/imgproject${activeSlide + 1}.webp`;
    img1.style.top = "100%";
    newSlideImg1.appendChild(img1);
    newSlide.appendChild(newSlideImg1);

    const newSlideContent = document.createElement("div");
    newSlideContent.classList.add("slide-content");
    newSlideContent.innerHTML = `<h1>${sliderContent[activeSlide]}</h1>`;
    newSlide.appendChild(newSlideContent);

    const newSlideImg2 = document.createElement("div");
    newSlideImg2.className = "slide-img slide-img-2";
    const img2 = document.createElement("img");
    img2.src = `/assets/images/imgproject${activeSlide + 1}.webp`;
    img2.style.top = "100%";
    newSlideImg2.appendChild(img2);
    newSlide.appendChild(newSlideImg2);

    slider?.appendChild(newSlide);

    gsap.to(newSlide, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power4.inOut",
      onStart: () => {
        gsap.to([img1, img2], {
          top: "50%",
          duration: 1.5,
          ease: "power4.inOut",
        });
      },
      onComplete: () => {
        if (slider) removeExtraSlide(slider);
      },
    });

    gsap.to(".slide-content h1", {
      scale: 1,
      duration: 1.5,
      ease: "power4.inOut",
    });
  }, [activeSlide]);

  const removeExtraSlide = (container: HTMLElement) => {
    while (container.children.length > 5) {
      if (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }
  };

  return (
    <section
      className="w-full relative mb-[20rem]"
      onWheel={handleScroll}
      style={{
        overflow: allowScrollNextSection ? "visible" : "hidden",
      }}
    >
      <div className="slider">
        <div className="slide light">
          <div className="slide-img slide-img-1">
            <Image
              src={`/assets/images/imgproject${activeSlide + 1}.webp`}
              alt={`slide-${activeSlide + 1}`}
              loading="lazy"
              width={1300}
              height={1300}
            />
          </div>
          <div className="slide-content">
            <h1>{sliderContent[activeSlide]}</h1>
          </div>
          <div className="slide-img slide-img-2">
            <Image
              src={`/assets/images/imgproject${activeSlide + 1}.webp`}
              alt={`slide-${activeSlide + 1}`}
              loading="lazy"
              width={1300}
              height={1300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
