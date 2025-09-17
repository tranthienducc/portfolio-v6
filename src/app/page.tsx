import {
  About,
  CTA,
  Footer,
  Hero,
  Services,
  Testimonial,
  Work,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <div className="relative max-w-full w-full z-20">
        <Hero />
        <div className="relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#353535_1px,transparent_1px)] bg-[size:20%_100%]"></div>
          <Work />
          <Testimonial />
          <About />
          <Services />
          <CTA />
          <Footer />
        </div>
      </div>
    </>
  );
}
