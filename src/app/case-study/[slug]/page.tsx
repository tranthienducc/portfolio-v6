"use client";
import { sliderContent } from "@/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const CaseStudyPage = () => {
  const params = useParams();
  const slug = params?.slug;

  const currentProject = sliderContent.find(
    (item) => item.name.toLowerCase() === slug
  );

  if (!currentProject) {
    return <div>Project not found</div>;
  }

  return (
    <article className="relative px-[1rem] lg:px-4 pt-[5.75rem] pb-7 z-10 h-min w-full">
      <div className="content-start justify-end flex flex-shrink-0 flex-grow basis-0 flex-flow gap-3 lg:overflow-hidden px-0 pb-1 place-content-flex w-full z-[4] mb-5 lg:sticky top-0 h-full lg:h-[65rem]">
        <div className="content-center justify-between items-center flex flex-grow flex-shrink-0 basis-auto flex-flow-row h-min overflow-hidden relative w-full py-0 px-0 lg:px-4">
          <div className="flex flex-row items-center w-full justify-between">
            <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3">
              {currentProject.quantity || 1}
            </span>
            <div className="flex flex-row items-center gap-0">
              {currentProject.category?.map((cat, index) => (
                <span
                  key={index}
                  className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="content-center justify-between flex flex-grow flex-shrink-0 basis-auto flex-col lg:flex-flow-row h-min overflow-hidden relative w-full py-0 px-0 lg:px-4">
          <div className="content-center justify-start items-center flex flex-grow flex-shrink-0 basis-auto flex-flow-row gap-2 h-min overflow-hidden py-0 pb-10 lg:pb-2 pt-0 relative w-full lg:w-[50%] max-w-[740px]">
            <div className="aspect-ratio-1 lg:aspect-ratio-2 rounded-2xl flex-grow-0 flex-shrink-0 basis-auto h-auto min-h-[297px] overflow-hidden relative w-[66%]">
              <div className="absolute inset-0">
                <Image
                  src={currentProject.img1}
                  alt="Project preview"
                  priority={true}
                  width={1300}
                  height={1300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="self-stretch rounded-2xl flex-grow flex-shrink-0 basis-0 h-auto overflow-hidden relative">
              <div className="absolute inset-0">
                <Image
                  src={currentProject.img2}
                  alt="Project preview"
                  priority={true}
                  width={1300}
                  height={1300}
                  className="w-[223px] h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="content-center lg:justify-between items-center self-stretch flex flex-grow flex-shrink-0 lg:basis-0 flex-flow overflow-hidden py-0 pr-0 pl-4 relative border-t border-t-white/15 max-w-[740px] w-full leading-[2.2] lg:leading-[0.8] h-[303px]">
            {/* Project details */}
            <div className="content-end justify-end items-end flex flex-grow-0 flex-shrink-0 basis-auto flex-flow gap-6 h-min overflow-visible px-0 pb-1 relative w-full z-[2] pt-3">
              <div className="content-center justify-between items-center flex flex-grow-0 flex-shrink-0 basis-auto flex-flow-row gap-0 h-min overflow-hidden p-0 relative w-full">
                <ul className="flex flex-row items-center gap-3">
                  <li className="table-row before:table-cell before:w-[2.25ch] before:box-border before:pr-[0.75ch] before:content-['•']"></li>
                  <span className="text-[13px] font-normal text-[#dfdfdf] opacity-[.7]">
                    {currentProject.tag}
                  </span>
                  <li className="table-row before:table-cell before:w-[2.25ch] before:box-border before:pr-[0.75ch] before:content-['•']"></li>
                  <span className="text-[13px] font-normal text-[#dfdfdf] opacity-[.7]">
                    (Work Detail)
                  </span>
                </ul>
              </div>
            </div>
            <div className="items-center flex flex-grow-0 h-min overflow-visible p-0 relative w-full flex-row justify-between">
              <h1 className="font-BiggerDisplay uppercase font-bold text-[84px] lg:text-[131px]">
                {currentProject.name}
              </h1>
              <span className="lg:hidden block font-BiggerDisplay uppercase font-bold text-[84px] lg:text-[131px]">
                {currentProject.tag}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project content */}
      <div className="flex flex-col-reverse h-full lg:flex-row items-start gap-[46px] w-full relative z-0 lg:z-[6] lg:bg-[#070707]">
        {/* Project images */}
        <div className="max-w-[1026px] w-full">
          <Image
            src="/assets/images/big-img-1.avif"
            alt="big-project-img"
            priority={true}
            width={1300}
            height={1300}
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <Image
            src="/assets/images/big-img-2.avif"
            alt="big-project-img"
            priority={true}
            width={1300}
            height={1300}
            className="w-full h-full object-cover"
          />
          <Image
            src="/assets/images/big-img-3.avif"
            alt="big-project-img"
            priority={true}
            width={1300}
            height={1300}
            className="w-full h-full object-cover"
          />
          <Image
            src="/assets/images/big-img-4.avif"
            alt="big-project-img"
            priority={true}
            width={1300}
            height={1300}
            className="w-full h-full object-cover rounded-b-2xl"
          />
        </div>

        {/* Project description */}
        <div className="flex flex-col lg:flex-row lg:sticky lg:top-[79px] max-w-[324px] lg:max-w-[423.35px] w-full h-full ">
          <div className="content-center gap-11 items-start self-stretch flex flex-grow flex-shrink-0 basis-0 flex-flow h-auto lg:overflow-hidden py-0 pr-0 pl-4 relative border-t border-t-white/15">
            <div className="content-end justify-end items-end flex flex-grow-0 flex-shrink-0 basis-auto flex-flow gap-6 h-min overflow-visible px-0 pb-1 relative w-full z-[2] pt-3">
              <div className="content-center justify-between items-center flex flex-grow-0 flex-shrink-0 basis-auto flex-flow-row gap-0 h-min lg:overflow-hidden p-0 relative w-full">
                <ul className="flex flex-row items-center gap-3">
                  <li className="table-row before:table-cell before:w-[2.25ch] before:box-border before:pr-[0.75ch] before:content-['•']"></li>
                  <span className="text-[13px] font-normal text-[#dfdfdf] opacity-[.7]">
                    {currentProject.tag}
                  </span>
                  <li className="table-row before:table-cell before:w-[2.25ch] before:box-border before:pr-[0.75ch] before:content-['•']"></li>
                  <span className="text-[13px] font-normal text-[#dfdfdf] opacity-[.7]">
                    (Detail)
                  </span>
                </ul>
              </div>
            </div>
            <p className="font-normal text-[#dfdfdf] opacity-[.7] text-lg leading-[23px] text-balance">
              {currentProject.des}
            </p>

            <Link
              href={currentProject.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-3 pt-7"
            >
              <ArrowRight size={24} />
              <span className="text-lg text-[#dfdfdf] font-normal underline">
                live website
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CaseStudyPage;
