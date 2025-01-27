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
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 9000);

    if (isLoading) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Ensure scrolling is restored on unmount
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black z-[9999]">
          <Preloader />
        </div>
      )}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative max-w-full w-full h-screen z-20">
          <div className="absolute inset-0 z-0 bg-center bg-cover bg-hero-pattern rounded-xl m-[15px]"></div>
          <Hero />
          <About />
          <Work />
          <Services />
          <Testimonial />
          <Footer />
        </div>
      </div>
    </>
  );
}
