"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Preloader = () => {
  const digit1Ref = useRef(null);
  const digit2Ref = useRef(null);
  const digit3Ref = useRef(null);
  const progressBarRef = useRef(null);
  const preloaderRef = useRef(null);
  const heroImgsRef = useRef(null);

  const createDigit3Numbers = () => {
    const numbers = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        numbers.push(j);
      }
    }
    numbers.push(0);
    return numbers;
  };

  const animate = (
    digitRef: React.RefObject<HTMLDivElement>,
    duration: number,
    delay: number = 1
  ) => {
    if (!digitRef.current) return;

    const numHeight = digitRef.current.querySelector(".num")?.clientHeight;
    if (!numHeight) return;

    const totalDistance =
      (digitRef.current.querySelectorAll(".num").length - 1) * numHeight;

    gsap.to(digitRef.current, {
      y: -totalDistance,
      duration: duration,
      delay: delay,
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    animate(digit3Ref, 5);
    animate(digit2Ref, 6);
    animate(digit1Ref, 2, 5);

    gsap.to(progressBarRef.current, {
      width: "30%",
      duration: 2,
      ease: "power4.inOut",
      delay: 7,
    });

    gsap.to(progressBarRef.current, {
      width: "100%",
      opacity: 0,
      duration: 2,
      delay: 8.5,
      ease: "power3.out",
      onComplete: () => {
        if (preloaderRef.current) {
          gsap.set(preloaderRef.current, { display: "none" });
        }
        // Đặt lại overflow cho body
        setTimeout(() => {
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
        }, 0);
      },
    });

    gsap.to(".hero-imgs > img", {
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.25,
      delay: 9,
    });

    gsap.to(heroImgsRef.current, {
      scale: 1.25,
      duration: 3,
      ease: "power3.inOut",
      delay: 9,
    });

    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="w-[100vw] h-screen bg-[#ebe0e6] overflow-hidden z-30 relative">
      <div className="pre-loader" ref={preloaderRef}>
        <p>Loading</p>
        <div className="counter">
          <div className="digit-1" ref={digit1Ref}>
            <div className="num">0</div>
            <div className="num offset">1</div>
          </div>
          <div className="digit-2" ref={digit2Ref}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, index) => (
              <div key={`digit2-${index}`} className="num">
                {num}
              </div>
            ))}
          </div>
          <div className="digit-3" ref={digit3Ref}>
            {createDigit3Numbers().map((num, index) => (
              <div key={`digit3-${index}`} className="num">
                {num}
              </div>
            ))}
          </div>
          <div className="digit-4">%</div>
        </div>
        <div className="progress-bar" ref={progressBarRef}></div>
      </div>
      <div className="hero-imgs" ref={heroImgsRef}>
        <Image
          width={1300}
          height={1300}
          className="absolute w-full h-full object-cover clip-path-img"
          src="/assets/images/bg-1.png"
          alt="self portrait"
          priority={true}
        />
        <Image
          src="/assets/images/bg-3.png"
          width={1300}
          height={1300}
          className="absolute w-full h-full object-cover clip-path-img"
          alt="background noise"
          priority={true}
        />
        <Image
          src="/assets/images/bg-2.png"
          width={1300}
          height={1300}
          className="absolute w-full h-full object-cover clip-path-img"
          alt="self portrait"
          priority={true}
        />
        <Image
          src="/assets/images/bg-4.png"
          width={1300}
          height={1300}
          className="absolute w-full h-full object-cover clip-path-img"
          alt="self portrait"
          priority={true}
        />
        <Image
          src="/assets/images/bg-5.png"
          width={1300}
          height={1300}
          className="absolute w-full h-full object-cover clip-path-img"
          alt="self portrait"
          priority={true}
        />
        <Image
          src="/assets/images/bg-6.png"
          width={1300}
          height={1300}
          className="absolute w-full h-full object-cover clip-path-img"
          alt="self portrait"
          priority={true}
        />

        <Image
          src="/assets/images/bg-7.png"
          width={1300}
          height={1300}
          className="absolute w-full h-full object-cover clip-path-img"
          alt="background noise"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Preloader;
