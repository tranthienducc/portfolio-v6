import Link from "next/link";

const links = [
  {
    label: "Work",
    route: "/work",
    number: "01",
  },
  {
    label: "Servives",
    route: "/services",
    number: "02",
  },
  {
    label: "About",
    route: "/about",
    number: "03",
  },
  {
    label: "Connect",
    route: "/connect",
    number: "04",
  },
];

const Header = () => {
  // pr: 236px ,  gap: 216px
  return (
    <header
      className={`fixed top-0 z-[999] overflow-hidden flex px-[1rem] py-[14px] uppercase flex-row items-center justify-between w-full gap-[20px]
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="uppercase text-[11.5px] font-semibold font-AntikorMono"
      >
        thien duc
      </Link>
      <nav className="flex items-center justify-center gap-[320px]">
        {links.map((link) => (
          <Link key={link.label} href={link.route} className="inline-flex">
            <div className="text-white opacity-40 mr-[.4rem] mt-[.1rem] text-[8.48px] leading-[9.3px] font-AntikorMono">
              <span>{link.number}</span>
              <span>/</span>
            </div>
            <span className="text-[10.73px] leading-[14px]">{link.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
