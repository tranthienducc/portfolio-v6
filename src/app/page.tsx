import { About, Footer, Hero, Services, Work } from "@/components/shared";

export default function Home() {
  return (
    <div className="relative max-w-full w-full h-screen">
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-hero-pattern rounded-xl m-[15px]"></div>
      <Hero />
      <About />
      <Work />
      <Services />
      <Footer />
    </div>
  );
}
