import CaseStudyFooter from "@/app/case-study/[slug]/_components/Footer";
import CaseStudyHeader from "@/app/case-study/[slug]/_components/Header";
import { ChildProps } from "@/utils/types";

export default function CaseStudyLayout({ children }: ChildProps) {
  return (
    <main className="h-screen max-w-full w-full bg-white">
      <CaseStudyHeader />
      {children}
      <CaseStudyFooter />
    </main>
  );
}
