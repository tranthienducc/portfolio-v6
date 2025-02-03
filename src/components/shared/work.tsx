"use client";
import { useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    title: "Gondi UI",
    description:
      "Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.",
    speed: 0.67,
    img: "/assets/images/imgproject3.avif",
    url: "gondi-ui",
  },
  {
    title: "Strive",
    description:
      "Working on the Next-Generation HMI Experience without no driving experience.",
    speed: 0.5,
    img: "/assets/images/imgproject1.avif",
    url: "strive",
  },
  {
    title: "Lenas",
    description:
      "Developed the Future of UFC Sports Ecosystem despite not being a sports fan.",
    speed: 0.5,
    img: "/assets/images/imgproject2.avif",
    url: "lenas",
  },

  {
    title: "Blog",
    description:
      "I was just one person on a massive team that created an entire Royal Caribbean eco-system.",
    speed: 0.8,
    img: "/assets/images/imgproject4.avif",
    url: "blog",
  },
  {
    title: "Vios",
    description:
      "Designed a 1M+ users product utilizing my best personal experience: sleeping.",
    speed: 0.8,
    img: "/assets/images/imgproject5.avif",
    url: "vios",
  },
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section
      className="w-full relative h-full max-w-full px-[1rem] lg:px-0 mb-[35.5rem]"
      id="work"
    >
      <div className="mb-[16rem] flex flex-col gap-5 px-[1rem] lg:px-12 max-w-[400px] lg:max-w-[1000px] w-full">
        <h2 className="text-xs lg:text-sm tracking-[1.05em] font-semibold text-[#b7ab98] uppercase">
          work
        </h2>
        <p className="text-[40px] lg:text-[70px] font-bold leading-[95%] text-[#b7ab98]">
          I worked with some of the most <span>innovative</span> industry
          leaders to help build their top-notch products
        </p>
      </div>
      <div className="absolute  bottom-0 left-0 w-full h-full flex items-center justify-center rounded-2xl">
        <div
          className="absolute h-[300px] lg:h-[423px] transition-opacity duration-500 top-[26rem] lg:top-[43rem] lg:left-[27.75rem]"
          style={{ opacity: selectedProject === null ? 1 : 0, zIndex: 0 }}
        >
          <Image
            width={1300}
            height={1300}
            priority={true}
            src="/assets/images/flower-chrome.webp"
            alt="Default Earth"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        {data.map((item, i) => (
          <div
            key={i}
            className="w-[200px] lg:w-[400px] h-[100px] lg:h-[300px] transition-opacity duration-500"
            style={{ opacity: selectedProject === i ? 1 : 0, zIndex: 1 }}
          >
            <Image
              width={1300}
              height={1300}
              priority={true}
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
      <div className="absolute w-full z-[1]">
        <Titles data={data} setSelectedProject={setSelectedProject} />
        <Descriptions data={data} selectedProject={selectedProject} />
      </div>
    </section>
  );
};

export default Work;

interface DataItem {
  title: string;
  description: string;
  speed: number;
  url: string;
  i?: number;
}

interface TitleProps {
  data: DataItem;
  setSelectedProject: Dispatch<SetStateAction<number | null>>;
}

function Titles({
  data,
  setSelectedProject,
}: {
  data: DataItem[];
  setSelectedProject: Dispatch<SetStateAction<number | null>>;
}) {
  return (
    <div className="w-full border-t border-t-white/10">
      {data.map((item, i) => {
        return (
          <Title
            key={i}
            data={{ ...item, i }}
            setSelectedProject={setSelectedProject}
          />
        );
      })}
    </div>
  );
}

function Title({ data, setSelectedProject }: TitleProps) {
  const { title, speed, i } = data;
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", `${25 / speed}vw end`],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;
  return (
    <div
      ref={container}
      className="border-b border-b-white/10 cursor-pointer relative z-[2]"
    >
      <Link
        href={`/case-study/${data.url}`}
        className="inline-block pl-0 lg:pl-[4%]"
        onMouseOver={() => {
          if (i !== undefined) setSelectedProject(i);
        }}
        onMouseLeave={() => {
          setSelectedProject(null);
        }}
      >
        <motion.p
          style={{ clipPath: clip }}
          className="inline-block text-[#b7ab98] uppercase font-BiggerDisplay font-bold text-[23vw] lg:text-[9vw] leading-[23.5vw] lg:leading-[8.5vw] m-0 relative z-[2]"
        >
          {title}
        </motion.p>
        <p className="block absolute text-[#1c1c1c] top-0 z-[1] uppercase font-BiggerDisplay font-bold text-[23vw] lg:text-[8vw] leading-[23.5vw] lg:leading-[8.5vw]">
          {title}
        </p>
      </Link>
    </div>
  );
}

interface DescriptionProps {
  data: DataItem[];
  selectedProject: number | null;
}

function Descriptions({ data, selectedProject }: DescriptionProps) {
  const crop = (string: string, maxLength: number) => {
    return string.substring(0, maxLength);
  };

  return (
    <div className="absolute top-[3px] h-full w-full z-[2] pointer-events-none">
      {data.map((descriptions, i) => {
        const { title, description } = descriptions;

        return (
          <div
            key={i}
            className="bg-[#ec4e39] flex justify-between items-center px-0 lg:px-[10%] transition-clipath"
            style={{
              clipPath:
                selectedProject === i ? "inset(0 0 0)" : "inset(50% 0 50%)",
            }}
          >
            <p className="text-[#010101] uppercase font-BiggerDisplay font-bold leading-[23.5vw] lg:text-[8vw] text-[23vw] lg:leading-[8.5vw] m-0 relative z-[1]">
              {crop(title, 9)}
            </p>
            <p className="w-[40%] text-[1vw] font-bold text-[#000] opacity-[.7]">
              {description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
