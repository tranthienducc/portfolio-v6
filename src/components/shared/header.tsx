"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 z-[999] overflow-hidden flex px-12 pt-4 flex-row justify-between items-start w-full max-w-full">
      <span className="text-sm font-normal text-white">VN — © 2025</span>

      <Link
        href="/"
        className="font-Gridular text-lg font-bold text-white flex-shrink-0"
      >
        td
      </Link>

      <HamburgerMenu />
    </header>
  );
};

export default Header;

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
      // Close menu animations
      gsap.to(".link, .socials .sub-col p", {
        opacity: 0,
        y: 30,
        duration: 0.5,
      });

      gsap.to(".header h1 span", {
        rotateY: 90,
        y: 500,
        scale: 0.75,
        duration: 0.5,
      });

      gsap.to(".menu", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
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
    } else {
      setMenuOpen(true);

      // Open menu animations
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
          // Animate text elements after menu is opened
          gsap.to(".link", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          });

          gsap.to(".socials .sub-col p", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
          });

          gsap.to(".header h1 span", {
            rotateY: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.02,
          });

          setIsAnimating(false);
        },
      });
    }
  };

  useEffect(() => {
    const menuElement = document.querySelector(".menu");
    if (menuElement) {
      if (menuOpen) {
        menuElement.classList.add("active");
      } else {
        menuElement.classList.remove("active");
      }
    }
  }, [menuOpen]);

  return (
    <div className="relative z-20">
      <div
        className={`menu-toggle ${menuOpen ? "opened" : "closed"}`}
        onClick={toggleMenu}
      >
        <div className="hamburger">
          <div className="menu-bar" data-position="top"></div>
          <div className="menu-bar" data-position="bottom"></div>
        </div>
      </div>

      <div className="menu">
        <div className="col col-1">
          <div className="menu-logo text-black text-[60px] uppercase font-BiggerDisplay font-bold">
            <Link href="#">ThienDuc</Link>
          </div>

          <div className="links">
            <div className="link">
              <Link href="#">Projects</Link>
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
              src="/assets/images/client-2.jpg"
              width={475}
              height={264}
              alt="img"
              priority={true}
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
            <h1>thienduc</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
