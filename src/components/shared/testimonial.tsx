"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import IconsSun from "@/components/icons/IconsSun";
import IconsLogos from "@/components/icons/IconsLogos";

type TestimonialType = {
  name: string;
  position: string;
  message: string;
  img: string;
};

const testimonialsData: TestimonialType[] = [
  {
    name: "Alice Johnson",
    position: "CEO at NovaCorp",
    message:
      "An inspiring journey that gave me clarity and confidence in my work. Is the best performance i have scene before.",
    img: "/assets/images/img1.jpg",
  },
  {
    name: "David Kim",
    position: "Product Designer",
    message:
      "An inspiring journey that gave me clarity and confidence in my work.",
    img: "/assets/images/img2.jpg",
  },
  {
    name: "Maria Lopez",
    position: "CTO at InnovateX",
    message: "Working with this platform was smooth and efficient.",
    img: "/assets/images/img3.jpg",
  },
  {
    name: "John Carter",
    position: "Freelance Developer",
    message:
      "This project gave me new opportunities I never thought possible in my client, services for you, that not complanit.",
    img: "/assets/images/img4.jpg",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messageRef = useRef<HTMLHeadingElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const posRef = useRef<HTMLSpanElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const currentImageRef = useRef<HTMLImageElement | null>(null);

  const current = testimonialsData[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (
      !messageRef.current ||
      !nameRef.current ||
      !posRef.current ||
      !imageContainerRef.current ||
      !currentImageRef.current
    )
      return;

    // Split text for message
    messageRef.current.innerHTML = "";
    current.message.split("").forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";

      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.classList.add("letters");
      span.style.display = "inline-block";
      span.style.transform = "translateY(100%)";

      wrapper.appendChild(span);
      messageRef.current!.appendChild(wrapper);
    });

    // Create GSAP timeline
    const tl = gsap.timeline();

    // Animate text
    const letters = messageRef.current.querySelectorAll(".letters");
    tl.to(letters, {
      y: "0%",
      opacity: 1,
      ease: "power4.out",
      duration: 0.5,
      stagger: { each: 0.02, from: "random", amount: 0.6 },
    });

    // Animate author name
    tl.fromTo(
      nameRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power4.out" },
      "-=0.4"
    );

    // Animate position
    tl.fromTo(
      posRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 0.6, duration: 0.4, ease: "power4.out" },
      "-=0.35"
    );

    // Image animation
    gsap.set(currentImageRef.current, { y: "100%", opacity: 0 });
    tl.to(
      currentImageRef.current,
      {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      },
      0
    );

    return () => {
      tl.kill(); // Clean up timeline
    };
  }, [currentIndex]);

  return (
    <section
      className="relative h-screen px-[1rem] lg:px-[1rem]"
      id="testimonial"
    >
      <div className="relative">
        {/* Background rectangles */}
        <Image
          src="/assets/images/rectangles.png"
          width={203}
          height={151}
          className="w-[203px] h-[151px] object-cover absolute top-[-11%] left-[16%] z-0"
          alt="bg-abstract"
        />
        <Image
          src="/assets/images/rectangles.png"
          width={203}
          height={151}
          className="w-[203px] h-[151px] object-cover absolute bottom-[5%] right-[35%] z-0"
          alt="bg-abstract"
        />

        {/* Message */}
        <h1
          ref={messageRef}
          className="text-[60px] lg:text-[120px] xl:text-[180px] leading-[138px] font-bold font-NeuroX uppercase text-[#ebe5d9]  text-center w-full mt-[204px] tracking-normal relative z-10"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        ></h1>

        {/* Image Container */}
        <div
          ref={imageContainerRef}
          className="absolute w-[320px] lg:w-[226px] xl:w-[226px] aspect-square left-[66%] top-[61%] z-20 transform rotate-[7deg]"
        >
          <Image
            ref={currentImageRef}
            className="w-full h-full rounded-2xl object-cover"
            src={current.img}
            alt="current-img-testimonials"
            width={480}
            height={480}
          />
        </div>

        {/* Controls + Author */}
        <div className="flex flex-row items-center justify-between w-full mt-10">
          {/* Prev - Next */}
          <div className="flex items-center gap-6 flex-row">
            <button onClick={handlePrev}>
              <Plus className="transform rotate-[-7deg] text-white" />
            </button>
            <button onClick={handleNext}>
              <Plus className="transform rotate-[12deg] text-white" />
            </button>
          </div>

          {/* Position - Author name */}
          <div className="flex flex-col items-start gap-0">
            <h4
              ref={nameRef}
              className="text-sm font-medium text-white whitespace-nowrap"
            >
              {current.name}
            </h4>
            <IconsLogos />
            <span
              ref={posRef}
              className="text-sm font-normal text-white opacity-40"
            >
              {current.position}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
