import {
  About,
  Footer,
  Hero,
  Services,
  Testimonial,
  Work,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <div className="relative max-w-full w-full h-screen z-20">
        <Hero />
        <About />
        <Work />
        <Services />
        <Testimonial />
        <Footer />
      </div>
    </>
  );
}
