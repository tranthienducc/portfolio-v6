"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import IconsRightBottom from "@/components/icons/IconsRightBottom";

const Hero = () => {
  const model1Ref = useRef<HTMLDivElement>(null);
  const model2Ref = useRef<HTMLDivElement>(null);
  const model3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set([model1Ref.current, model2Ref.current, model3Ref.current], {
      autoAlpha: 0,
      scale: 0.95,
    });
  }, []);

  const handleHover = (modelRef: React.RefObject<HTMLDivElement>) => {
    gsap.to(modelRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleLeave = (modelRef: React.RefObject<HTMLDivElement>) => {
    gsap.to(modelRef.current, {
      autoAlpha: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power3.inOut",
    });
  };
  return (
    <section
      className="relative mb-[18%] h-screen flex flex-col px-[1rem] lg:px-[1rem] py-[45px] w-full text-black leading-[1.4] lg:leading-[0.8] overflow-hidden"
      id="hero"
    >
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row items-end gap-3">
          <div className="rounded-xl w-[200px] h-[220px] border-white/30 border">
            <Image
              src="/assets/images/img6.jpg"
              loading="lazy"
              alt="me-1"
              className="w-[200px] h-[220px] object-cover rounded-xl"
              width={200}
              height={220}
            />
          </div>
          <div className="rounded-xl w-[200px] h-[280px] border-white/30 border">
            <Image
              src="/assets/images/img8.jpg"
              loading="lazy"
              alt="me-3"
              className="w-[200px] h-[280px] object-cover rounded-xl"
              width={200}
              height={220}
            />
          </div>
          <div className="rounded-xl w-[200px] h-[190px] border-white/30 border">
            <Image
              src="/assets/images/img7.jpg"
              loading="lazy"
              alt="me-2"
              className="w-[200px] h-[190px] object-cover rounded-xl"
              width={200}
              height={220}
            />
          </div>
        </div>

        <p className="text-sm font-medium text-white/70 max-w-[260px] w-full pt-[5rem]">
          Beautiful, user-friendly websites that create seamless experiences and
          elevate your business, committed to delivering exceptional results
          through our strategic approach.
        </p>
      </div>

      <IconsRightBottom className="absolute right-[2%] top-[35%]" />
      <div className="flex flex-col text-center justify-end h-svh font-bold">
        <div className="relative inline-block">
          <div className="relative w-full h-[1.5px] bg-[#afadad33]"></div>
          <h1
            className="uppercase text-[8rem] leading-[1] tracking-[-0.5rem] text-[#ebe5d9]"
            onMouseEnter={() => handleHover(model1Ref)}
            onMouseLeave={() => handleLeave(model1Ref)}
          >
            A Vison
          </h1>
          <div className="absolute top-[10%] left-[30%]">
            <span className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[10.48px] leading-[9.3px] font-AntikorMono">
              UI/UX
            </span>
          </div>
          <div className="absolute top-[10%] right-[25.9%]">
            <span className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[10.48px] leading-[9.3px] font-AntikorMono uppercase">
              Desginer
            </span>
          </div>
        </div>
        <div className="relative inline-block">
          <div className="relative w-full h-[1.5px] bg-[#afadad33]"></div>
          <h1
            className="uppercase text-[8rem] leading-[1] tracking-[-0.5rem] text-[#ebe5d9]"
            onMouseEnter={() => handleHover(model2Ref)}
            onMouseLeave={() => handleLeave(model2Ref)}
          >
            Captured Through
          </h1>
          <div className="absolute top-[10%] left-[3%]">
            <span className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[10.48px] leading-[9.3px] font-AntikorMono uppercase">
              Portfolio
            </span>
          </div>
          <div className="absolute top-[10%] right-[3%]">
            <span className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[10.48px] leading-[9.3px] font-AntikorMono uppercase">
              2025
            </span>
          </div>
        </div>
        <div className="relative inline-block">
          <div className="relative w-full h-[1.5px] bg-[#afadad33]"></div>
          <h1
            className="uppercase text-[8rem] leading-[1] tracking-[-0.5rem] text-[#ebe5d9]"
            onMouseEnter={() => handleHover(model3Ref)}
            onMouseLeave={() => handleLeave(model3Ref)}
          >
            Tran Thien Duc
          </h1>
          <div className="absolute top-[10%] left-[10%]">
            <span className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[10.48px] leading-[9.3px] font-AntikorMono uppercase">
              Front End
            </span>
          </div>
          <div className="absolute top-[10%] right-[10%]">
            <span className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[10.48px] leading-[9.3px] font-AntikorMono uppercase">
              Developer
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-[40%] left-[15%]" ref={model1Ref}>
        <Image
          src="/assets/images/model-1.avif"
          alt="model-1"
          width={200}
          height={200}
          className="w-[200px] h-[200px]"
        />
      </div>
      <div className="absolute top-[49%] right-[15%]" ref={model2Ref}>
        <Image
          src="/assets/images/model-2.avif"
          alt="model-2"
          width={200}
          height={200}
          className="w-[200px] h-[200px]"
        />
      </div>
      <div className="absolute top-[74%] left-[40%]" ref={model3Ref}>
        <Image
          src="/assets/images/model-3.avif"
          alt="model-3"
          width={200}
          height={200}
          className="w-[200px] h-[200px]"
        />
      </div>
    </section>
  );
};

export default Hero;
