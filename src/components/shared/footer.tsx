import IconsStar from "@/components/icons/IconsStar";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative max-w-full w-full h-[100vh] overflow-hidden z-[20]">
      <div className="shadow-bg"></div>
      <div className="absolute inset-0 z-[0] bg-center bg-cover bg-footer-pattern"></div>
      <div className="mt-[86px] z-[10] absolute px-4 flex flex-col gap-[2.3rem]">
        <h1 className="uppercase text-right ml-[644px] font-BiggerDisplay font-bold text-[162px] leading-[164px] text-white">
          let&apos;s bring your ideas to life
        </h1>
        <button className="ml-[39rem] max-w-[428px] w-full h-[72px] rounded-full p-0 flex items-center justify-center border border-white/20 group transition-all duration-300 hover:bg-[rgb(254,61,0)]">
          <span className="text-[22px] font-normal text-[#dfdfdf] group-hover:text-white transition-all duration-300">
            Get in touch
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>

        <div className="mb-9 items-start flex flex-none flex-col flex-nowrap gap-5 h-min justify-start overflow-visible p-0 relative w-full">
          <div className="items-center flex flex-none flex-row flex-nowrap h-min justify-between overflow-visible p-0 relative w-full">
            <div className="items-start flex flex-grow flex-shrink-0 basis-0 flex-col flex-nowrap gap-12 h-min justify-start overflow-visible p-0 relative w-[1px]">
              <div className="items-start flex flex-none flex-col flex-nowrap gap-2 h-min justify-start overflow-visible p-0 relative w-full">
                <div className="border-camera-top" data-border="true"></div>
                <div className="flex-none h-auto opacity-[.4] relative whitespace-pre-wrap w-[316px] break-words">
                  <ul className="text-[13px] font-normal text-[#b7b6b6] w-full list-none flex items-center">
                    <li className="table-row before:table-cell before:w-[2.25ch] before:box-border before:pr-[0.75ch] before:content-['•']"></li>
                    <h6 className="text-[13px] font-medium text-[#b7b6b6]">
                      005
                    </h6>
                  </ul>
                </div>
              </div>
              <div className="items-start flex flex-none flex-col flex-nowrap gap-2 h-min justify-start overflow-visible p-0 relative w-full">
                <div className="items-start flex flex-none flex-col flex-nowrap gap-3 h-min justify-start overflow-visible p-0 relative w-full">
                  <div className="items-start flex flex-none flex-col flex-nowrap gap-[0px] h-16 justify-start overflow-visible p-0 relative w-min">
                    <IconsStar className="size-4" />
                    <div className="contents">
                      <div className="flex-none h-auto opacity-[.7] relative whitespace-pre-wrap w-[334px] break-words">
                        <h6 className="text-base font-normal text-[#dfdfdf]">
                          hello@nikistudio.com
                        </h6>
                      </div>
                    </div>
                    <div className="contents">
                      <div className="flex-none h-auto opacity-[.7] relative whitespace-pre-wrap w-[334px] break-words">
                        <h6 className="text-base font-normal text-[#dfdfdf]">
                          +84 378 583 296
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-border="true" className="border-camera-bottom"></div>
              </div>
            </div>
            <div className="items-center flex flex-none flex-row flex-nowrap gap-0 h-min justify-center overflow-visible p-0 relative w-[76%]">
              <div className="items-start flex flex-none flex-col flex-nowrap gap-12 h-min justify-start overflow-visible p-0 relative w-[40%]">
                <div className="items-start flex flex-none flex-col flex-nowrap gap-2 h-min justify-start overflow-visible p-0 relative w-full">
                  <div className="border-camera-top" data-border="true"></div>
                  <div className="contents">
                    <div className="flex-none h-auto opacity-[.4] relative whitespace-pre-wrap w-[428px] break-words">
                      <ul className="text-[13px] font-normal text-[#b7b6b6] flex items-center  w-full list-none">
                        <li className="table-row before:table-cell before:w-[2.25ch] before:box-border before:pr-[0.75ch] before:content-['•']"></li>
                        <h6 className="text-[13px] font-medium text-[#b7b6b6]">
                          Get in touch
                        </h6>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="items-start flex flex-none flex-col flex-nowrap gap-2 h-min justify-start overflow-visible p-0 relative w-full">
                  <div className="items-start flex flex-none flex-col flex-nowrap gap-3 h-min justify-start overflow-visible p-0 relative w-full">
                    <div className="items-start flex flex-none flex-col flex-nowrap gap-[0px] h-16 justify-start overflow-visible p-0 relative w-min">
                      <IconsStar className="size-4" />
                      <div className="contents">
                        <div className="flex-none h-auto opacity-[.7] relative whitespace-pre-wrap w-[334px] break-words">
                          <h6 className="text-base font-normal text-[#dfdfdf]">
                            24 De La Thanh Street, Dong Da District, Hanoi City,
                            Vietnam.
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="border-camera-bottom"
                    data-border="true"
                  ></div>
                </div>
              </div>
              <div className="items-start self-stretch flex flex-grow flex-shrink-0 basis-0 flex-col flex-nowrap gap-12 h-auto justify-start overflow-visible p-0 relative w-[1px]">
                <div className="items-start flex flex-none flex-col flex-nowrap gap-2 h-min justify-start overflow-visible p-0 relative w-full">
                  <div className="border-camera-top" data-border="true"></div>
                  <div className="flex-none h-auto opacity-[.7] relative whitespace-pre-wrap w-full break-words">
                    <ul className="text-[13px] font-normal text-[#b7b6b6]  w-full list-none flex items-center">
                      <li className="table-row before:table-cell before:w-[2.25ch] before:box-border before:pr-[0.75ch] before:content-['•']"></li>
                      <h6 className="text-[13px] font-normal text-[#b7b6b6]">
                        Contact
                      </h6>
                    </ul>
                  </div>
                </div>
                <div className="items-start flex flex-none flex-col flex-nowrap gap-2 h-min justify-start overflow-visible p-0 relative w-full">
                  <div className="items-start flex flex-none flex-col flex-nowrap gap-0 h-16 justify-start overflow-visible p-0 relative w-full">
                    <IconsStar className="size-5" />

                    <div className="items-start flex flex-none flex-col flex-nowrap gap-2 h-min justify-start overflow-visible p-0 relative w-min">
                      <div className="items-start self-stretch flex flex-none flex-row flex-nowrap gap-4 h-10 justify-center overflow-visible p-0 relative w-auto">
                        <Link
                          href="https://www.instagram.com/darrysduc_/"
                          className="items-center flex-none flex flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-0 relative w-min"
                        >
                          <div className="contents">
                            <h6 className="text-base font-normal text-[#dfdfdf] opacity-[.7]">
                              Instagram
                            </h6>
                          </div>
                        </Link>
                        <Link
                          href="https://www.instagram.com/darrysduc_/"
                          className="items-center flex-none flex flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-0 relative w-min"
                        >
                          <div className="contents">
                            <h6 className="text-base font-normal text-[#dfdfdf] opacity-[.7]">
                              Facebook
                            </h6>
                          </div>
                        </Link>
                        <Link
                          href="https://www.instagram.com/darrysduc_/"
                          className="items-center flex-none flex flex-row flex-nowrap gap-14 h-min justify-center overflow-hidden p-0 relative w-min"
                        >
                          <div className="contents">
                            <h6 className="text-base font-normal text-[#dfdfdf] opacity-[.7]">
                              Threads
                            </h6>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border-camera-bottom"
                    data-border="true"
                  ></div>
                </div>
              </div>
              <div className="border-camera-all" data-border="true">
                <div className="flex-none h-auto relative w-[233px]">
                  <div className="contents">
                    <div className="items-center cursor-pointer flex flex-row flex-nowrap gap-5 h-min justify-end overflow-hidden p-0 relative w-[233px]">
                      <div className="flex-none h-auto relative whitespace-pre w-auto">
                        <p className="uppercase text-sm font-normal">
                          back to top
                        </p>
                      </div>
                      <Link
                        href="#"
                        className="flex items-center justify-center w-16 h-16 border border-white/20 text-white rounded-full relative overflow-hidden group transition-all duration-300 bg-transparent hover:bg-[rgb(254,61,0)]"
                      >
                        <span className="absolute inset-0 flex items-center justify-center transform translate-y-0 opacity-100 group-hover:-translate-y-6 group-hover:opacity-0 transition-all duration-300">
                          <ArrowUp size={26} />
                        </span>

                        <span className="absolute inset-0 flex items-center justify-center transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <ArrowUp size={26} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-normal text-white opacity-[.7]">
            Design by Tran Thien Duc
          </span>
          <span className="text-sm font-normal text-white opacity-[.7]">
            © Tran Thien Duc 2025. All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
