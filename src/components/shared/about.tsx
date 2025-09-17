import Heading from "@/components/heading";
import Image from "next/image";

const About = () => {
  return (
    <section
      className="pt-[8.75rem] w-full max-w-full px-[1rem] lg:px-[1rem] lg:pt-[19rem]"
      id="about"
    >
      <Heading
        heading="About Around Thien"
        subheading={[
          "Thien Duc",
          "Fronnt",
          "End",
          "Desinger",
          "NOMAD",
          "GAMER",
        ]}
      />

      <div className="flex flex-row gap-10 mx-[20%] my-12">
        <Image
          className="w-[479.61px] h-[479.61px] rounded-md"
          src="/assets/images/img7.jpg"
          loading="lazy"
          alt="img-testimonials"
          width={479.61}
          height={479.61}
        />
        <Image
          className="w-[479.61px] h-[479.61px] rounded-md"
          src="/assets/images/img2.jpg"
          loading="lazy"
          alt="img-testimonials"
          width={479.61}
          height={479.61}
        />
      </div>
      <Information />
    </section>
  );
};

export default About;

function Information() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start gap-[313px] justify-start pl-[13.6rem] mb-[359px]">
        <h4 className="uppercase text-[11.5px] font-semibold leading-[20.7px] text-white opacity-40">
          approach
        </h4>
        <div className="max-w-[478px] w-full flex flex-col text-left">
          <div className="max-w-[300px] w-full mb-[59px]">
            {/* sửa lại cái này */}
            <h3 className="text-[38px] leading-[37.86px] text-white opacity-80 font-semibold">
              Designing for Impact and Clarity
            </h3>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-wrap text-base font-semibold text-white opacity-70">
              I believe great design is more than aesthetics. It’s about
              strategy, clarity, and growth. Every project I take on starts with
              a deep understanding of your brand’s goals, audience, and
              positioning.
            </p>
          </div>
          <div className="max-w-full w-full">
            <p className="text-base font-semibold text-white opacity-70">
              My approach blends strategy and execution, ensuring every design
              decision serves a purpose. Whether crafting a visual identity, a
              high-converting website, or a seamless user experience, I focus on
              creating work that not only looks great but drives real results.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-start gap-[313px] justify-start pl-[31.6rem] mb-[304px]">
        <h4 className="uppercase text-[11.5px] font-semibold leading-[20.7px] text-white opacity-40">
          Background
        </h4>
        <div className="max-w-[478px] w-full flex flex-col text-left">
          <div className="max-w-[320px] w-full mb-[59px]">
            <h3 className="text-[38px] leading-[37.86px] text-white opacity-80 font-semibold">
              Journey from Frontend to Designer
            </h3>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-wrap text-base font-semibold text-white opacity-70">
              I started in marketing but found my passion in design—solving
              problems creatively.
            </p>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-base font-semibold text-white opacity-70">
              After cutting my teeth at a branding agency in Vietnam I built my
              one-person design business, gaining the freedom to travel and work
              globally.
            </p>
          </div>
          <div className="max-w-full w-full">
            <p className="text-base font-semibold text-white opacity-70">
              Today, I help startups and tech companies create brands and
              websites that stand out and scale.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-start gap-[313px] justify-start pl-0 mb-[380px]">
        <h4 className="uppercase text-[11.5px] font-semibold leading-[20.7px] text-white opacity-40">
          beyond design
        </h4>
        <div className="max-w-[478px] w-full flex flex-col text-left">
          <div className="max-w-[315px] w-full mb-[59px]">
            <h3 className="text-[38px] leading-[37.86px] text-white opacity-80 font-semibold">
              Free spirit and explorer
            </h3>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-wrap text-base font-semibold text-white opacity-70">
              When I’m not designing, I’m playing chess, hiking with my dog, or
              exploring new places. I’ve lived in Can Tho, worked from aluminum
              and glass work, and love the intersection of nature, creativity,
              and technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
