// "use client";
// import { useParams } from "next/navigation";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CaseStudyPage = () => {
  // const params = useParams<{ slug: string }>();
  return (
    <article className="relative px-12 pt-[5.75rem] pb-7 h-screen">
      <div className="items-start flex flex-2 flex-row flex-nowrap gap-10 h-min justify-center max-w-[1240px] overflow-visible py-10 px-5 relative w-full z-[1]">
        <div className="items-start flex flex-none flex-col flex-nowrap gap-8 h-min justify-center overflow-visible pt-0 pb-5 px-0 relative w-min">
          <div className="items-center self-stretch flex flex-none flex-col flex-nowrap gap-6 h-min justify-center overflow-hidden p-0 relative w-auto">
            <div className="items-center flex flex-none flex-col flex-nowrap gap-6 h-min justify-center overflow-hidden p-0 relative w-full">
              <div className="items-start flex flex-none flex-col flex-nowrap gap-[10px] h-min justify-center overflow-hidden p-0 relative w-full">
                <div className="">
                  <p className="uppercase text-[10px] text-[#1c2024] opacity-[.5] font-normal">
                    client
                  </p>
                </div>
                <div>
                  <p className="uppercase text-[14px] font-semibold text-black">
                    Strive
                  </p>
                </div>
              </div>
              <div className="items-start flex flex-none flex-col flex-nowrap gap-[10px] h-min justify-center overflow-hidden p-0 relative w-full">
                <div className="">
                  <p className="uppercase text-[10px] text-[#1c2024] opacity-[.5] font-normal">
                    year
                  </p>
                </div>
                <div>
                  <p className="uppercase text-[14px] font-semibold text-black">
                    2024 - ONGOING
                  </p>
                </div>
              </div>
            </div>
            <div className="items-start flex flex-none flex-col flex-nowrap gap-[10px] h-min justify-center overflow-hidden p-0 relative w-80">
              <p className="uppercase text-[10px] text-[#1c2024] opacity-[.5] font-normal">
                SCOPE OF WORK
              </p>
              <div className="w-full flex flex-row gap-[10px] flex-wrap">
                <div className="rounded-md bg-[#e6f0eb] py-1 px-[6px] whitespace-nowrap">
                  <p className="text-[11px] text-[#134d30] font-normal">
                    Website Design
                  </p>
                </div>
                <div className="rounded-md bg-[#ebf4ff] py-1 px-[6px] whitespace-nowrap">
                  <p className="text-[11px] text-[#06418a] font-normal">
                    Product Design
                  </p>
                </div>
                <div className="rounded-md bg-[#e5deff] py-1 px-[6px] whitespace-nowrap">
                  <p className="text-[11px] text-[#190563] font-normal">
                    No-code
                  </p>
                </div>
                <div className="rounded-md bg-[#ffedfb] py-1 px-[6px] whitespace-nowrap">
                  <p className="text-[11px] text-[#630537] font-normal">
                    Motion Design
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="items-center self-stretch flex flex-none flex-col flex-nowrap gap-6 h-min justify-center overflow-hidden p-0 relative w-auto">
            <div className="items-start flex flex-none flex-col flex-nowrap gap-[10px] h-min justify-center overflow-visible p-0 relative w-[320px]">
              <p className="uppercase text-[10px] text-[#1c2024] font-normal">
                stack
              </p>
              <div className="items-center flex flex-none flex-row flex-nowrap gap-[10px] h-min justify-center overflow-visible p-0 relative w-min">
                <div className="flex items-center justify-center size-10 rounded-md border border-black/10">
                  <Image
                    src="/assets/icons/icons-figma.svg"
                    alt="icons-stack"
                    width={32}
                    height={32}
                    className="size-9"
                  />
                </div>
                <div className="flex items-center justify-center size-10 rounded-md border border-black/10">
                  <Image
                    src="/assets/icons/icons-webflow.svg"
                    alt="icons-stack"
                    width={32}
                    height={32}
                    className="size-9"
                  />
                </div>
                <div className="flex items-center justify-center size-10 rounded-md border border-black/10">
                  <Image
                    src="/assets/icons/icons-figma.svg"
                    alt="icons-stack"
                    width={32}
                    height={32}
                    className="size-9"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="items-start self-stretch flex flex-2 flex-col flex-nowrap gap-10 h-auto justify-start overflow-hidden pt-0 pb-5 pr-0 pl-10 relative w-[1px]">
          <div className="items-start flex flex-none flex-col flex-nowrap gap-5 h-min justify-center overflow-hidden p-0 relative w-full">
            <div className="contents">
              <div className="cursor-pointer flex-none h-auto max-w-[720px] relative whitespace-pre-wrap w-full break-words">
                <h1 className="text-[32px] font-extrabold tracking-[0px] leading-[1.3em] uppercase text-black">
                  Taking redesigned Lightdash to an $11 million series A
                  funding.
                </h1>
              </div>
            </div>
            <div className="contents">
              <div className="flex-none h-auto max-w-[640px] relative whitespace-pre-wrap w-full break-words">
                <p className="text-base font-normal text-[#5c5c5c]">
                  Lightdash, an analytics platform with $19.4M in funding and a
                  strong presence in their industry, sought to enhance their
                  brand’s digital experience to match their rapid growth and
                  evolving product.
                </p>
                <br />
                <p className="text-base font-normal text-[#5c5c5c]">
                  Lightdash, an analytics platform with $19.4M in funding and a
                  strong presence in their industry, sought to enhance their
                  brand’s digital experience to match their rapid growth and
                  evolving product.
                </p>
              </div>
            </div>
          </div>
          <div className="contents">
            <div className="flex-none h-8 relative w-full">
              <Link
                href="www.strive-platform.xyz"
                className="flex flex-row items-center gap-3"
              >
                <span className="text-sm font-semibold text-black">
                  View live website
                </span>
                <ArrowRight size={16} className="text-black" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CaseStudyPage;
