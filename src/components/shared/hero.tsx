import IconsFlower from "@/components/icons/IconsFlower";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative mb-[7%] h-screen flex flex-col px-12 py-10 w-full bg-[#f2f2f2] text-black leading-[0.8]">
      <Image
        src="/assets/images/bg-robot.png"
        alt="bg-robot"
        priority={true}
        width={1300}
        height={1300}
        className="object-cover absolute z-10 top-[44px] left-[20rem] w-[44rem]"
      />

      <h1 className="font-BiggerDisplay font-bold uppercase text-[13.5rem] text-[rgb(254,61,0)] z-0 pt-[2rem]">
        Tran Thien Duc
      </h1>
      <div className="flex flex-row items-center gap-[42.5rem]">
        <p className="font-BiggerDisplay font-bold uppercase text-[13.5rem] text-[rgb(254,61,0)]">
          By .
        </p>
        <p className="font-BiggerDisplay font-bold uppercase text-[13.5rem] text-[rgb(254,61,0)]">
          the
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full pt-4">
        <div className="flex flex-row items-center justify-between">
          <span className="text-sm font-bold uppercase text-black font-BiggerDisplay tracking-[0.1em]">
            2025
          </span>
          <div className="flex flex-row items-center gap-[20rem]">
            <span className="text-sm font-bold uppercase text-black font-BiggerDisplay tracking-[0.1em]">
              Portfolio
            </span>
            <span className="text-sm font-bold uppercase text-black font-BiggerDisplay tracking-[0.1em]">
              Freelance
            </span>
          </div>
        </div>
        <div className="h-[1px] bg-red-200/45 w-full"></div>
      </div>

      <div className="flex items-start gap-3 flex-row pt-20 pb-12 w-full justify-end">
        <IconsFlower />
        <div className="flex flex-col items-start">
          <span className="font-BiggerDisplay uppercase text-3xl font-bold pl-5">
            Frontend
          </span>
          <span className="font-BiggerDisplay uppercase text-3xl font-bold">
            Developer
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full">
        <p className="font-BiggerDisplay font-bold uppercase text-[13.5rem] text-[rgb(254,61,0)] z-[20]">
          creative
        </p>
        <p className="font-BiggerDisplay font-bold uppercase text-[13.5rem] text-[rgb(254,61,0)] z-[20]">
          ●25
        </p>
      </div>
    </section>
  );
};

export default Hero;
