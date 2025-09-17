import Heading from "@/components/heading";
import IconsStartGradient from "@/components/icons/IconsStartGradient";
import { CornerDownRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="px-[1rem] mb-[20rem] relative w-full border-t border-t-white/10 pt-9">
      <Heading
        heading="Get in Touch"
        subheading={[
          "Let's chat",
          "Let's chat",
          "Let's chat",
          "Let's chat",
          "Let's chat",
          "Let's chat",
        ]}
      />
      <Link
        href="https://www.facebook.com/tranthienduc1001"
        rel="noreferrer"
        target="_blank"
        className="relative w-full flex items-center justify-center mt-[133px]"
      >
        <IconsStartGradient className="absolute top-[-3rem] left-[17rem]" />
        <button className="flex items-center gap-3 p-[2rem] justify-start rounded-full bg-inherit border border-white/15 hover:bg-white text-white hover:text-black duration-200">
          <CornerDownRight size={60} />
          <span className="text-[4em] font-normal">thienducdev@gmail.com</span>
        </button>
        <IconsStartGradient className="absolute right-[17rem] bottom-[-3rem]" />
      </Link>
    </section>
  );
};

export default CTA;
