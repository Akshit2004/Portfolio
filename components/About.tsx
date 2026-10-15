"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const facts = ["📍 Solan, India", "💼 Full-stack @ TenSketch", "🎓 B.Tech CSE '26", "🤖 PM & Agentic AI"];

const skills = [
  { name: "React", color: "bg-blue text-white" },
  { name: "Next.js", color: "bg-white" },
  { name: "TypeScript", color: "bg-purple" },
  { name: "Node.js", color: "bg-mint" },
  { name: "Tailwind", color: "bg-pink" },
  { name: "GSAP", color: "bg-orange" },
  { name: "Three.js", color: "bg-white" },
  { name: "PostgreSQL", color: "bg-blue text-white" },
  { name: "AWS", color: "bg-orange" },
  { name: "Docker", color: "bg-mint" },
  { name: "Figma", color: "bg-pink" },
  { name: "Git", color: "bg-purple" },
];

// Hand-drawn loop scribbled around a phrase as it scrolls into view
function Scribble({ children, color = "stroke-pink" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] overflow-visible" aria-hidden>
        <path
          className={`scribble ${color}`}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          d="M150 8 C90 0 20 6 8 28 C-2 48 60 58 110 55 C170 52 198 40 194 24 C190 10 150 4 112 6"
        />
      </svg>
    </span>
  );
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Yellow floods the screen from the top as you arrive
      gsap.fromTo(
        ".about-bg",
        { clipPath: "circle(0% at 50% 0%)" },
        { clipPath: "circle(150% at 50% 0%)", ease: "none", scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 10%", scrub: true } }
      );

      // Photo gets slapped on like a sticker
      gsap.from(".photo", {
        scale: 2.4,
        rotate: -30,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(2.5)",
        scrollTrigger: { trigger: ".photo", start: "top 75%" },
      });

      gsap.utils.toArray<SVGPathElement>(".scribble").forEach((p) => {
        gsap.from(p, { drawSVG: 0, duration: 0.9, ease: "power2.inOut", scrollTrigger: { trigger: p, start: "top 75%" } });
      });

      gsap.from(".fact", {
        scale: 0,
        rotate: () => gsap.utils.random(-30, 30),
        stagger: 0.08,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: ".facts", start: "top 85%" },
      });

      gsap.from(".skill", {
        y: -200,
        rotate: () => gsap.utils.random(-90, 90),
        opacity: 0,
        stagger: { each: 0.05, from: "random" },
        duration: 1.1,
        ease: "bounce.out",
        scrollTrigger: { trigger: ".skills", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative px-4 py-32 md:px-10 md:py-40">
      <div className="about-bg absolute inset-0 bg-yellow" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[0.8fr_1.2fr]">
        <div className="photo relative mx-auto w-full max-w-sm rotate-[-4deg]">
          <span className="absolute -top-4 left-1/2 z-10 h-8 w-28 -translate-x-1/2 rotate-3 bg-white/70 border-2 border-ink/20" aria-hidden />
          <div className="brut rounded-3xl bg-white p-3 pb-14 transition-transform duration-300 hover:rotate-6 hover:scale-105">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-[3px] border-ink">
              <Image src="/pic%20with%20nmae.png" alt="Portrait of Akshit Mahajan" fill className="object-cover" unoptimized />
            </div>
            <p className="absolute bottom-3 left-0 right-0 text-center font-display text-2xl font-bold">that&apos;s me!</p>
          </div>
        </div>

        <div>
          <p className="brut-sm mb-6 inline-block rounded-full bg-white px-4 py-1 font-display text-sm font-semibold">About me</p>
          <h2 className="mb-8 font-display text-5xl leading-[0.95] font-extrabold tracking-tight md:text-7xl">
            I make the web feel <Scribble>alive.</Scribble>
          </h2>
          <div className="space-y-5 text-lg leading-relaxed md:text-xl">
            <p>
              I&apos;m a <Scribble color="stroke-blue">full-stack developer</Scribble> based in India, building scalable,
              user-focused apps from pixel-perfect frontends to reliable backend services.
            </p>
            <p>
              I started out designing interfaces and grew into APIs, databases and cloud infrastructure. I care about
              products that are both delightful and performant, with accessibility baked in.
            </p>
          </div>
          <div className="facts mt-8 flex flex-wrap gap-3">
            {facts.map((f) => (
              <span key={f} className="fact brut-sm rounded-full bg-white px-4 py-2 font-display font-semibold">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-28 max-w-6xl text-center">
        <h3 className="mb-10 font-display text-3xl font-extrabold md:text-5xl">My toolbox 🧰</h3>
        <div className="skills flex flex-wrap justify-center gap-4">
          {skills.map((s, i) => (
            <span
              key={s.name}
              style={{ rotate: `${(i % 3) * 3 - 3}deg` }}
              className={`skill brut-sm rounded-2xl px-5 py-3 font-display text-xl font-bold transition-transform hover:-translate-y-2 md:text-2xl ${s.color}`}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
