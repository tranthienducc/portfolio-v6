"use client";
import Heading from "@/components/heading";
import Image from "next/image";
import React, { useState, useRef } from "react";

const services = [
  {
    id: "01",
    title: "Strategy",
    desc: "Clear, actionable plans to align business vision with long-term goals and measurable success.",
    service_image: "/assets/images/big-img-2.avif",
    avatar: "/assets/images/client-1.avif",
    quote:
      "We are committed to delivering exceptional results through our strategic approach.",
  },
  {
    id: "02",
    title: "Brand Identity",
    desc: "Memorable designs that capture the essence of your brand and connect with your audience.",
    service_image: "/assets/images/big-img-2.avif",
    avatar: "/assets/images/client-1.avif",
    quote:
      "We are committed to delivering exceptional results through our strategic approach.",
  },
  {
    id: "03",
    title: "Web Design",
    desc: "Beautiful, user-friendly websites that create seamless experiences and elevate your business.",
    service_image: "/assets/images/big-img-2.avif",
    avatar: "/assets/images/client-1.avif",
    quote:
      "We are committed to delivering exceptional results through our strategic approach.",
  },
  {
    id: "04",
    title: "Web Development",
    desc: "Webflow/Framer sites designed to grow with your business and perform at the highest level.",
    service_image: "/assets/images/big-img-2.avif",
    avatar: "/assets/images/client-2.avif",
    quote:
      "We are committed to delivering exceptional results through our strategic approach.",
  },
  {
    id: "05",
    title: "Web Apps",
    desc: "Custom applications tailored to streamline operations and enhance user engagement.",
    service_image: "/assets/images/test3.jpg",
    avatar: "/assets/images/client-1.avif",
    quote:
      "We are committed to delivering exceptional results through our strategic approach.",
  },
  {
    id: "06",
    title: "UI/UX",
    desc: "User-centered designs that enhance usability, streamline interactions, and elevate experience.",
    service_image: "/assets/images/test4.jpg",
    avatar: "/assets/images/client-2.avif",
    quote:
      "We are committed to delivering exceptional results through our strategic approach.",
  },
  {
    id: "07",
    title: "Pitch Decks",
    desc: "Compelling presentations that tell your story, showcase value, and captivate investors.",
    service_image: "/assets/images/new.jpg",
    avatar: "/assets/images/client-1.avif",
    quote:
      "We are committed to delivering exceptional results through our strategic approach.",
  },
  {
    id: "08",
    title: "Illustrations",
    desc: "Unique and engaging visuals that enhance storytelling, captivate audiences, and bring ideas to life.",
    service_image: "/assets/images/test4.jpg",
    avatar: "/assets/images/client-1.avif",
    quote:
      "We are committed to delivering exceptional results through our strategic approach.",
  },
];

