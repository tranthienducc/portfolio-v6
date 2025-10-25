import Link from "next/link";

// const links = [
//   {
//     label: "Work",
//     route: "/work",
//     number: "01",
//   },
//   {
//     label: "Servives",
//     route: "/services",
//     number: "02",
//   },
//   {
//     label: "About",
//     route: "/about",
//     number: "03",
//   },
//   {
//     label: "Connect",
//     route: "/connect",
//     number: "04",
//   },
// ];

const Header = () => {
  // pr: 236px ,  gap: 216px
  return (
    <header
      className={`fixed top-0 z-[999] overflow-hidden flex px-[1rem] py-[14px] uppercase flex-row items-center justify-between w-full gap-[20px]
      }`}
    >
      <nav className="flex items-center justify-between w-full">
        <Link href="/work" className="inline-flex">
          <div className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[8.48px] leading-[9.3px] font-AntikorMono">
            <span>01</span>
            <span>/</span>
          </div>
          <span className="text-[10.73px] leading-[14px]">Work</span>
        </Link>
        <Link href="/services" className="inline-flex">
          <div className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[8.48px] leading-[9.3px] font-AntikorMono">
            <span>02</span>
            <span>/</span>
          </div>
          <span className="text-[10.73px] leading-[14px]">Servives</span>
        </Link>

        <Link href="/about" className="inline-flex">
          <div className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[8.48px] leading-[9.3px] font-AntikorMono">
            <span>03</span>
            <span>/</span>
          </div>
          <span className="text-[10.73px] leading-[14px]">About</span>
        </Link>

        <Link href="/connect" className="inline-flex">
          <div className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[8.48px] leading-[9.3px] font-AntikorMono">
            <span>04</span>
            <span>/</span>
          </div>
          <span className="text-[10.73px] leading-[14px]">Connect</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
