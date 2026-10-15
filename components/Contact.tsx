"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Magnetic from "./ui/Magnetic";

const email = "akshumahajan2004@gmail.com";

const socials = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/akshit0mahajan/", className: "bg-yellow -rotate-3" },
  { name: "GitHub", url: "https://github.com/Akshit2004", className: "bg-white rotate-2" },
  { name: "Instagram", url: "https://www.instagram.com/_akshitmahajan", className: "bg-pink -rotate-2" },
];

const confettiColors = ["#ff7ac0", "#ffd23f", "#3ddc97", "#ff7a45", "#a98bff", "#ffffff"];

type Particle = { id: number; x: number; y: number; r: number; color: string; round: boolean };

function JumpyLine({ text, className = "" }: { text: string; className?: string }) {
  let n = 0;
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((word, w) => (
        <span key={w} className="mx-[0.12em] inline-block whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "110%", rotate: 20, opacity: 0 }}
              whileInView={{ y: 0, rotate: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              whileHover={{ y: -30, scale: 1.2, transition: { type: "spring", stiffness: 500, damping: 8 } }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: n++ * 0.035 }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const celebrate = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    const now = Date.now();
    setParticles(
      Array.from({ length: 40 }, (_, i) => {
        const a = Math.random() * Math.PI * 2;
        const dist = 120 + Math.random() * 220;
        return {
          id: now + i,
          x: Math.cos(a) * dist,
          y: Math.sin(a) * dist - 80,
          r: Math.random() * 720 - 360,
          color: confettiColors[i % confettiColors.length],
          round: i % 3 === 0,
        };
      })
    );
    setTimeout(() => setParticles([]), 1400);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-blue px-4 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-6xl text-center">
        <p className="brut-sm mb-8 inline-block rounded-full bg-white px-4 py-1 font-display text-sm font-semibold">Contact</p>
        <h2 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-extrabold tracking-tight text-white [-webkit-text-stroke:3px_var(--ink)]">
          <JumpyLine text="Let's make" />
          <JumpyLine text="something fun!" className="text-yellow" />
        </h2>
        <p className="mx-auto mt-8 max-w-md text-lg text-white md:text-xl">
          Got a project in mind? I&apos;m available for freelance work and open to full-time roles.
        </p>

        <div className="relative mt-12 inline-block">
          <Magnetic strength={0.4}>
            <button
              onClick={celebrate}
              className="brut press relative rounded-full bg-yellow px-10 py-5 font-display text-2xl font-extrabold md:text-3xl"
            >
              {copied ? "Copied! 🎉" : "Copy my email 📋"}
            </button>
          </Magnetic>
          <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className={`absolute h-3 w-3 border-2 border-ink ${p.round ? "rounded-full" : "rounded-sm"}`}
                style={{ backgroundColor: p.color }}
                initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{ x: p.x, y: [0, p.y, p.y + 160], scale: [0, 1.4, 1], rotate: p.r, opacity: [1, 1, 0] }}
                transition={{ duration: 1.3, ease: "easeOut" }}
              />
            ))}
          </div>
        </div>
        <p className="mt-6">
          <a href={`mailto:${email}`} className="font-semibold text-white underline decoration-2 underline-offset-4 hover:text-yellow">
            or email {email} ↗
          </a>
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-5">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`brut press rounded-2xl px-6 py-3 font-display text-xl font-bold ${s.className}`}
            >
              {s.name} ↗
            </a>
          ))}
        </div>
      </div>

      <footer className="-mx-4 mt-32 border-t-[3px] border-ink bg-cream px-4 py-6 md:-mx-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 font-display font-semibold">
          <span>© {new Date().getFullYear()} Akshit Mahajan · Made with ☕ & code</span>
          <a href="#top" className="brut-sm press rounded-full bg-white px-4 py-1.5">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
