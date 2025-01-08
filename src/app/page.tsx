// import WaterEffect from "@/components/OGLCanvas";
"use client";
import Preloader from "@/components/Preloader";
import {
  About,
  Footer,
  Hero,
  Services,
  Testimonial,
  Work,
} from "@/components/shared";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setLoading] = useState<boolean>(true);

  const finishedLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 11000);
  };

  useEffect(() => {
    finishedLoading();
  }, []);
  return (
    <>
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>
      {!isLoading && (
        <div className="relative max-w-full w-full h-screen">
          {/* <WaterEffect /> */}
          <div className="absolute inset-0 z-0 bg-center bg-cover bg-hero-pattern rounded-xl m-[15px]"></div>
          <Hero />
          <About />
          <Work />
          <Services />
          <Testimonial />
          <Footer />
        </div>
      )}
    </>
  );
}
