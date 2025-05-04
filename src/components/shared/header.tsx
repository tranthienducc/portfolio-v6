import Link from "next/link";


const links = [
  {
    label: "Work",
    route: "/work"
  },
  {
    label: "Servives",
    route: "/services"
  },
  {
    label: "About",
    route: "/about"
  },
  {
    label: "Connect",
    route: "/connect"
  },
]

const Header = () => {

// pr: 236px ,  gap: 216px
  return (
    <header
      className={`fixed top-0 z-[999] overflow-hidden flex px-[1rem] py-[14px] uppercase text-[11.5px] font-semibold flex-row items-center justify-between w-full gap-[20px]
      }`}
    >
<Link href="/" >thien duc</Link>      
<nav className="flex items-center justify-center gap-[320px]">
  {links.map((link) => (

    <Link key={link.label} href={link.route}>
  {link.label}
   </Link>
  ))}
</nav>
    </header>
  );
};

export default Header;

