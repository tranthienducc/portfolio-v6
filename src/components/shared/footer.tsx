import { social } from "@/config/routes";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="bg-white py-[20px] px-[21px] relative h-[733.35px] max-w-full w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 w-full h-[733.35px]">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-0 text-left text-[15px] leading-[20.2518px] font-medium text-black">
            <span>Designer and Frontend Developer</span>
            <span>Portfolio 2023-2025</span>
          </div>
          <Link
            href="/"
            className="font-Pangaia text-lg font-bold text-black flex-shrink-0"
          >
            td
          </Link>
          <div className="flex flex-col gap-0 text-right text-[15px] leading-[20.2518px] font-medium text-black">
            <span>Available for freelance work</span>
            <span>January 2025</span>
          </div>
        </div>
        <div className="pb-[119px] pt-[13rem] flex items-center justify-center text-center flex-col">
          <h1 className="max-w-[42rem] w-full uppercase text-black text-[103.038px] leading-[99.43px] font-bold font-BiggerDisplay mb-[25px]">
            interested in working together?
          </h1>
          <p className="text-[15px] font-normal text-black mb-0">
            Drop me an email:
          </p>
          <span className="text-[26px] font-normal text-black">
            thienducdev@gmail.com
          </span>
        </div>
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-col gap-0 text-left text-[15px] leading-[20.2518px] font-medium text-black">
            <span>
              Designer by:{" "}
              <Link
                href="https://www.threads.net/@darrysduc_"
                className="underline"
              >
                Tran Thien Duc
              </Link>
            </span>
            <span>Development by: Tran Thien Duc</span>
          </div>
          <div className="flex flex-row items-center gap-[11px]">
            {social.map((item, index) => (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="rounded-full border border-black/50 pt-[0.6em] pb-[0.625em] px-[1.25em] text-[.875em] leading-[1] uppercase"
              >
                <span className="text-black">{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-0 text-right text-[15px] leading-[20.2518px] font-medium text-black items-end">
            <Link href="#" className="flex flex-row items-center gap-2">
              Back to top <ArrowUp size={12} className="text-black" />
            </Link>
            <span>© 2024 – All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
