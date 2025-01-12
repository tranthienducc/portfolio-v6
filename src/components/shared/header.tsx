"use client";
import { menus } from "@/config/routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Image from "next/image";

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
    <header className="fixed top-0 z-[999] overflow-hidden flex px-12 pt-7 flex-row justify-between items-start w-full max-w-full">
      <span className="text-sm font-normal">VN — © 2024</span>

      <Link
        href="/"
        className="font-Pangaia text-lg font-bold text-white pl-[2%] flex-shrink-0"
      >
        td
      </Link>

      {isScrolled ? <HamburgerMenu /> : <Navigation />}
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

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    const splitTextIntoSpans = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const text = (element as HTMLElement).innerText;
        const splitText = text
          .split("")
          .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
          .join("");
        element.innerHTML = splitText;
      });
    };
    splitTextIntoSpans(".header h1");
  }, []);

  const toggleMenu = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (menuOpen) {
      gsap.to(".menu", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop",
        duration: 1.5,
        onComplete: () => {
          const menuElement = document.querySelector(".menu");
          if (menuElement) {
            (menuElement as HTMLElement).style.pointerEvents = "none";
          }
          setMenuOpen(false);
          setIsAnimating(false);
        },
      });

      gsap.set(".menu", {
        clipPath: "polygon(0% 100% , 100% 100%, 100% 100%, 0% 100%)",
      });
    } else {
      setMenuOpen(true);

      gsap.to(".menu", {
        clipPath: "polygon(0% 0% ,100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        onStart: () => {
          const menuElement = document.querySelector(".menu");
          if (menuElement) {
            (menuElement as HTMLElement).style.pointerEvents = "all";
          }
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    }
  };

  return (
    <div className="relative z-20">
      <div
        className={`menu-toggle ${menuOpen ? "opened" : "closed"}`}
        onClick={toggleMenu}
      >
        <div className="menu-toggle-icon">
          <div className="hamburger">
            <div className="menu-bar" data-position="top"></div>
            <div className="menu-bar" data-position="bottom"></div>
          </div>
        </div>
        <div className="menu-copy">
          <p>Menu</p>
        </div>
      </div>

      <div className="menu">
        <div className="col col-1">
          <div className="menu-logo text-black text-[60px] uppercase font-BiggerDisplay font-bold">
            <Link href="#">ThienDuc</Link>
          </div>

          <div className="links">
            <div className="link">
              <a href="#">Projects</a>
            </div>
            <div className="link">
              <Link href="#">Expertise</Link>
            </div>
            <div className="link">
              <Link href="#">Agency</Link>
            </div>
            <div className="link">
              <Link href="#">Contact</Link>
            </div>
          </div>

          <div className="video-wrapper">
            <Image
              src="/assets/images/my-self.jpg"
              loading="lazy"
              width={1300}
              height={1300}
              alt="img"
            />
          </div>
        </div>
        <div className="col col-2">
          <div className="socials">
            <div className="sub-col">
              <p>Avaro</p>
              <p>9 quao Androe Rockfield</p>
              <p>69001 Ontario</p>
              <p>Canada</p>
              <br />
              <p>contact@Avaro.fr</p>
              <p>job@Avaro.fr</p>
            </div>
            <div className="sub-col">
              <p>Instagram</p>
              <p>LinkedIn</p>
              <p>Twitter</p>
              <p>Facebook</p>
              <br />
              <p>01 62 32 82 42</p>
            </div>
          </div>
          <div className="header">
            <h1>Avaro</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
