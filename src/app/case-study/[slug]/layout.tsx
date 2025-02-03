import { Footer } from "@/components/shared";
import { ChildProps } from "@/utils/types";

export default function CaseStudyLayout({ children }: ChildProps) {
  return (
    <main className="h-screen max-w-full w-full">
      {children}
      <Footer />
    </main>
  );
}
