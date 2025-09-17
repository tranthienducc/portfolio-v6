// "use client";
// import { sliderContent } from "@/constants";

import Image from "next/image";
import Link from "next/link";

// import { useParams } from "next/navigation";

const CaseStudyPage = () => {
  // const params = useParams();
  // const slug = params?.slug;

  // const currentProject = sliderContent.find(
  //   (item) => item.name.toLowerCase() === slug
  // );

  // if (!currentProject) {
  //   return <div>Project not found</div>;
  // }

  return (
    <article className="relative px-[1rem] lg:px-10 pt-[10rem] pb-7 z-10 h-min w-full">
      <div className="flex items-center gap-3 mb-[69px]">
        <Link
          href="/home"
          className="uppercase text-sm font-semibold text-white opacity-40"
        >
          [ home ]
        </Link>
        <span className="text-white opacity-40">/</span>
        <Link
          href="/all-projects"
          className="uppercase text-sm font-semibold text-white opacity-40"
        >
          [ work ]
        </Link>
        <span className="text-white opacity-40">/</span>
        <Link
          href="/home"
          className="uppercase text-sm font-semibold text-white"
        >
          [ madgicx ]
        </Link>
      </div>
      <div className="flex flex-row items-center gap-[217px] mb-[128px]">
        <h1 className="uppercase text-[80px] font-bold leading-[88px] tracking-[-2.56px] whitespace-nowrap">
          madgicx website
        </h1>
        <p className="text-base font-medium text-white opacity-40">
          Madgicx is a marketing platform for advertisers, offering AI-powered
          ad automation and analytics. After their rebrand, they needed a full
          redesign and rebuild of their Webflow website.
        </p>
      </div>

      <div className="flex flex-row items-start gap-[80px] mb-[257px]">
        <div className="flex flex-col items-start gap-[80px] max-w-[455.46px] w-full">
          <div className="flex flex-col gap-2 items-start">
            <h4 className="text-sm font-semibold uppercase">Deliverables</h4>
            <span className="text-sm font-medium text-white opacity-40">
              Design
            </span>
            <span className="text-sm font-medium text-white opacity-40">
              NextJS
            </span>
          </div>
          <div className="flex flex-col gap-[10px] items-start">
            <h4 className="text-sm font-semibold uppercase">services</h4>
            <span className="text-sm font-medium text-white opacity-40">
              Design & Development On-Demand
            </span>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <h4 className="text-sm font-semibold uppercase">client</h4>
            <span className="text-sm font-medium text-white opacity-40">
              Madgicx
            </span>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <h4 className="text-sm font-semibold uppercase">date</h4>
            <span className="text-sm font-medium text-white opacity-40">
              2025-01-31
            </span>
          </div>
        </div>

        <Image
          src="/assets/images/img7.jpg"
          alt="img-project"
          loading="lazy"
          width={910.94}
          height={683.2}
          className="max-w-[910.94px] w-full h-full max-h-[683.2px] object-cover rounded-xl"
        />
      </div>

      <div className="px-[344px] flex flex-row items-start gap-[40px] mb-10">
        <div className="sticky top-5 max-w-[182px] w-full flex flex-col items-start gap-[203px]">
          <h3 className="text-sm font-semibold text-white opacity-40 uppercase">
            [ problem ]
          </h3>
          <h3 className="text-sm font-semibold text-white opacity-40 uppercase">
            [ solution ]
          </h3>
        </div>

        <div className="max-w-[546px] w-full flex flex-col items-start gap-[128px]">
          <p className="text-balance text-sm font-medium text-[#fffc]">
            Madgicx needed someone who could take full ownership of the process,
            move fast, and deliver high-end results with minimal input. The goal
            was to bring structure, speed, and long-term scalability to their
            marketing site using the new brand identity without overwhelming
            internal development team.
          </p>
          <div className="text-balance text-sm font-medium text-[#fffc] flex flex-col items-start gap-4">
            <p>
              {" "}
              The project was executed under the{" "}
              <span className="underline text-white">
                Unlimited Subscription Plan
              </span>
              , which gave Madgicx full access to strategy, design, and
              development. All delivered fast and without the overhead of
              managing multiple people.
            </p>
            <h3 className="font-bold">Phase One: Figma Redesign</h3>
            <p>
              The project began by implementing the new brand identity in Figma.
              Every major section of the site was restructured and redesigned,
              including:
            </p>
            <ul className="list-disc pl-5 font-normal text-white">
              <li>Homepage</li>
              <li>Solutions, Workflow, Analytics, and AI Creatives</li>
              <li>Blog and Blog CMS</li>
              <li>Case Studies and Careers (CMS)</li>
              <li>Ad Cost Calculator, Partner Program, Compare Pages</li>
              <li>Legal Pages and System Pages (404, Terms, etc.)</li>
            </ul>
            <p>
              A scalable system was built using global variables, structured
              styles, and reusable components designed for both speed and
              long-term maintainability.
            </p>

            <h3 className="font-bold">Phase Two: Webflow Development</h3>
            <p>
              The redesigned structure was rebuilt in Webflow using the{" "}
              <span className="font-bold">Client-First framework</span>.
            </p>
            <h4>Key steps included:</h4>
            <ul className="list-disc pl-5 font-normal text-white">
              <li>Global design system updates (typography, color, radius)</li>
              <li>Full rebuild of key pages with pixel-perfect execution</li>
              <li>CMS integration for blog, careers, and case studies</li>
              <li>Speed optimization, background animation, and UI tweaks</li>
              <li>QA and feedback loop with async updates via Loom</li>
              <li>14-day post-launch period for final fixes and polish</li>
            </ul>
            <p>
              Madgicx now runs a high-performance, scalable Webflow site that’s
              fully aligned with their brand and easy to manage. With design and
              development handled under one roof, their internal workload
              dropped dramatically, turning a weekly time sink into a smooth,
              monthly check-in.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-10 w-full items-center justify-center">
        <p className="uppercase text-sm font-semibold">
          remote/prague{"   "}
          <span className="text-white opacity-40">[ 50°5′N 14°25′E ]</span>
        </p>
        <p className="uppercase text-sm font-semibold">
          cet <span className="text-white opacity-40">[ GMT + 7 ]</span>
        </p>
      </div>
    </article>
  );
};

export default CaseStudyPage;
