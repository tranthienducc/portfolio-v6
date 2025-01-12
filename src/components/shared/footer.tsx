import { footerNavigation } from "@/config/routes";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#ebe0e6] relative z-[-10] max-w-full w-full h-[100vh] overflow-hidden">
      <div className="fixed bottom-0 w-full h-[832.35px] flex flex-col justify-between py-[20px] px-[21px]">
        <div className="flex items-start justify-between">
          <div className="w-layout-grid footer-link-grid-wrap">
            <div className="flex items-start footer-grid-area gap-[94px]">
              {footerNavigation.map((footer) => (
                <React.Fragment key={footer.heading}>
                  <div className="text-black text-[.75em]">{footer.num}</div>

                  <div className="footer-links-item">
                    <div className="footer-grid-area text-black text-[1.25em] font-normal leading-[1] uppercase">
                      {footer.heading}
                    </div>
                    <ul className="w-layout-grid footer-links-grid">
                      {footer.links.map((link) => (
                        <li key={link.href} className="footer-grid-area">
                          <Link href={link.href} className="footer-link-txt">
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            className="relative py-[1vw] text-black max-h-full inline-block"
          >
            <span className="uppercase font-normal text-[22.8px] underline whitespace-nowrap">
              let&apos; work together
            </span>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="flex overflow-hidden opacity-[.6] justify-between mb-[1vw] px-[.5em]">
            <span className="text-[.75em] uppercase font-normal text-black">
              UI/UX designer / Frontend Developer
            </span>
            <span className="text-[.75em] uppercase font-normal text-black">
              portfolio 2025
            </span>
          </div>
          <h3 className="overflow-hidden text-black font-bold tracking-[0] uppercase mb-[-2.25vw] font-BiggerDisplay text-[30.5em] leading-[.9] whitespace-nowrap">
            thien duc
          </h3>
          <div className="relative overflow-hidden flex px-[.5em] min-h-[2em] items-stretch justify-between">
            <Link
              href="#about"
              className="flex items-center text-black uppercase"
            >
              infos & credits
            </Link>
            <Link
              href="#hero"
              className="flex items-center text-black uppercase"
            >
              back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
