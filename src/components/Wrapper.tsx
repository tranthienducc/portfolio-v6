"use client";
import { Header } from "@/components/shared";
import { ChildProps } from "@/utils/types";
import { ReactLenis } from "@studio-freight/react-lenis";

const Wrapper = ({ children }: ChildProps) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <Header />
      <main className="max-w-full w-full">{children}</main>;
    </ReactLenis>
  );
};

export default Wrapper;
