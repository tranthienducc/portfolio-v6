"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Image from "next/image";

const Hero = () => {
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
    console.log("heroImgRef.current:", heroImgRef.current);
    if (heroImgRef.current) {
      // Initialize the hero image as hidden
      gsap.set(heroImgRef.current, { opacity: 0, scale: 4 });

      // Animate the hero image
      gsap.to(heroImgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "hop",
        delay: 0.2, // Small delay to ensure smooth transition
      });
    }
  }, []);

  return (
    <section
      className="relative mb-[18%] h-screen flex flex-col px-[1rem] lg:px-[1rem] py-[45px] w-full text-black leading-[1.4] lg:leading-[0.8]"
      id="hero"
    >
      <p className="uppercase font-bold font-InterDisplay text-[175.688px] leading-[157.75px] text-[#ebe5d9] z-10">
        tran thien duc
      </p>
      <CircleOverlay />
      <Image
        src="/assets/images/test5.jpg"
        alt="hero-img"
        width={300}
        height={400}
        className="object-cover rounded-lg w-[300px] h-[400px] ml-[36rem] transform rotate-[2deg]"
      />

      <div className="absolute bottom-[49%] left-[61%] text-white text-3xl transform rotate-2">
        +
      </div>
      <div className="absolute left-[36%] top-[55%] text-white text-3xl transform rotate-2">
        +
      </div>

      <div className="w-[64%] z-0 px-[18.2rem]">
        <div className="w-[647px] flex flex-none content-start items-start flex-col flex-nowrap gap-[3px] h-[154px] justify-center p-0 relative">
          <h1 className="font-Inter text-[43px] font-semibold leading-[0.91em] text-[#ebe5d9] text-left">
            Crafting Digital{" "}
            <span className="font-InstrumentSerif font-normal italic">
              Designs
            </span>{" "}
            that Elevate SasS & AI Innovators
          </h1>
          <div className="flex items-center justify-between text-white w-[593px]">
            <div className="flex items-center flex-row gap-[9rem]">
              <h4 className="text-[11.5px] leading-[1.8em] font-medium">
                ©2025
              </h4>
              <h4 className="uppercase text-[11.5px] leading-[1.8em] font-medium">
                base in vietnam
              </h4>
            </div>
            <h4 className="text-[11.5px] leading-[1.8em] font-medium uppercase">
              Designer
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

function CircleOverlay() {
  return (
    <div className="relative w-full h-[600px]">
      <div className="absolute top-[50%] left-[55%] w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full" />

      <div className="absolute top-[50%] left-[35%] w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full" />
    </div>
  );
}
