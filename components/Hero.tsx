"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Split Text Animation (Manual split for control)
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars) {
        tl.from(chars, {
          yPercent: 100,
          rotateX: -90,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        });
      }

      // 2. Scramble Text Effect
      const subText = "Building Digital Experiences";
      const charsList = "!<>-_\\/[]{}—=+*^?#________";
      
      const scrambleObj = { value: 0 };
      tl.to(scrambleObj, {
        value: 1,
        duration: 2,
        ease: "none",
        onUpdate: () => {
          if (!subTextRef.current) return;
          const progress = scrambleObj.value;
          const len = Math.floor(progress * subText.length);
          let result = subText.substring(0, len);
          
          if (len < subText.length) {
            for (let i = 0; i < 3; i++) {
              result += charsList[Math.floor(Math.random() * charsList.length)];
            }
          }
          subTextRef.current.innerText = result;
        }
      }, "-=0.5");

      // 3. Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20; // -10 to 10
        const yPos = (clientY / innerHeight - 0.5) * 20;

        gsap.to(".hero-content", {
          x: xPos,
          y: yPos,
          rotationY: xPos,
          rotationX: -yPos,
          duration: 1,
          ease: "power2.out"
        });

        gsap.to(".hero-blob", {
          x: -xPos * 2,
          y: -yPos * 2,
          duration: 2,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block origin-bottom transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black text-white perspective-1000"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="hero-blob absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="hero-blob absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-pink-600/20 rounded-full mix-blend-screen filter blur-[100px]" />
      </div>

      <div className="hero-content z-10 text-center px-4 transform-style-3d">
        <h1
          ref={titleRef}
          className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 overflow-hidden leading-tight"
        >
          <div className="overflow-hidden">
            {splitText("CREATIVE")}
          </div>
          <div className="overflow-hidden text-neutral-500">
            {splitText("DEVELOPER")}
          </div>
        </h1>
        
        <div className="h-8 overflow-hidden">
          <p
            ref={subTextRef}
            className="text-xl md:text-2xl font-mono tracking-widest uppercase text-blue-400"
          >
            {/* Text populated by GSAP scramble */}
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>

    </section>
  );
}
