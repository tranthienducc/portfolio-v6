import Marquee from "@/components/animation/marquee/Marquee";
import IconsStar from "@/components/icons/IconsStar";

import {
  Construction,
  Dumbbell,
  Earth,
  HandMetal,
  Heart,
  Laptop,
  Smile,
  SquareDashedBottomCode,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="mb-[20rem] w-full max-w-full">
      <p className="text-[33.2px] leading-[41.4px] font-normal mx-auto text-center max-w-[877px] w-full mb-[168px] text-[#999]">
        We deliver top-tier research, strategy, creative assets and execution
        for industry-leading brands. Our approach blends innovation, AI and
        strategic insights to ensure every deliverable aligns with your Ideal
        Customer Profile, tells a compelling story and exceeds your business
        objectives.
      </p>

      <div className="w-full mb-[168px]">
        <Marquee />
      </div>

      <div className="max-w-full w-full padding-custom">
        <p className="will-change-transform mb-20 paragraph text-white/70">
          <span className="flex flex-row items-center gap-3">
            <span>I’m Thien Duc, I work as a</span>
            <Sun size={35} />
            <span className="underline text-white">front</span>
            <span>
              <Earth className="w-[50px] h-[34px]" />
            </span>
            <span>end developer</span>
          </span>
          <span className="flex  flex-row items-center gap-3">
            <span>specialized in the conception of </span>
            <span className="italic text-white">custom</span>
            <span>and unique</span>
          </span>
          <span className="flex items-center ">
            <span className="underline">website.</span> <span> I love</span>
            <span>
              <Heart className="w-[50px] h-[34px]" />
            </span>
            <span>designing interfaces with a beautiful</span>
          </span>
          <span className="flex items-center">
            <span>and</span>
            <span>
              <Dumbbell className="w-[50px] h-[34px]" />
            </span>
            <span> strong user experience.</span>
          </span>
        </p>
        <p className="will-change-transform mb-20 paragraph text-white/70">
          <span className="flex items-center whitespace-nowrap gap-2">
            <span>Very, very</span>

            <span>often I work with my comrade</span>
            <span>
              <Smile className="w-[50px] h-[34px]" />
            </span>
            <span>of the web, </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="italic relative">
              {/* Nữa sẽ tạo 1 trang để giới thiệu bản thân */}
              <Link
                href="https://www.facebook.com/"
                className="underline text-white"
                target="_blank"
              >
                Duc
              </Link>
            </span>
            <span>, a very cool</span>
            <span>
              <SquareDashedBottomCode className="w-[50px] h-[34px]" />
            </span>
            <span>web developer. Together we</span>
          </span>
          <span className="flex items-center gap-2">
            <span>founded </span>
            <span className="font-bold italic">{"  "} Luma</span>
            <span>, a web builder studio</span>
            <span>
              <Construction size={35} />
            </span>
            <span>that creates</span>
          </span>
          <span className="flex items-center ">
            <span>your</span>
            <span>
              <Laptop size={35} />
            </span>
            <span>website from a to www. Come and say hello!</span>
            <span>
              <HandMetal size={35} />
            </span>
          </span>
        </p>
      </div>

      <div className="flex items-center justify-center flex-row gap-8">
        <IconsStar />
        <Image
          src="/assets/images/my-self.jpg"
          width={1300}
          height={1300}
          priority={true}
          className="w-[300px] h-[400px] object-cover rounded-2xl"
          alt="avatar"
        />
        <IconsStar />
      </div>
    </div>
  );
};

export default About;
