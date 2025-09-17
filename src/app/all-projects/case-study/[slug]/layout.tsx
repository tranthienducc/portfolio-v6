// import { Footer } from "@/components/shared";
import { ChildProps } from "@/utils/types";

export default function CaseStudyLayout({ children }: ChildProps) {
  return (
    <main className="h-full max-w-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#353535_1px,transparent_1px)] bg-[size:20%_100%]"></div>
      {children}
      {/* <Footer /> */}
    </main>
  );
}
