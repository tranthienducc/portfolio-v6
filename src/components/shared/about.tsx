import IconsArrowDown from "@/components/icons/IconsArrowDown";
import Image from "next/image";

const About = () => {
  return (
    <section className="mb-[20rem] w-full max-w-full px-12 py-10">
      <div className="lg:gap-y-space-2xl gap-y-space-lg flex flex-col">
        <div className="custom-grid">
          <IconsArrowDown />
          <h2 className="section-heading relative z-30 col-span-full flex w-full flex-col leading-none text-[#d1d1c7] mix-blend-exclusion lg:col-span-7 lg:col-start-6 text-[121.531px] font-semibold">
            <span
              aria-hidden="true"
              className="leading-[121.531px] tracking-[-3.03827px]"
            >
              Designer,
            </span>
            <span
              aria-hidden="true"
              className="leading-[121.531px] tracking-[-3.03827px]"
            >
              Developer,
            </span>
            <span
              aria-hidden="true"
              className="leading-[121.531px] tracking-[-3.03827px]"
            >
              Creator /
            </span>
          </h2>
        </div>
        <div className="lg:gap-y-space-2xl col-span-full gap-y-space-lg custom-grid">
          <div className="pointer-events-none relative z-0 col-span-4 flex w-full items-center overflow-clip rounded-md md:items-end">
            <Image
              src="/assets/images/client-2.jpg"
              alt="img-profile"
              loading="lazy"
              width={460}
              height={575}
              className="w-full rounded object-cover object-center h-[575px]"
            />
            <div className="absolute top-0 h-full w-full bg-gradient-to-t from-[#080807] to-transparent opacity-30 rounded 2xl:rounded-2xl"></div>
          </div>
          <div className="col-span-7 col-start-6 flex flex-col gap-y-space-xl lg:gap-y-space-2xl">
            <p className="sr-only">
              With a passion for design and development, I take projects from
              ideation to launch, ensuring a seamless journey that leaves a
              lasting positive impact on the digital landscape and your
              business.
            </p>
            <p
              className="relative w-full max-w-[39ch] text-balance text-heading-4 font-medium leading-snug text-[#d1d1c7]"
              aria-hidden="true"
            >
              <span aria-hidden="true" className="leading-[132.5%]">
                With a passion for design and development, I take projects from
                ideation to launch, ensuring a seamless journey that leaves a
                lasting positive impact on the digital landscape and your
                business.
              </span>
            </p>
            <div className="flex flex-col gap-x-space-xl gap-y-space-sm lg:flex-row">
              <span className="flex h-fit overflow-clip font-mono tracking-[-.035em]">
                <span className="flex h-full font-medium uppercase text-nowrap text-[#a29e9a]">
                  (About me)
                </span>
              </span>
              <p className="flex w-full max-w-[38ch] flex-col text-balance text-xl font-medium leading-[132.5%] text-[#a29e9a]">
                Creating great web experiences is my primary focus. I ensure
                each project leaves users with a feel-good sensation through
                meticulous attention to detail and user-centric design
                principles.
                <br />
                <br />
                When I&apos;m not immersed in web development and design, you
                can find me sharing insights about my freelance journey on
                YouTube, bouldering, playing music, or tending to my cherished
                houseplants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
