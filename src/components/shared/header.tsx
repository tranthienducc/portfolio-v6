"use client";
import { Filter, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 z-[999] overflow-hidden flex px-[1rem] lg:px-12 pt-4 flex-row justify-between items-start w-full max-w-[423px] lg:max-w-full ${
        menuOpen ? "mix-blend-normal" : "mix-blend-difference"
      }`}
    >
      <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Link
        href="/"
        className="font-Gridular  text-sm lg:text-lg font-bold text-white flex-shrink-0"
      >
        td
      </Link>

      <span className="text-xs lg:text-sm font-normal text-white font-Gridular">
        VN — © 2025
      </span>
    </header>
  );
};

export default Header;

interface HamburgerMenuProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  setMenuOpen,
  menuOpen,
}) => {
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth <= 1024;

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
    if (typeof window === "undefined") return;
    const menuContainer = menuRef.current;
    if (menuContainer) {
      if (menuOpen) {
        menuContainer.style.left = "0";
        animateMenuItems("in");
      } else {
        const isMobile = window.innerWidth <= 1024;
        menuContainer.style.left = isMobile ? "0" : "-50%";
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

  if (typeof window === "undefined") return;

  return (
    <div className="relative z-20">
      <div
        ref={toggleRef}
        className={`menu-toggle lg:w-[80px] w-[48px] h-[19px] lg:h-[30px] bg-white ${
          menuOpen ? "opened" : "closed"
        }`}
        onClick={toggleMenu}
      >
        <div className="hamburger">
          <div
            className="menu-bar text-black bg-black"
            data-position="top"
          ></div>
          <div
            className="menu-bar text-black bg-black"
            data-position="bottom"
          ></div>
        </div>
      </div>
      <div className="main">
        <div
          ref={menuRef}
          className="menu-container fixed transform translate-y-[-50%] h-full flex items-center justify-center z-[2] p-0 lg:w-[45%] w-full lg:top-[48%] top-[50%] lg:left-[-50%] left-0 lg:p-[1.5em]"
          style={{
            left: isMobile ? "0" : "-50%",
            transform: `translateX(${
              menuOpen ? "0" : "-100%"
            }) translateY(-50%)`,
          }}
        >
          <div className="menu lg:rounded-[20px] rounded-none">
            <div className="menu-main">
              <div className="menu-top">
                <div className="menu-top-title flex-grow flex-shrink basis-[0%] lg:py-[2em] lg:pr-[5em] lg:pl-[2em] py-[1em] pr-[0em] pl-[1em]">
                  <p className="font-normal lg:text-base text-sm">Menu</p>
                </div>
                <div className="menu-top-content">
                  {menuItems.map((item, index) => (
                    <div className="menu-item" key={index}>
                      <div className="menu-item-link">
                        <div className="bg-hover"></div>
                        <Link
                          href={`#${item.id}`}
                          className={`char lg:text-[48px] text-[42px] ${
                            activeSection === item.id ? "bg-[#fe3d00]" : ""
                          }`}
                          onClick={() => handleLinkClick(item.id)}
                        >
                          {item.label}
                        </Link>
                        <span className="text-xs ml-2 lg:ml-[20px]">
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
            <X
              size={20}
              className="absolute top-[18px] right-[1.5rem]"
              onClick={() => setMenuOpen(false)}
            />
            <div className="hidden lg:menu-sidebar lg:flex-grow-[0.2] lg:flex-shrink lg:basis-[0%] lg:flex flex-col lg:justify-between">
              <div
                className="hidden lg:close-btn"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </div>
              <div className="hidden lg:logo">
                <Filter size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
