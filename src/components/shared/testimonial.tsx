import Image from "next/image";
import Heading from "@/components/heading";

const testimonials = [
  {
    name: "John Garden",
    title: "Co-Founder of Gosh",
    image: "/assets/images/test1.jpg",
    logo: "/assets/icons/icon-logo.svg",
    company: "Gosh",
    quote:
      "This partnership has effectively redefined Gosh identity and product. Aligning them with our core values of scientific innovation and trustworthiness in the healthcare space.",
  },
  {
    name: "Anna White",
    title: "CTO of Lumina",
    image: "/assets/images/test2.jpg",
    logo: "/assets/icons/icon-logo.svg",
    company: "Lumina",
    quote:
      "Duc brought our brand to life with expert design and professionalism, helping us stand out and connect with clients. His work made a real impact, and I highly recommend him.",
  },
  {
    name: "Craig MacAlpine",
    title: "Founder of Expert Insights",
    image: "/assets/images/test3.jpg",
    logo: "/assets/icons/icon-logo.svg",
    company: "Expert Insights",
    quote:
      "Duc process was hugely beneficial in defining our brand and business goals. The subsequent designs helped us demonstrate our position as a credible leader in the industry. We’re incredibly happy with the results.",
  },
  {
    name: "Lisa Moon",
    title: "CMO at Brightspace",
    image: "/assets/images/test4.jpg",
    logo: "/assets/icons/icon-logo.svg",
    company: "Brightspace",
    quote:
      "Duc delivered sleek, user-friendly product and website designs that perfectly captured our brand. The final result looks amazing, functions flawlessly, and exceeded our expectations. Highly recommend!",
  },
  {
    name: "David Lin",
    title: "Head of Product at Streamflow",
    image: "/assets/images/test5.jpg",
    logo: "/assets/icons/icon-logo.svg",
    company: "Streamflow",
    quote:
      "Duc is really the best designer you can get. He pays attention to details, acts professionally, and asks insightful questions that ultimately lead to outstanding designs that match the ethos of the brand.",
  },
  {
    name: "Olivia Parkes",
    title: "CEO of TheSystemsBoss",
    image: "/assets/images/client-1.avif",
    logo: "/assets/icons/icon-logo.svg",
    company: "TheSystemsBoss",
    quote:
      "The branding workshop was a concise and valuable way to refine our brand. Duc simplified complex ideas into clear, visually appealing designs, and we were thrilled with the outcome.",
  },
  {
    name: "Will Bruhn",
    title: "Co-Founder of GAM",
    image: "/assets/images/client-2.avif",
    logo: "/assets/icons/icon-logo.svg",
    company: "GAM",
    quote:
      "Duc consistently delivers top-quality work and guided our team on brand implementation. His strategy workshop was engaging and results-driven, and his process was seamless and flexible throughout.",
  },
  {
    name: "Sara Blake",
    title: "Founder of ThriveNow",
    image: "/assets/images/test4.jpg",
    logo: "/assets/icons/icon-logo.svg",
    company: "ThriveNow",
    quote:
      "Duc brand workshop was remarkably enjoyable and exactly what we needed. The result was a clearly defined strategic direction and a brand identity, and website that positioned us as a leading productivity platform.",
  },
  {
    name: "Marcus Vane",
    title: "Creative Director at Nuvio",
    image: "/assets/images/test5.jpg",
    logo: "/assets/icons/icon-logo.svg",
    company: "Nuvio",
    quote:
      "Duc has been a valued contributor to Pharsalus, playing a key role in our brand building and content creation, particularly with our logo, website, and early decks. Personable and easy to work with, we highly recommend him.",
  },
];

const TestimonialCard = ({
  t,
  index,
}: {
  t: (typeof testimonials)[number];
  index: number;
}) => {
  const shouldRotateRight = [1, 4, 5, 7].includes(index);

  return (
    <div className="flex flex-col items-center gap-[19px] max-w-[416px] h-[414px] w-full">
      <div
        className={`w-[175.379px] h-[248.68px] p-2 flex flex-col gap-2 bg-white text-black rounded mt-[10rem] ${
          shouldRotateRight ? "rotate-[2deg]" : "rotate-[-2deg]"
        } transform mb-[13px]`}
      >
        <div className="flex-1 min-h-0 w-full">
          <Image
            src={t.image}
            alt={t.name}
            loading="lazy"
            width={175}
            height={248}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-none h-[29px] flex items-start justify-start flex-col">
          <p className="text-xs font-medium text-black">{t.name}</p>
          <span className="text-xs font-normal text-black opacity-40">
            {t.title}
          </span>
        </div>
      </div>
      <div className="flex items-center flex-col gap-[10px] text-center justify-center">
        <div className="flex flex-row items-center gap-2">
          <Image
            src={t.logo}
            alt="logo"
            width={32}
            height={32}
            className="size-[32px]"
          />
          <span className="text-sm font-medium text-white">{t.company}</span>
        </div>
        <p className="font-InstrumentSerif text-[25px] leading-[30px] text-white">
          “{t.quote}”
        </p>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <section className="px-4 lg:px-[1rem] py-10" id="testimonial">
      <Heading
        className="text-[255.35px] leading-[0.8em]"
        heading="Testimonials"
        subheading={[
          "Dont't just take my word for it",
          "Kind words",
          "Happy customers",
        ]}
      />

      <div className="px-[279px] flex flex-col gap-y-[83px]">
        {[0, 3, 6].map((startIndex) => (
          <div key={startIndex} className="flex flex-col">
            {/* 2 testimonial trái phải */}
            <div className="grid grid-cols-2 gap-x-[130px]">
              {testimonials[startIndex] && (
                <div className="justify-self-end">
                  <TestimonialCard
                    t={testimonials[startIndex]}
                    index={startIndex}
                  />
                </div>
              )}
              {testimonials[startIndex + 1] && (
                <div className="justify-self-start">
                  <TestimonialCard
                    t={testimonials[startIndex + 1]}
                    index={startIndex + 1}
                  />
                </div>
              )}
            </div>
            {/* testimonial chính giữa */}
            {testimonials[startIndex + 2] && (
              <div className="mt-[83px] mb-[83px] flex justify-center">
                <TestimonialCard
                  t={testimonials[startIndex + 2]}
                  index={startIndex + 2}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
