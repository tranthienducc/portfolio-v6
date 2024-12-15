"use client";
import { menus } from "@/config/routes";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Assuming the Hero component takes up the full screen height
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY >= heroHeight);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 z-20 overflow-hidden flex px-12 pt-7 flex-row justify-between items-start w-full max-w-full">
      {isScrolled ? (
        <div
          className={`rounded-full size-12 bg-white flex items-center justify-center
          transition-all duration-300 ease-in-out transform 
          ${
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Menu size={32} className="text-black" />
        </div>
      ) : (
        <Navigation />
      )}

      {/* Rest of your header content remains the same */}

      <Link
        href="/"
        className="font-Pangaia text-lg font-bold text-white pl-[2%] flex-shrink-0"
      >
        td
      </Link>
      <span className="text-sm font-normal">VN — © 2024</span>
    </header>
  );
};

export default Header;

function Navigation() {
  return (
    <nav className="flex flex-col items-start gap-5">
      <ul className="list-none">
        {menus.map((menu) => (
          <li key={menu.href} className="cursor-pointer">
            <span className="text-sm font-medium text-white/80 hover:text-white">
              {menu.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
