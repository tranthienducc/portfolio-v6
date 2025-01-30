import IconsArrowDown from "@/components/icons/IconsArrowDown";
import IconsStar from "@/components/icons/IconsStar";
import { sliderContent } from "@/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Work = () => {
  const topProjects = sliderContent.slice(0, 2);
  const bottomProjects = sliderContent.slice(2, 5);

  return (
    <section className="w-full relative mb-[50rem] h-screen max-w-full px-12 pt-10">
      <IconsArrowDown />
      <h2 className="uppercase text-[150px] font-bold font-BiggerDisplay leading-[136px] max-w-[702px] text-[#d1d1c7] mt-16 mb-[96px]">
        selected works.
      </h2>
      <span className="text-[40px] font-bold text-white font-BiggerDisplay flex items-end justify-end mb-6">
        ▼ 16-25
      </span>

      <div className="items-center rounded-[16px] flex flex-none flex-col flex-nowrap gap-0 h-min justify-center overflow-hidden p-0 relative w-full pl-[14rem]">
        <div className="content-center items-center flex flex-none flex-row flex-wrap h-min justify-between overflow-hidden p-0 relative w-full">
          {topProjects.map((project) => (
            <div
              key={project.name}
              className={`${
                project.name === "Strive"
                  ? "work-border-one"
                  : project.name === "Lenas"
                  ? "work-border-two"
                  : ""
              }`}
              data-border="true"
            >
              <Link
                href={project.url}
                className="items-center flex flex-none flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-8 relative w-full"
              >
                <div className="items-center rounded-[16px] flex flex-grow basis-0 flex-shrink-0 flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-0 relative w-[1px]">
                  <div className="contents">
                    <div className="rounded-2xl aspect-ratio-custom flex-grow basis-0 flex-shrink-0 h-auto min-h-[331px] overflow-hidden relative w-[1px]">
                      <div className="absolute inset-0">
                        <Image
                          src={project.img1}
                          alt={`img-${project.name}`}
                          priority={true}
                          width={1300}
                          height={1300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="items-start flex flex-none flex-row flex-nowrap h-min justify-between overflow-visible py-4 px-8 relative w-full">
                <div className="items-center flex flex-grow flex-shrink-0 basis-0 flex-row flex-nowrap gap-3 h-min justify-start overflow-hidden p-0 relative w-[1px]">
                  <IconsStar className="size-5" />
                  <div className="contents">
                    <p className="text-lg font-normal text-white">
                      {project.name}
                    </p>
                  </div>
                </div>
                {project.category && (
                  <div className="contents">
                    <div className="items-center flex flex-row flex-nowrap gap-0 h-min justify-start overflow-visible p-0 relative w-min">
                      {project.quantity && (
                        <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3">
                          {project.quantity}
                        </span>
                      )}
                      {project.category.map((cat, catIndex) => (
                        <span
                          key={catIndex}
                          className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3 whitespace-nowrap"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="work-bottom" data-border="true">
          {bottomProjects.map((project, index) => (
            <div
              key={project.name}
              className={`${
                project.name === "Gondi UI"
                  ? "work-left-border"
                  : project.name === "Blog"
                  ? "work-center-left-border"
                  : project.name === "Vios"
                  ? "work-center-right-border"
                  : ""
              }`}
              data-border="true"
            >
              <Link
                href={project.url}
                className="items-center flex flex-none flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-8 relative w-full"
              >
                <div className="items-center rounded-lg flex flex-shrink-0 flex-grow basis-0 flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-0 relative w-[1px]">
                  <div
                    className={`aspect-ratio-custom rounded-lg flex-shrink-0 flex-grow basis-0 h-auto min-h-[${
                      index === 0 ? "187" : "145"
                    }px] overflow-hidden relative w-[1px]`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={project.img1}
                        alt={`img-${project.name}`}
                        priority={true}
                        width={1300}
                        height={1300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Link>
              <div className="items-start flex flex-none flex-col flex-nowrap gap-[34px] h-min justify-start overflow-visible py-4 px-8 relative w-full">
                <div className="contents">
                  <div className="items-center flex flex-row flex-nowrap gap-3 h-min justify-start overflow-hidden p-0 relative w-[235px]">
                    <IconsStar className="size-5" />
                    <p className="text-lg font-normal text-white">
                      {project.name}
                    </p>
                  </div>
                </div>
                <div className="items-center flex flex-row flex-nowrap gap-0 h-min justify-start overflow-visible p-0 relative w-min">
                  <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3 whitespace-nowrap">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/work"
            className="items-center flex flex-none flex-row flex-nowrap justify-center overflow-hidden p-2 relative w-[208px] h-16 rounded-3xl bg-inherit border border-white/20 hover:bg-[rgb(254,61,0)] transition-all text-white gap-4 py-4 mt-[21rem] mb-6 mx-3 duration-300"
          >
            <span className="text-lg font-normal">All Works</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Work;
