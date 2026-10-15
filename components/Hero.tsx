"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "motion/react";

const stickers = [
  { label: "⚛ React", className: "bg-blue text-white left-[4%] top-[20%]", rotate: -10 },
  { label: "Next.js", className: "bg-mint left-[16%] bottom-[16%] hidden md:block", rotate: 8 },
  { label: "★ Full-stack", className: "bg-yellow right-[5%] top-[24%]", rotate: 7 },
  { label: "TypeScript", className: "bg-purple right-[18%] bottom-[12%] hidden md:block", rotate: -6 },
  { label: "Open to work ✌", className: "bg-pink right-[6%] bottom-[30%] hidden lg:block", rotate: 12 },
];

// Both blobs share the same command structure so Motion can morph between them
const BODY = [
  "M100 18 C152 18 184 52 184 100 C184 152 150 184 100 184 C48 184 16 150 16 100 C16 50 48 18 100 18 Z",
  "M100 24 C158 14 190 56 180 104 C172 156 146 180 96 178 C44 176 12 148 22 96 C30 46 50 32 100 24 Z",
];

function Letters({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block cursor-default"
          initial={{ y: -400, rotate: (i % 2 ? 1 : -1) * 40, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          whileHover={{ y: -24, rotate: i % 2 ? 8 : -8, transition: { type: "spring", stiffness: 500, damping: 10 } }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: delay + i * 0.06 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function Buddy() {
  const ref = useRef<SVGSVGElement>(null);
  const px = useSpring(0, { stiffness: 300, damping: 20 });
  const py = useSpring(0, { stiffness: 300, damping: 20 });
  const [blink, setBlink] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
      px.set(Math.cos(a) * 7);
      py.set(Math.sin(a) * 7);
    };
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3200);
    window.addEventListener("pointermove", move);
    return () => {
      clearInterval(id);
      window.removeEventListener("pointermove", move);
    };
  }, [px, py]);

  return (
    <motion.div
      className="relative inline-block w-[clamp(5rem,14vw,12rem)] align-middle"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.9 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ scale: 0, y: 10, rotate: -20 }}
            animate={{ scale: 1, y: 0, rotate: -8 }}
            exit={{ scale: 0 }}
            className="brut-sm absolute -top-10 -right-6 z-10 rounded-2xl bg-white px-3 py-1 font-display text-lg font-bold tracking-normal"
          >
            hi! 👋
          </motion.span>
        )}
      </AnimatePresence>
      <motion.svg
        ref={ref}
        viewBox="0 0 200 200"
        className="w-full overflow-visible"
        whileHover={{ scaleY: 0.85, scaleX: 1.12 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.path
          className="fill-yellow stroke-ink"
          strokeWidth="6"
          initial={{ d: BODY[0] }}
          animate={{ d: BODY }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.g
          animate={{ scaleY: blink ? 0.1 : 1 }}
          transition={{ duration: 0.08 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {[72, 128].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="88" r="22" className="fill-white stroke-ink" strokeWidth="5" />
              <motion.circle cx={cx} cy="88" r="10" className="fill-ink" style={{ x: px, y: py }} />
            </g>
          ))}
        </motion.g>
        <circle cx="52" cy="124" r="10" className="fill-pink" />
        <circle cx="148" cy="124" r="10" className="fill-pink" />
        <motion.path
          className="stroke-ink"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ d: "M82 132 Q100 146 118 132" }}
          animate={{ d: hover ? "M78 128 Q100 158 122 128" : "M82 132 Q100 146 118 132" }}
        />
      </motion.svg>
    </motion.div>
  );
}

export default function Hero() {
  const area = useRef<HTMLElement>(null);

  return (
    <section id="top" ref={area} className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      {stickers.map((s, i) => (
        <motion.div
          key={s.label}
          drag
          dragConstraints={area}
          dragElastic={0.3}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 12 }}
          whileDrag={{ scale: 1.15, rotate: 0, zIndex: 20 }}
          whileHover={{ scale: 1.08 }}
          initial={{ scale: 0, rotate: s.rotate - 60 }}
          animate={{ scale: 1, rotate: s.rotate }}
          transition={{ type: "spring", stiffness: 260, damping: 12, delay: 1.3 + i * 0.12 }}
          className={`brut-sm absolute z-10 cursor-grab touch-none rounded-2xl px-4 py-2 font-display text-base font-bold select-none active:cursor-grabbing md:text-xl ${s.className}`}
        >
          {s.label}
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="brut-sm mb-6 rounded-full bg-white px-4 py-1.5 font-display text-sm font-semibold md:text-base"
      >
        👋 Hey there, I&apos;m
      </motion.p>

      <h1 className="text-center font-display text-[clamp(3.5rem,15vw,14rem)] leading-[0.85] font-extrabold tracking-[-0.04em]">
        <span className="sr-only">Akshit Mahajan</span>
        <span aria-hidden className="block">
          <Letters text="Akshit" />
          <Buddy />
        </span>
        <span aria-hidden className="block text-blue [-webkit-text-stroke:3px_var(--ink)]">
          <Letters text="Mahajan" delay={0.4} />
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, type: "spring" }}
        className="mt-8 max-w-xl text-center text-lg md:text-2xl"
      >
        A full-stack developer who builds{" "}
        <span className="relative inline-block font-display font-bold">
          playful
          <svg viewBox="0 0 120 16" className="absolute -bottom-2 left-0 w-full overflow-visible" aria-hidden>
            <motion.path
              d="M2 10 C20 2 30 14 50 8 S80 2 118 9"
              fill="none"
              className="stroke-pink"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeInOut" }}
            />
          </svg>
        </span>
        , fast web things, from pixel-perfect frontends to the APIs behind them.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 14 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <a href="#work" className="brut press rounded-full bg-pink px-7 py-3 font-display text-lg font-bold">
          See my work ↓
        </a>
        <a href="#contact" className="brut press rounded-full bg-white px-7 py-3 font-display text-lg font-bold">
          Say hi
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 text-sm"
      >
        psst, the stickers are draggable
      </motion.p>
    </section>
  );
}
