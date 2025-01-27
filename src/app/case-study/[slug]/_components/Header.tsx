import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CaseStudyHeader = () => {
  return (
    <header className="fixed top-0 z-[10] flex items-center justify-center mx-auto mt-7 w-full">
      <div className="border border-black/10 rounded-full max-w-[960px] w-full flex flex-row items-center justify-between p-[10px]">
        <Link
          href="#"
          className="text-sm font-bold text-black flex flex-row gap-3 items-center"
        >
          <ArrowLeft size={24} className="text-black" />
          Go back
        </Link>
        <Link
          href="/contact"
          className="rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center text-center w-[122px] h-[32px] cursor-pointer"
        >
          Work with us →
        </Link>
      </div>
    </header>
  );
};

export default CaseStudyHeader;
