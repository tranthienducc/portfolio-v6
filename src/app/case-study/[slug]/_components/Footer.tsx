import React from "react";

const CaseStudyFooter = () => {
  return (
    <footer className="fixed bottom-[35px] w-full flex items-center justify-between px-16">
      <div
        className="items-center flex flex-grow flex-shrink-0 basis-0 flex-row flex-wrap gap-[10px] h-min justify-start
    overflow-hidden p-[0px] relative w-[1px]"
      >
        <span className="uppercase text-[10px] font-mono font-normal text-[#999]">
          client
        </span>
        <div className="flex-none h-[1px] overflow-hidden relative w-[40px] bg-black/10"></div>
        <span className="text-sm font-semibold text-black">Strive</span>
      </div>
      <div
        className="items-center flex flex-grow flex-shrink-0 basis-0 flex-row flex-wrap gap-[10px] h-min justify-end
    overflow-hidden p-[0px] relative w-[1px]"
      >
        <span className="uppercase text-[10px] font-mono font-normal text-[#999]">
          year
        </span>
        <div className="flex-none h-[1px] overflow-hidden relative w-[40px] bg-black/10"></div>
        <span className="text-sm font-semibold text-black">2025</span>
      </div>
    </footer>
  );
};

export default CaseStudyFooter;
