"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const projects = [
  {
    id: 1,
    name: "Strive",
    images: [
      "/assets/images/imgproject2.avif",
      "/assets/images/imgproject4.avif",
    ],
    url: "/case-study/strive",
    quantity: "/01",
    categories: ["1", "Mobile App", "UX Research"],
  },
  {
    id: 2,
    name: "Lenas",
    images: [
      "/assets/images/imgproject1.avif",
      "/assets/images/imgproject3.avif",
    ],
    url: "/case-study/strive",
    quantity: "/02",
    categories: ["2", "Mobile App", "UX Research"],
  },
  {
    id: 3,
    name: "Gondi UI",
    images: [
      "/assets/images/imgproject2.avif",
      "/assets/images/imgproject3.avif",
    ],
    url: "/case-study/gondi-ui",
    quantity: "/03",
    categories: ["3", "Mobile App", "UX Research"],
  },
  {
    id: 4,
    name: "Blog",
    images: [
      "/assets/images/imgproject1.avif",
      "/assets/images/imgproject2.avif",
    ],
    url: "/case-study/blog",
    quantity: "/04",
    categories: ["4", "Mobile App", "UX Research"],
  },
  {
    id: 5,
    name: "Vios",
    images: [
      "/assets/images/imgproject1.avif",
      "/assets/images/imgproject4.avif",
    ],
    url: "/case-study/vios",
    quantity: "/05",
    categories: ["5", "Mobile App", "UX Research"],
  },
];

const CategoryBadge = ({ text }: { text: string }) => (
  <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7] border border-white/20 rounded-full px-2 py-1 lg:py-2 lg:px-3 whitespace-nowrap">
    {text}
  </span>
);

const ProjectImages = ({ images }: { images: string[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkVisibility = () => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`items-center rounded-2xl flex flex-grow-0 basis-auto flex-shrink-0 gap-2 h-min overflow-hidden p-0 relative w-full ${
        isVisible ? "scroll-animation-trigger" : "scroll-animation"
      }`}
    >
      <div className="aspect-ratio-1 rounded-2xl flex-grow-0 flex-shrink-0 basis-auto h-auto min-h-[166px] lg:min-h-[436px] overflow-hidden relative w-[66%]">
        <div className="absolute inset-0">
          <Image
            src={images[0]}
            alt="Project preview"
            priority={true}
            width={1300}
            height={1300}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="self-stretch rounded-2xl flex-grow flex-shrink-0 basis-0 h-auto relative overflow-hidden w-[1px]">
        <div className="absolute inset-0">
          <Image
            src={images[1]}
            alt="Project preview"
            priority={true}
            width={1300}
            height={1300}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <div className="flex flex-row items-center gap-[70px] md:gap-[100px] lg:gap-[340px]">
    <div className="flex flex-row items-center w-full justify-between">
      <ul className="flex flex-row items-center gap-11 text-sm font-normal text-[#dfdfdf] opacity-[.7]">
        <li>• /02</li>
        <li>• (Works)</li>
      </ul>
      <span className="text-sm font-normal text-[#dfdfdf] opacity-[.7]">
        ™ 23-25
      </span>
    </div>
  </div>
);

interface Project {
  id: number;
  name: string;
  images: string[];
  url: string;
  quantity: string;
  categories: string[];
}

const ProjectSection = ({ project }: { project: Project }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="text-[41px] lg:text-[146px] font-BiggerDisplay font-bold uppercase">
          {project.name}
        </h2>
        <div className="items-center flex flex-row flex-nowrap gap-0 h-min justify-start overflow-visible p-0 relative w-min">
          {project.categories.map((category, index) => (
            <CategoryBadge key={index} text={category} />
          ))}
        </div>
      </div>
      <div className="flex flex-row overflow-visible relative w-full gap-2 image-container">
        <Link
          href={project.url}
          className="place-content-center items-center flex flex-grow-0 basis-auto flex-shrink-0 gap-14 overflow-hidden pb-0 px-0 lg:px-4 relative w-full"
        >
          <ProjectImages images={project.images} />
        </Link>
      </div>
    </>
  );
};

const IndexNumber = ({ currentIndex }: { currentIndex: string }) => {
  const numberRef = useRef(null);
  const [previousIndex, setPreviousIndex] = useState(currentIndex);

  useEffect(() => {
    if (!numberRef.current || previousIndex === currentIndex) return;

    const characters = (numberRef.current as HTMLElement).querySelectorAll(
      "span"
    );
    const lastCharacter = characters[characters.length - 1];

    // Chỉ animate ký tự cuối cùng
    gsap.to(lastCharacter, {
      y: 100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setPreviousIndex(currentIndex);
        gsap.fromTo(
          lastCharacter,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          }
        );
      },
    });
  }, [currentIndex, previousIndex]);

  useEffect(() => {
    // Highlight corresponding bar
    const bars = document.querySelectorAll(".progress-bar");
    bars.forEach((bar, index) => {
      if (`/0${index + 1}` === currentIndex) {
        gsap.to(bar, {
          width: "100%",
          backgroundColor: "#ffffff",
          duration: 0.3,
        });
      } else {
        gsap.to(bar, {
          width: "50%",
          backgroundColor: "#3b3b3d",
          duration: 0.3,
        });
      }
    });
  }, [currentIndex]);

  return (
    <div
      className="hidden lg:fixed bottom-0 left-2 overflow-hidden lg:flex flex-col justify-between h-full"
      style={{ maxHeight: "45rem", overflow: "hidden" }}
    >
      <div className="w-12 flex flex-col justify-between bg-black p-3 rounded-lg gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-[3px] w-[50%] bg-[#3b3b3d] rounded-md progress-bar"
          ></div>
        ))}
      </div>
      <span
        ref={numberRef}
        className="font-BiggerDisplay text-[11.75rem] font-bold block"
      >
        {currentIndex.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              transition:
                index === currentIndex.length - 1 ? "transform 0.3s" : "none",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  );
};

const WorkPage = () => {
  const [currentIndex, setCurrentIndex] = useState("/01");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create scroll triggers for each project section
    projects.forEach((project) => {
      ScrollTrigger.create({
        trigger: `#project-${project.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentIndex(project.quantity),
        onEnterBack: () => setCurrentIndex(project.quantity),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <article className="relative pt-[2rem] px-[1rem] lg:px-11 h-screen">
      <Header />
      <div className="pl-0 md:pl-[232px] lg:pl-[382px] flex flex-col gap-[4.75rem] lg:gap-[8.75rem] items-start mt-[2.5rem] w-full">
        {projects.map((project) => (
          <div id={`project-${project.id}`} key={project.id} className="w-full">
            <ProjectSection project={project} />
          </div>
        ))}
      </div>
      <IndexNumber currentIndex={currentIndex} />
    </article>
  );
};
export default WorkPage;
