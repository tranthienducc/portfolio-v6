import Heading from "@/components/heading";
import InversionLens from "@/components/InversionLens";

const About = () => {
  return (
    <section
      className="pt-[8.75rem] w-full max-w-full px-[1rem] lg:px-[1rem] lg:pt-[19rem]"
      id="about"
    >
      <Heading
        className="text-[255.35px] leading-[0.8em]"
        heading="About Thien"
        subheading={[
          "Thien Duc",
          "Fronnt",
          "End",
          "Desinger",
          "NOMAD",
          "GAMER",
        ]}
      />

      <InversionLens className="mt-4 mb-[156px]" src="/assets/images/new.jpg" />
      <Information />
    </section>
  );
};

export default About;

function Information() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start gap-[313px] justify-start pl-[13.6rem] mb-[359px]">
        <h4 className="uppercase text-[11.5px] font-semibold leading-[20.7px] text-white">
          approach
        </h4>
        <div className="max-w-[478px] w-full flex flex-col text-left">
          <div className="max-w-[300px] w-full mb-[59px]">
            <h3 className="text-[46px] leading-[41.86px] text-white font-semibold">
              Designing for Impact and{" "}
              <span className="font-InstrumentSerif italic">Clarity</span>
            </h3>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-wrap text-xl font-semibold text-white">
              I believe great design is more than aesthetics. It’s about
              strategy, clarity, and growth. Every project I take on starts with
              a deep understanding of your brand’s goals, audience, and
              positioning.
            </p>
          </div>
          <div className="max-w-full w-full">
            <p className="text-xl font-semibold text-white">
              My approach blends strategy and execution, ensuring every design
              decision serves a purpose. Whether crafting a visual identity, a
              high-converting website, or a seamless user experience, I focus on
              creating work that not only looks great but drives real results.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-start gap-[313px] justify-start pl-[31.6rem] mb-[304px]">
        <h4 className="uppercase text-[11.5px] font-semibold leading-[20.7px] text-white">
          Background
        </h4>
        <div className="max-w-[478px] w-full flex flex-col text-left">
          <div className="max-w-[320px] w-full mb-[59px]">
            <h3 className="text-[46px] leading-[41.86px] text-white font-semibold">
              From Frontend to Design{" "}
              <span className="font-InstrumentSerif italic">Freedom</span>
            </h3>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-wrap text-xl font-semibold text-white">
              I started in marketing but found my passion in design—solving
              problems creatively.
            </p>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-xl font-semibold text-white">
              After cutting my teeth at a branding agency in Vietnam I built my
              one-person design business, gaining the freedom to travel and work
              globally.
            </p>
          </div>
          <div className="max-w-full w-full">
            <p className="text-xl font-semibold text-white">
              Today, I help startups and tech companies create brands and
              websites that stand out and scale.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-start gap-[313px] justify-start pl-0 mb-[380px]">
        <h4 className="uppercase text-[11.5px] font-semibold leading-[20.7px] text-white">
          beyond design
        </h4>
        <div className="max-w-[478px] w-full flex flex-col text-left">
          <div className="max-w-[315px] w-full mb-[59px]">
            <h3 className="text-[46px] leading-[41.86px] text-white font-semibold">
              How Travel & Nature Shape My
              <span className="font-InstrumentSerif italic">Perspective</span>
            </h3>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-wrap text-xl font-semibold text-white">
              When I’m not designing, I’m playing chess, hiking with my dog, or
              exploring new places. I’ve lived in Can Tho, worked from aluminum
              and glass work, and love the intersection of nature, creativity,
              and technology.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-start gap-[313px] justify-start pl-[31.6rem] mb-[304px]">
        <h4 className="uppercase text-[11.5px] font-semibold leading-[20.7px] text-white">
          featured in
        </h4>
        <div className="max-w-[478px] w-full flex flex-col text-left">
          <div className="max-w-[300px] w-full mb-[59px]">
            <h3 className="text-[46px] leading-[41.86px] text-white font-semibold">
              Work features{" "}
              <span className="font-InstrumentSerif italic">by</span>
            </h3>
          </div>
          <div className="max-w-full w-full mb-10">
            <p className="text-wrap text-xl font-semibold text-white">
              My work has been featured by Awwwards, Dribbble, Figma, Threads &
              more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
