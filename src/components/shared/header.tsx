"use client";
import { Filter, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  return (
    <header className="fixed top-0 z-[999] overflow-hidden flex px-[1rem] lg:px-12 pt-4 flex-row justify-between items-start  w-full max-w-[423px] lg:max-w-full">
      <HamburgerMenu />

      <Link
        href="/"
        className="font-Gridular  text-sm lg:text-lg font-bold text-black flex-shrink-0"
      >
        td
      </Link>

      <span className="text-xs lg:text-sm font-normal text-black font-Gridular">
        VN — © 2025
      </span>
    </header>
  );
};

export default Header;

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      const menuContainer = document.querySelector(".menu-container");
      if (menuContainer) {
        (menuContainer as HTMLElement).style.left = "0%";
        animateMenuItems("in");
      }
    } else {
      const menuContainer = document.querySelector(".menu-container");
      if (menuContainer) {
        (menuContainer as HTMLElement).style.left = "-50%";
        animateMenuItems("out");
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "work",
        "services",
        "testimonial",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  const animateMenuItems = (direction: "in" | "out") => {
    const items = document.querySelectorAll<HTMLElement>(".menu-item");
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.left = direction === "in" ? "0px" : "-100px";
      }, index * 50);
    });
  };

  const menuItems = [
    { label: "Hero", id: "hero" },
    { label: "About", id: "about" },
    { label: "Work", id: "work" },
    { label: "Services", id: "services" },
    { label: "Testimonial", id: "testimonial" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="relative z-20">
      <div
        ref={toggleRef}
        className={`menu-toggle ${menuOpen ? "opened" : "closed"}`}
        onClick={toggleMenu}
      >
        <div className="hamburger">
          <div className="menu-bar" data-position="top"></div>
          <div className="menu-bar" data-position="bottom"></div>
        </div>
      </div>
      <div className="main">
        <div ref={menuRef} className="menu-container" style={{ left: "-50%" }}>
          <div className="menu">
            <div className="menu-main">
              <div className="menu-top">
                <div className="menu-top-title">
                  <p className="font-normal">Menu</p>
                </div>
                <div className="menu-top-content">
                  {menuItems.map((item, index) => (
                    <div className="menu-item" key={index}>
                      <div className="menu-item-link">
                        <div className="bg-hover"></div>
                        <Link
                          href={`#${item.id}`}
                          className={`char ${
                            activeSection === item.id ? "bg-[#fe3d00]" : ""
                          }`}
                          onClick={() => handleLinkClick(item.id)}
                        >
                          {item.label}
                        </Link>
                        <span className="text-xs ml-[20px]">
                          Section {String(index + 1).padStart(3, "0")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="menu-bottom">
                {["Socials", "Gallery", "US-EN"].map((title, index) => (
                  <div className="menu-sub-item" key={index}>
                    <div className="menu-title text-[#999] text-sm">
                      <p>{title}</p>
                    </div>
                    <div className="menu-content">
                      <p>
                        {index === 0
                          ? "Facebook"
                          : index === 1
                          ? "Opensea"
                          : "2025"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="menu-sidebar">
              <div className="close-btn" onClick={() => setMenuOpen(false)}>
                <X size={20} />
              </div>
              <div className="logo">
                <Filter size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
