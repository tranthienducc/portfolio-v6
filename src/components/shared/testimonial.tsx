"use client";
import { testimonials } from "@/constants";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messageRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const splitInstancesRef = useRef<{
    text?: SplitType;
    author?: SplitType;
    position?: SplitType;
  }>({});

  useEffect(() => {
    const textElement = messageRef.current;
    const authorElement = authorRef.current;
    const positionElement = positionRef.current;

    if (!textElement || !authorElement || !positionElement) return;

    // Revert previous split instances if they exist
    if (splitInstancesRef.current.text) {
      splitInstancesRef.current.text.revert();
    }
    if (splitInstancesRef.current.author) {
      splitInstancesRef.current.author.revert();
    }
    if (splitInstancesRef.current.position) {
      splitInstancesRef.current.position.revert();
    }

    // Update content first
    textElement.textContent = `"${testimonials[currentIndex].message}"`;
    authorElement.textContent = testimonials[currentIndex].author;
    positionElement.textContent = testimonials[currentIndex].position;

    // Create new split instances
    splitInstancesRef.current = {
      text: new SplitType(textElement, { types: "words" }),
      author: new SplitType(authorElement, { types: "words" }),
      position: new SplitType(positionElement, { types: "words" }),
    };

    // Set initial states
    gsap.set([textElement, authorElement, positionElement], {
      opacity: 0,
      y: 50,
    });

    // Create animation timeline
    const tl = gsap.timeline();

    tl.to(textElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.out",
    })
      .from(
        splitInstancesRef.current.text?.words || [],
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        authorElement,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.3"
      )
      .from(
        splitInstancesRef.current.author?.words || [],
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        positionElement,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.3"
      )
      .from(
        splitInstancesRef.current.position?.words || [],
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.4"
      );

    // Animate image
    const newImageElement = imageWrapperRef.current;
    if (newImageElement) {
      gsap.set(newImageElement, { opacity: 0, y: 50 });
      gsap.to(newImageElement, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }

    // Cleanup function
    return () => {
      tl.kill();
      // We don't need to revert here as we'll do it at the start of the next effect
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section className="mt-[20rem] px-12 pt-10">
      <div className="flex flex-col gap-y-space-lg border-b-2 border-white/10 pb-space-lg md:gap-y-space-2xl">
        <h2 className="section-heading-2 text-[#d1d1c7]">
          Look into it on your own./
        </h2>
        <div className="flex grid-cols-12 gap-x-fluid sm:justify-end lg:grid">
          <div className="col-span-7 col-start-1 flex flex-col gap-x-space-xl gap-y-space-2xs sm:col-start-6 sm:flex-row">
            <span className="flex h-fit overflow-clip font-mono">
              <span className="flex h-full font-medium uppercase text-nowrap text-[#7e766c]">
                (testimonial)
              </span>
            </span>
            <p className="sr-only text-pretty leading-[132.5%] tracking-[0]">
              Here&apos;s what my clients say about our collaboration. Their
              satisfaction and meeting expectations are my top priorities,
              ensuring the best experience possible.
            </p>
            <p className="w-full max-w-[30ch] text-balance text-base-large font-medium text-[#a29e9a]">
              <span className="leading-[132.5%]">
                Here&apos;s what my clients say about our collaboration. Their
                satisfaction and meeting expectations are my top priorities,
                ensuring the best experience possible.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="pt-space-lg">
        <div className="flex grid-cols-12 flex-col gap-y-space-2xs overflow-clip sm:h-screen lg:grid lg:gap-y-space-md lg:py-space-xl">
          <div className="relative order-last col-span-6 flex flex-col items-start justify-between lg:order-first">
            <div className="grid grid-cols-1 grid-rows-1 gap-y-space-xl sm:gap-y-0">
              <div className="col-start-1 col-end-2 row-start-1 row-end-2 gap-y-space-xl pt-space-sm">
                <div className="flex w-full flex-col gap-y-space-lg lg:gap-y-space-xl">
                  <h2
                    className="max-w-[20ch] text-balance text-heading-2 font-semibold text-[#d1d1c7] lg:max-w-[16ch] leading-[1.2]"
                    ref={messageRef}
                  >
                    &quot;{testimonial.message}&quot;
                  </h2>
                  <div className="flex flex-col text-base font-semibold">
                    <h3
                      className="flex h-fit overflow-clip leading-snug text-[#a29e9a]"
                      ref={authorRef}
                    >
                      {testimonial.author}
                    </h3>
                    <span
                      className="flex w-fit overflow-hidden text-[#bfbfb1]"
                      ref={positionRef}
                    >
                      {testimonial.position}
                    </span>
                    <div className="mt-space-sm flex flex-wrap gap-space-2xs overflow-clip text-base-small uppercase leading-[200%] text-[#7e766c]">
                      {testimonial.services.map((service, i) => (
                        <span className="text-nowrap w-fit tag" key={i}>
                          {service.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden h-full w-full items-end justify-between sm:flex">
              <div className="sticky bottom-8 mt-space-lg flex w-fit gap-x-space-xs pr-space-sm">
                <button
                  className="group pointer-events-auto relative flex h-fit w-fit transform-none items-center justify-center overflow-hidden rounded-full bg-[#bfbfb1] px-space-md py-space-xs text-base-small font-bold uppercase leading-none tracking-[0] text-black"
                  onClick={handlePrev}
                >
                  <span className="absolute inset-0 z-10 block overflow-hidden">
                    <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8c8c73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
                  </span>
                  <span className="relative z-20 block overflow-hidden transition-all">
                    <span className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]">
                      <span className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full">
                        Prev
                      </span>
                    </span>
                  </span>
                </button>
                <button
                  className="group pointer-events-auto relative flex h-fit w-fit transform-none items-center justify-center overflow-hidden rounded-full bg-[#bfbfb1] px-space-md py-space-xs text-base-small font-bold uppercase leading-none tracking-[0] text-black"
                  onClick={handleNext}
                >
                  <span className="absolute inset-0 z-10 block overflow-hidden">
                    <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8c8c73] transition-all duration-500 ease-expo sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
                  </span>
                  <span className="relative z-20 block overflow-hidden transition-all">
                    <span className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:content-[attr(after)] sm:group-hover:after:-translate-y-[100%]">
                      <span className="flex transition-all duration-500 ease-expo sm:group-hover:-translate-y-full">
                        Next
                      </span>
                    </span>
                  </span>
                </button>
              </div>
              <div className="relative order-first flex h-fit items-center gap-x-space-2xs overflow-clip text-heading-5 leading-[90%] text-[#a29e9a]">
                <div className="flex flex-col">
                  <div
                    className="absolute flex h-full w-fit flex-col text-center transition-all duration-700 ease-in-out-cubic"
                    style={{
                      transform: `translateY(-${currentIndex * 2}rem)`,
                    }}
                  >
                    {testimonials.map((_, index) => (
                      <span key={index}>{index + 1}</span>
                    ))}
                  </div>
                </div>
                <span className="h-[2px] w-16 rounded-full bg-[#a29e9a] ml-3"></span>
                <span>{testimonials.length}</span>
              </div>
            </div>
          </div>
          <div className="relative col-span-6 col-start-7 hidden aspect-square h-full w-full overflow-clip rounded-md bg-[#524d47] sm:block">
            <div
              className="absolute left-0 top-0 w-full h-full"
              ref={imageWrapperRef}
            >
              <div className="h-full w-full">
                <Image
                  src={testimonial.url}
                  alt="testimonial-img"
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
