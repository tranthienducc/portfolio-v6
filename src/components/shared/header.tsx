"use client";
import { footerLinks, menus } from "@/config/routes";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { menu, perspective, slideIn } from "@/utils/animation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);

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
      <motion.div
        className="w-[480px] h-[650px] bg-[#ebe0e6] rounded-[25px] relative mr-[-47%]"
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && (
            <nav className="flex flex-col justify-between pt-[100px] pb-[50px] px-[40px] h-full box-border">
              <div className="flex gap-[10px] flex-col">
                {menus.map((menu, i) => {
                  return (
                    <div key={`b_${i}`} className="linkContainer">
                      <motion.div
                        custom={i}
                        variants={perspective}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                      >
                        <Link
                          href={menu.href}
                          className="text-black text-[46px] hover:text-[#999] cursor-pointer"
                        >
                          {menu.label}
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
              <motion.div className="flex flex-wrap">
                {footerLinks.map((link, i) => {
                  return (
                    <motion.a
                      variants={slideIn}
                      custom={i}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      key={`f_${i}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[50%] mt-[5px] text-base text-[#999] hover:text-black cursor-pointer"
                    >
                      {link.title}
                    </motion.a>
                  );
                })}
              </motion.div>
            </nav>
          )}
        </AnimatePresence>
      </motion.div>
      {isScrolled ? (
        <div
          onClick={() => setIsActive(!isActive)}
          className={`rounded-full size-12 bg-white flex items-center justify-center
          transition-all duration-300 ease-in-out transform 
          ${
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className={`burger ${isActive ? "burgerActive" : ""}`}></div>
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
