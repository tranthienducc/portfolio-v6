"use client";
import BlockReveal from "@/components/animation/BlockReveal";
import Preloader from "@/components/Preloader";
import { Header } from "@/components/shared";
import { ChildProps } from "@/utils/types";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";

const Wrapper = ({ children }: ChildProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9000); // Thời gian chạy của Preloader

    document.body.style.overflow = isLoading ? "hidden" : "auto";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);
  return (
    <div className="relative">
      {/* Preloader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black z-[9999]">
          <Preloader />
        </div>
      )}

      {/* ReactLenis Scroll */}
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
        <Header />
        <main>
          {/* Kiểm tra BlockReveal để không ảnh hưởng đến children */}
          <BlockReveal>
            <div className="max-w-full w-full">
              {children} {/* Nội dung của trang */}
            </div>
          </BlockReveal>
        </main>
      </ReactLenis>
    </div>
  );
};

export default Wrapper;
