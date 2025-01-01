import { About, Hero, Work } from "@/components/shared";

export default function Home() {
  return (
    <div className="relative max-w-full w-full px-12 py-10 h-screen">
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-hero-pattern rounded-xl m-[15px]"></div>
      <Hero />
      <About />
      <Work />
    </div>
  );
}
