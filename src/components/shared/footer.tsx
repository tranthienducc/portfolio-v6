// Dung cho footer

import Image from "next/image";
import Link from "next/link";

//     <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#353535_1px,transparent_1px)] bg-[size:20%_100%]"></div>
const Footer = () => {
  return (
    <footer className="relative max-w-full w-full overflow-hidden border-t border-t-white/10">
      <div className="absolute inset-0 -z-10 bg-cover bg-footer-pattern"></div>
      <div className="px-[1rem] pb-2 pt-9 h-screen flex flex-col justify-between">
        <div className="flex flex-row items-start justify-start gap-[280px] px-[37px]">
          <Image
            loading="lazy"
            width={60}
            height={60}
            src="/assets/icons/icon-logo.svg"
            className="size-[60px]"
            alt="logo-footer"
          />
          <div className="flex flex-col gap-0 ml-[34rem]">
            <Link
              href="/about"
              className="text-[11.5px] leading-[20.7px] text-white uppercase font-semibold"
            >
              work
            </Link>
            <Link
              href="/about"
              className="text-[11.5px] leading-[20.7px] text-white uppercase font-semibold"
            >
              services
            </Link>
            <Link
              href="/about"
              className="text-[11.5px] leading-[20.7px] text-white uppercase font-semibold"
            >
              about
            </Link>
            <Link
              href="/about"
              className="text-[11.5px] leading-[20.7px] text-white uppercase font-semibold"
            >
              testimonial
            </Link>
            <Link
              href="/about"
              className="text-[11.5px] leading-[20.7px] text-white uppercase font-semibold"
            >
              connect
            </Link>
            <Link
              href="/about"
              className="text-[11.5px] leading-[20.7px] text-white uppercase font-semibold"
            >
              cta
            </Link>
            <Link
              href="/about"
              className="text-[11.5px] leading-[20.7px] text-white uppercase font-semibold"
            >
              privacy
            </Link>
          </div>
          <Link
            href="https://www.facebook.com/tranthienduc1001"
            rel="noreferrer"
            target="_blank"
            className="text-[11.5px] leading-[20.7px] text-white uppercase font-semibold"
          >
            thienducdev@gmail.com
          </Link>
        </div>
        <div className="relative">
          <h2 className="uppercase font-bold font-NeuroX text-[574.688px] leading-[58.75px] text-[#ebe5d9] pl-[5.25rem]">
            tran thien duc
          </h2>
          <div className="absolute top-[-227px] left-[36px] flex flex-row items-center justify-between max-w-[1360px] w-full">
            <span className="text-[11.5px] leading-[20.7px] text-white opacity-40 uppercase font-semibold">
              ©ttd 2025
            </span>
            <div className="flex flex-row items-center gap-1">
              <Link
                href="https://www.facebook.com/tranthienduc1001"
                rel="noreferrer"
                target="_blank"
                className="text-[11.5px] leading-[20.7px] text-white opacity-40 uppercase font-semibold"
              >
                linkedin
              </Link>
              <Link
                href="https://www.facebook.com/tranthienduc1001"
                rel="noreferrer"
                target="_blank"
                className="text-[11.5px] leading-[20.7px] text-white opacity-40 uppercase font-semibold"
              >
                x
              </Link>
              <Link
                href="https://www.facebook.com/tranthienduc1001"
                rel="noreferrer"
                target="_blank"
                className="text-[11.5px] leading-[20.7px] text-white opacity-40 uppercase font-semibold"
              >
                instagram
              </Link>
              <Link
                href="https://www.facebook.com/tranthienduc1001"
                rel="noreferrer"
                target="_blank"
                className="text-[11.5px] leading-[20.7px] text-white opacity-40 uppercase font-semibold"
              >
                youtube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
