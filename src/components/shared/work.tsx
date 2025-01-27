import IconsArrowDown from "@/components/icons/IconsArrowDown";
import IconsStar from "@/components/icons/IconsStar";
import Image from "next/image";
import Link from "next/link";

const Work = () => {
  return (
    <section className="w-full relative mb-[50rem] h-screen max-w-full px-12 pt-10">
      <IconsArrowDown />
      <h2 className="uppercase text-[150px] font-bold font-BiggerDisplay leading-[136px] max-w-[702px] text-[#d1d1c7] mt-16 mb-[96px]">
        selected works.
      </h2>
      <span className="text-[40px] font-bold text-white font-BiggerDisplay flex items-end justify-end mb-6">
        ▼ 16-25
      </span>

      <div className="items-center rounded-[16px] flex flex-none flex-col flex-nowrap gap-0 h-min justify-center overflow-hidden p-0 relative w-full pl-[23rem]">
        <div className="content-center items-center flex flex-none flex-row flex-wrap h-min justify-between overflow-hidden p-0 relative w-full">
          <div className="work-border-one" data-border="true">
            <Link
              href="/case-study"
              className="items-center flex flex-none flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-8 relative w-full"
            >
              <div className="items-center rounded-[16px] flex flex-grow basis-0 flex-shrink-0 flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-0 relative w-[1px]">
                <div className="contents">
                  <div className="rounded-2xl aspect-ratio-custom flex-grow basis-0 flex-shrink-0 h-auto min-h-[331px] overflow-hidden relative w-[1px]">
                    <div className=" absolute inset-0">
                      <Image
                        src="/assets/images/imgproject1.avif"
                        alt="img-project-1"
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
                  <p className="text-lg font-normal text-white">Kosmos</p>
                </div>
              </div>
              <div className="contents">
                <div className="items-center flex flex-row flex-nowrap gap-0 h-min justify-start overflow-visible p-0 relative w-min">
                  <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3">
                    1
                  </span>
                  <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3">
                    Branding
                  </span>
                  <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3 whitespace-nowrap">
                    Art Direction
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="work-border-two" data-border="true">
            <Link
              href="/case-study"
              className="items-center flex flex-none flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-8 relative w-full"
            >
              <div className="items-center rounded-[16px] flex flex-grow basis-0 flex-shrink-0 flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-0 relative w-[1px]">
                <div className="contents">
                  <div className="rounded-2xl aspect-ratio-custom flex-grow basis-0 flex-shrink-0 h-auto min-h-[331px] overflow-hidden relative w-[1px]">
                    <div className="absolute inset-0">
                      <Image
                        src="/assets/images/imgproject2.avif"
                        alt="img-project-1"
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
                  <p className="text-lg font-normal text-white">Jordan.</p>
                </div>
              </div>
              <div className="contents">
                <div className="items-center flex flex-row flex-nowrap gap-0 h-min justify-start overflow-visible p-0 relative w-min">
                  <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3">
                    1
                  </span>
                  <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3">
                    Branding
                  </span>
                  <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full py-2 px-3 whitespace-nowrap">
                    Art Direction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="work-bottom" data-border="true">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Work;
