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

    if (splitInstancesRef.current.text) {
      splitInstancesRef.current.text.revert();
    }
    if (splitInstancesRef.current.author) {
      splitInstancesRef.current.author.revert();
    }
    if (splitInstancesRef.current.position) {
      splitInstancesRef.current.position.revert();
    }

    textElement.textContent = `"${testimonials[currentIndex].message}"`;
    authorElement.textContent = testimonials[currentIndex].author;
    positionElement.textContent = testimonials[currentIndex].position;

    splitInstancesRef.current = {
      text: new SplitType(textElement, { types: "words" }),
      author: new SplitType(authorElement, { types: "words" }),
      position: new SplitType(positionElement, { types: "words" }),
    };

    gsap.set([textElement, authorElement, positionElement], {
      opacity: 0,
      y: 50,
    });

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

    return () => {
      tl.kill();
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
    <section className="px-4 lg:px-12 py-10" id="testimonial">
      <div className="flex flex-col gap-y-8 border-b-2 border-white/10 pb-8 md:gap-y-12">
        <h2 className="section-heading-2 text-[#d1d1c7] font-BiggerDisplay uppercase">
          Look into it on your own./
        </h2>
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-x-fluid">
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col sm:flex-row gap-4">
            <span className="flex h-fit overflow-clip font-mono">
              <span className="flex h-full font-medium uppercase text-nowrap text-[#7e766c]">
                (testimonial)
              </span>
            </span>
            <p className="w-full max-w-[30ch] text-balance text-base-large font-medium text-[#a29e9a] leading-[132.5%]">
              Here&apos;s what my clients say about our collaboration. Their
              satisfaction and meeting expectations are my top priorities,
              ensuring the best experience possible.
            </p>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
          <div className="flex flex-col lg:col-span-6 gap-8 justify-between">
            <div className="flex flex-col gap-8">
              <h2
                className="max-w-[20ch] text-balance text-heading-2 font-semibold text-[#d1d1c7] leading-[1.2]"
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
                <div className="mt-4 flex flex-wrap gap-2 text-base-small uppercase leading-[200%] text-[#7e766c]">
                  {testimonial.services.map((service, i) => (
                    <span className="text-nowrap w-fit tag" key={i}>
                      {service.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  className="group relative flex items-center justify-center rounded-full bg-[#bfbfb1] px-4 py-2 text-base-small font-bold uppercase text-black"
                  onClick={handlePrev}
                >
                  <span className="absolute inset-0 z-10 block overflow-hidden rounded-full">
                    <span className="block h-full w-full translate-y-full bg-[#8c8c73] transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:rounded-none"></span>
                  </span>
                  <span className="relative z-20">Prev</span>
                </button>
                <button
                  className="group relative flex items-center justify-center rounded-full bg-[#bfbfb1] px-4 py-2 text-base-small font-bold uppercase text-black"
                  onClick={handleNext}
                >
                  <span className="absolute inset-0 z-10 block overflow-hidden rounded-full">
                    <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[#8c8c73] transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:rounded-none"></span>
                  </span>
                  <span className="relative z-20">Next</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-heading-5 text-[#a29e9a]">
                <span>{currentIndex + 1}</span>
                <span className="h-[2px] w-16 rounded-full bg-[#a29e9a]"></span>
                <span>{testimonials.length}</span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7 aspect-square w-full overflow-clip rounded-md bg-[#524d47]">
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
