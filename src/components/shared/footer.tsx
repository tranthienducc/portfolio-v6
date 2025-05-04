// Dung cho footer

import Link from "next/link";

//     <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#353535_1px,transparent_1px)] bg-[size:20%_100%]"></div>
const Footer = () => {
  return (
    <footer className="relative max-w-full w-full px-[1rem] pb-2 h-screen overflow-hidden border-t border-t-white/10 pt-9 flex flex-col justify-between">
      <div className="absolute inset-0 pt-[99rem] -z-10 bg-center bg-cover bg-hero-pattern"></div>
      <div className="flex flex-row items-start justify-start gap-[315px]">
        <h2 className="text-[86px] font-bold leading-[68.8px] text-white max-w-[500px] w-full uppercase">
          tran thien duc
        </h2>
        <div className="flex flex-col gap-0">
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

      <div className="flex flex-row items-center gap-[30rem] w-full">
        <span className="text-[11.5px] leading-[20.7px] text-black uppercase font-semibold">
          ©ttd 2025
        </span>
        <div className="flex flex-row items-center gap-1">
          <Link
            href="https://www.facebook.com/tranthienduc1001"
            rel="noreferrer"
            target="_blank"
            className="text-[11.5px] leading-[20.7px] text-black uppercase font-semibold"
          >
            linkedin
          </Link>
          <Link
            href="https://www.facebook.com/tranthienduc1001"
            rel="noreferrer"
            target="_blank"
            className="text-[11.5px] leading-[20.7px] text-black uppercase font-semibold"
          >
            x
          </Link>
          <Link
            href="https://www.facebook.com/tranthienduc1001"
            rel="noreferrer"
            target="_blank"
            className="text-[11.5px] leading-[20.7px] text-black uppercase font-semibold"
          >
            instagram
          </Link>
          <Link
            href="https://www.facebook.com/tranthienduc1001"
            rel="noreferrer"
            target="_blank"
            className="text-[11.5px] leading-[20.7px] text-black uppercase font-semibold"
          >
            youtube
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