const Services = () => {
  const [hoverServiceId, setHoverServiceId] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0 });
  const serviceRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const handleMouseEnter = (serviceId: string) => {
    setHoverServiceId(serviceId);

    // Get the position of the hovered service item
    if (serviceRefs.current[serviceId]) {
      const rect = serviceRefs.current[serviceId].getBoundingClientRect();
      // Position the hover element next to the list item
      setHoverPosition({
        top: rect.top - 100, // Adjust this offset as needed
      });
    }
  };

  return (
    <section className="mb-[20rem] px-[1rem] lg:px-[1rem]" id="services">
      <Heading
        className="text-[364.471px] leading-[0.8em]"
        heading="Services"
        subheading={[
          "Strategy",
          "Brand Identity",
          "Web Design",
          "Web Development",
          "Web Apps",
        ]}
      />
      <ul className="mt-[185px] relative w-full mb-[365px]">
        {services.map((service) => (
          <React.Fragment key={service.id}>
            <li
              ref={(el) => {
                serviceRefs.current[service.id] = el;
              }}
              className="pt-5 pb-[25px] pl-3 flex flex-row items-start gap-[253px] text-white opacity-40 border-t border-t-white/20 hover:bg-[#090909] hover:text-white duration-300 rounded-md hover:opacity-100 hover:border-t-white/10"
              onMouseEnter={() => handleMouseEnter(service.id)}
              onMouseLeave={() => setHoverServiceId(null)}
            >
              <span className="text-[13px] leading-[26px] font-normal">
                ({service.id})
              </span>
              <h5 className="text-xl font-semibold max-w-[71.883px] w-full whitespace-nowrap">
                {service.title}
              </h5>
              <p className="text-[13px] leading-[18.2px] max-w-[270px] w-full">
                {service.desc}
              </p>
            </li>
            {hoverServiceId === service.id && (
              <div
                className="absolute right-[17.8rem] max-w-[305px] w-full"
                style={{ top: `${hoverPosition.top}px` }}
              >
                <Image
                  src={service.service_image}
                  alt="services-img"
                  width={305}
                  height={385.917}
                  className="rounded-2xl object-cover mb-2 max-h-[229.917px]"
                  loading="lazy"
                />
                <div className="flex flex-row items-start gap-2">
                  <Image
                    src={service.avatar}
                    alt="avatar-img"
                    width={32}
                    height={32}
                    className="size-8 rounded-full object-cover"
                  />
                  <p className="text-xs font-normal text-white max-w-[260px] w-full">
                    &quot;
                    {service.quote}
                    &quot;
                  </p>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>

      <div className="flex flex-row items-start justify-start w-full mb-[185px]">
        <span className="text-[11.5px] leading-[20.7px] font-semibold uppercase text-white opacity-40 pr-[235px]">
          process
        </span>
        <div className="flex flex-row items-start gap-[15px]">
          <p className="text-[13px] leading-[18.2px] font-medium text-left text-white max-w-[297px] w-full">
            Strategy comes first. We start with a brand discovery survey and
            workshop to define your mission, brand keywords, and market
            positioning. We analyse competitors, target audiences, and business
            goals, mapping out the site structure and product user flow to
            create a solid foundation.
          </p>
          <p className="text-[13px] leading-[18.2px] font-medium text-left text-white max-w-[297px] w-full">
            Next is design. With strategy in place, I craft your brand identity
            - logo, typography, colours, and graphics -then apply it across key
            touchpoints like websites, apps, or marketing materials for a
            cohesive look.
          </p>
          <p className="text-[13px] leading-[18.2px] font-medium text-left text-white max-w-[297px] w-full">
            Finally, we launch. I build your website in Framer or Webflow, or
            work with a developer for a seamless rollout. Every detail is
            refined to ensure your brand, website and product are ready to make
            an impact.
          </p>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start w-full mb-[185px] gap-[40px]">
        <span className="text-[11.5px] leading-[20.7px] font-semibold uppercase text-white opacity-40 pr-[235px]">
          process
        </span>
        <div className="max-w-[264px] w-full flex flex-col gap-2 items-start">
          <p className="text-[13px] leading-[15.6px] text-white opacity-40 font-normal">
            Total seed funding raised
          </p>
          <span className="text-[46px] leading-[41.86px] font-semibold text-white">
            $73M+
          </span>
        </div>
        <div className="max-w-[264px] w-full flex flex-col gap-2 items-start">
          <p className="text-[13px] leading-[15.6px] text-white opacity-40 font-normal whitespace-nowrap">
            Increased revenue by
          </p>
          <span className="text-[46px] leading-[41.86px] font-semibold text-white">
            10x
          </span>
        </div>
        <div className="max-w-[264px] w-full flex flex-col gap-2 items-start">
          <p className="text-[13px] leading-[15.6px] text-white opacity-40 font-normal whitespace-nowrap">
            Increased website traffic by
          </p>
          <span className="text-[46px] leading-[41.86px] font-semibold text-white">
            784%
          </span>
        </div>
      </div>
    </section>
  );
};

export default Services;
