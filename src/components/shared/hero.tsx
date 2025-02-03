"use client";
import IconsFlower from "@/components/icons/IconsFlower";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section
      className="relative mb-[7%] h-screen flex flex-col px-[1rem] lg:px-12 py-10 w-full bg-[#f2f2f2] text-black leading-[1.4] lg:leading-[0.8]"
      id="hero"
    >
      <Image
        src={
          isMobile
            ? "/assets/images/bg-robot.png"
            : "/assets/images/bg-robot.webp"
        }
        alt="bg-robot"
        priority={true}
        width={1300}
        height={1300}
        className="object-cover absolute z-0 lg:z-10 top-[44px] left-[0rem] lg:left-[20rem] w-[27rem] lg:w-[44rem]"
      />

      <h1 className="font-BiggerDisplay font-bold uppercase text-[4.3rem] md:text-[5.3rem] whitespace-nowrap lg:text-[13.5rem] text-[rgb(254,61,0)] z-0 pt-[7rem] lg:pt-[2rem]">
        Tran Thien Duc
      </h1>
      <div className="flex flex-row items-baseline lg:items-center gap-[13.5rem] lg:gap-[42.5rem]">
        <p className="font-BiggerDisplay font-bold uppercase text-[3.5rem] md:text-[6.5rem] lg:text-[13.5rem] text-[rgb(254,61,0)] z-0">
          By .
        </p>
        <p className="font-BiggerDisplay font-bold uppercase text-[3.5rem] md:text-[6.5rem] lg:text-[13.5rem] text-[rgb(254,61,0)] z-0">
          the
        </p>
      </div>
      <div className="lg:flex flex-col gap-2  hidden lg:w-full pt-4">
        <div className="flex flex-row items-center justify-between">
          <span className="text-sm font-bold uppercase text-black font-Gridular">
            2025
          </span>
          <div className="flex flex-row items-center gap-[20rem]">
            <span className="text-sm font-bold uppercase text-black font-Gridular">
              Portfolio
            </span>
            <span className="text-sm font-bold uppercase text-black font-Gridular">
              Freelance
            </span>
          </div>
        </div>
        <div className="h-[1px] bg-red-200/45 w-full"></div>
      </div>

      <div className="flex items-start gap-3 flex-row pt-20 pb-20 md:pb-28 lg:pb-12 w-full justify-end z-0">
        <IconsFlower />
        <div className="flex flex-col items-start">
          <span className="font-BiggerDisplay uppercase text-3xl font-bold pl-5 lg:text-black text-white">
            Frontend
          </span>
          <span className="font-BiggerDisplay uppercase text-3xl font-bold lg:text-black text-white">
            Developer
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full">
        <p className="font-BiggerDisplay font-bold uppercase text-[4.5rem] md:text-[5.5rem] lg:text-[13.5rem] text-[rgb(254,61,0)] z-[20]">
          creative
        </p>
        <p className="font-BiggerDisplay font-bold uppercase text-[4.5rem] md:text-[5.5rem] lg:text-[13.5rem] text-[rgb(254,61,0)] z-[20]">
          ●25
        </p>
      </div>
    </section>
  );
};

export default Hero;
