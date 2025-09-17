"use client";
import Heading from "@/components/heading";
import gsap from "gsap";
import { ChevronsDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const awards = [
  {
    name: "Indepment of the year",
    type: "Nominee",
    project: "INNOVATE 2025",
    label: "Awwwards",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "LVXH - AMOT",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "Open Field Audio",
    label: "Awwwards",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "Open Field Audio",
    label: "Awwwards",
  },
  {
    name: "Indepment of the year",
    type: "Nominee",
    project: "INNOVATE 2025",
    label: "Awwwards",
  },
];

const POSITION = {
  BOTTOM: 0,
  MIDDLE: -80,
  TOP: -160,
};

const AwardList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const awardRefs = useRef<HTMLDivElement[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const activeAward = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateAward = () => {
      if (!listRef.current) return;
      const rectList = listRef.current.getBoundingClientRect();

      if (
        mouse.x < rectList.left ||
        mouse.x > rectList.right ||
        mouse.y < rectList.top ||
        mouse.y > rectList.bottom
      ) {
        previewRef.current?.querySelectorAll("img").forEach((img) => {
          gsap.to(img, {
            scale: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => img.remove(),
          });
        });
      }

      if (activeAward.current) {
        const rect = activeAward.current.getBoundingClientRect();
        const isStillOver =
          mouse.x >= rect.left &&
          mouse.x <= rect.right &&
          mouse.y >= rect.top &&
          mouse.y <= rect.bottom;

        if (isStillOver) {
          const wrapper = activeAward.current.querySelector(".award-wrapper");
          const fromTop = mouse.y < rect.top + rect.height / 2;
          gsap.to(wrapper, {
            y: fromTop ? POSITION.TOP : POSITION.BOTTOM,
            duration: 0.4,
            ease: "power2.out",
          });
          activeAward.current = null;
        }
      }

      awardRefs.current.forEach((award) => {
        if (award === activeAward.current) return;
        const rect = award.getBoundingClientRect();
        const isOver =
          mouse.x >= rect.left &&
          mouse.x <= rect.right &&
          mouse.y >= rect.top &&
          mouse.y <= rect.bottom;

        if (isOver) {
          const wrapper = award.querySelector(".award-wrapper");
          gsap.to(wrapper, {
            y: POSITION.MIDDLE,
            duration: 0.4,
            ease: "power2.out",
          });
          activeAward.current = award;
        }
      });

      ticking.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });

      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        if (!previewRef.current) return;
        const images = previewRef.current.querySelectorAll("img");
        if (images.length > 1) {
          const last = images[images.length - 1];
          images.forEach((img) => {
            if (img !== last) {
              gsap.to(img, {
                scale: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => img.remove(),
              });
            }
          });
        }
      }, 2000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("scroll", () => {
      if (!ticking.current) {
        requestAnimationFrame(updateAward);
        ticking.current = true;
      }
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse]);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const award = awardRefs.current[index];
    activeAward.current = award;

    const wrapper = award.querySelector(".award-wrapper");

    gsap.to(wrapper, {
      y: POSITION.MIDDLE,
      duration: 0.4,
      ease: "power2.out",
    });

    const img = document.createElement("img");
    img.src = `/assets/images/img${index + 1}.jpg`;
    Object.assign(img.style, {
      position: "absolute",
      top: 0,
      left: 0,
      scale: 0,
      borderRadius: "1rem",
      zIndex: Date.now(),
    });
    if (previewRef.current) {
      previewRef.current.appendChild(img);
    }

    gsap.to(img, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    activeAward.current = null;
    const award = awardRefs.current[index];
    const rect = award.getBoundingClientRect();
    const fromTop = e.clientY < rect.top + rect.height / 2;
    const wrapper = award.querySelector(".award-wrapper");

    gsap.to(wrapper, {
      y: fromTop ? POSITION.TOP : POSITION.BOTTOM,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section className="awards pt-20">
      <div className="awards-list" ref={listRef}>
        {awards.map((award, index) => (
          <div
            key={index}
            className="award cursor-pointer"
            ref={(el) => {
              if (el) {
                awardRefs.current[index] = el;
              }
            }}
            onMouseEnter={(e) => handleEnter(e, index)}
            onMouseLeave={(e) => handleLeave(e, index)}
          >
            <div className="award-wrapper transition-all">
              <div className="award-name">
                <h1 className="split">{award.name}</h1>
                <h1 className="split">{award.type}</h1>
              </div>
              <div className="award-project">
                <h1 className="split">{award.project}</h1>
                <h1 className="split">{award.label}</h1>
              </div>
              <div className="award-name">
                <h1 className="split">{award.name}</h1>
                <h1 className="split">{award.type}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="award-preview" ref={previewRef}></div>
    </section>
  );
};

const Work = () => {
  return (
    <section
      className="w-full relative h-full max-w-full px-[1rem]  lg:px-[1rem] lg:mb-[-0.5rem] lg:pb-20"
      id="work"
    >
      <Heading
        heading="Selected Works"
        subheading={["Strive", "Lenas", "Liva", "Monash"]}
      />

      <AwardList />

      <Link className="flex justify-end items-end" href="/all-projects">
        <h3 className="uppercase text-2xl font-bold text-[#e3e3db] flex flex-row items-center gap-3">
          show me all
          <ChevronsDown size={20} />
        </h3>
      </Link>
    </section>
  );
};

export default Work;

// const data = [
//   {
//     title: "Gondi UI",
//     description:
//       "Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.",
//     speed: 0.67,
//     img: "/assets/images/imgproject3.avif",
//     url: "gondi-ui",
//   },
//   {
//     title: "Strive",
//     description:
//       "Working on the Next-Generation HMI Experience without no driving experience.",
//     speed: 0.5,
//     img: "/assets/images/imgproject1.avif",
//     url: "strive",
//   },
//   {
//     title: "Lenas",
//     description:
//       "Developed the Future of UFC Sports Ecosystem despite not being a sports fan.",
//     speed: 0.5,
//     img: "/assets/images/imgproject2.avif",
//     url: "lenas",
//   },

//   {
//     title: "Blog",
//     description:
//       "I was just one person on a massive team that created an entire Royal Caribbean eco-system.",
//     speed: 0.8,
//     img: "/assets/images/imgproject4.avif",
//     url: "blog",
//   },
//   {
//     title: "Vios",
//     description:
//       "Designed a 1M+ users product utilizing my best personal experience: sleeping.",
//     speed: 0.8,
//     img: "/assets/images/imgproject5.avif",
//     url: "vios",
//   },
// ];
