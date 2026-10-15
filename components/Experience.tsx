"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

const milestones = [
  {
    emoji: "🎓",
    period: "2022 — 2026",
    title: "B.Tech, Computer Science",
    org: "Jaypee University of Information Technology",
    summary: "Focused on full-stack development, data structures, and modern web technologies.",
    tags: ["Data Structures", "Web Development", "DBMS"],
    color: "bg-yellow",
  },
  {
    emoji: "💼",
    period: "Mar 2025 — Present",
    title: "Full-Stack Developer",
    org: "TenSketch (Remote)",
    summary:
      "Building responsive UIs, designing and implementing APIs, and shipping full-stack features for client-facing products.",
    tags: ["React.js", "Next.js", "Node.js", "GSAP", "Tailwind CSS"],
    color: "bg-pink",
  },
  {
    emoji: "🛠",
    period: "Jun 2025 — Jul 2025",
    title: "Software Developer Intern",
    org: "Eon Infotech Limited (Chandigarh)",
    summary: "Built an internal ticketing system that helped the support team resolve client issues faster.",
    tags: ["React.js", "PostgreSQL", "Node.js", "Express"],
    color: "bg-blue",
  },
  {
    emoji: "🤖",
    period: "2025 — 2026",
    title: "Product Management & Agentic AI",
    org: "MASAIxBITSOM",
    summary: "Advanced certification combining product strategy with cutting-edge AI agent technologies.",
    tags: ["Product Strategy", "Agentic AI"],
    color: "bg-purple",
  },
];

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const road = root.current!.querySelector<HTMLElement>(".road")!;
      const svg = road.querySelector("svg")!;
      const paths = svg.querySelectorAll("path");
      const cards = gsap.utils.toArray<HTMLElement>(".milestone", road);
      const dots = gsap.utils.toArray<HTMLElement>(".stop", road);

      // Route the road through a stop beside each card, measured from the real layout
      const build = () => {
        const W = road.offsetWidth;
        const H = road.offsetHeight;
        const mobile = W < 700;
        const cx = mobile ? 20 : W / 2;
        const sway = mobile ? 0 : 60;
        const pts = [{ x: cx, y: 0 }];
        cards.forEach((c, i) => {
          const p = { x: cx + (i % 2 ? sway : -sway), y: c.offsetTop + 48 };
          pts.push(p);
          gsap.set(dots[i], { left: p.x, top: p.y });
        });
        pts.push({ x: cx, y: H });
        let d = `M${pts[0].x} 0`;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const my = (a.y + b.y) / 2;
          d += ` C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
        }
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        paths.forEach((p) => p.setAttribute("d", d));
      };
      build();
      ScrollTrigger.addEventListener("refreshInit", build);

      const st = { trigger: road, start: "top 60%", end: "bottom 60%", scrub: 1, invalidateOnRefresh: true };
      gsap.from(".road-drawn", { drawSVG: 0, ease: "none", scrollTrigger: st });
      gsap.to(".rocket", {
        motionPath: { path: ".road-drawn", align: ".road-drawn", alignOrigin: [0.5, 0.5], autoRotate: 45 },
        ease: "none",
        immediateRender: true,
        scrollTrigger: st,
      });

      cards.forEach((card, i) => {
        gsap
          .timeline({ scrollTrigger: { trigger: card, start: "top 62%", toggleActions: "play none none reverse" } })
          .to(dots[i], { scale: 1.4, backgroundColor: "#ff7a45", duration: 0.3, ease: "back.out(4)" })
          .from(card, { scale: 0.6, rotate: i % 2 ? 12 : -12, opacity: 0, duration: 0.7, ease: "back.out(2)" }, 0);
      });

      return () => ScrollTrigger.removeEventListener("refreshInit", build);
    },
    { scope: root }
  );

  return (
    <section id="experience" ref={root} className="relative overflow-hidden border-y-[3px] border-ink bg-mint px-4 py-32 md:px-10 md:py-40">
      <div className="mx-auto mb-24 max-w-6xl text-center">
        <p className="brut-sm mb-6 inline-block rounded-full bg-white px-4 py-1 font-display text-sm font-semibold">The road so far</p>
        <h2 className="font-display text-6xl leading-[0.9] font-extrabold tracking-tight md:text-8xl">My journey</h2>
      </div>

      <div className="road relative mx-auto flex max-w-5xl flex-col gap-20 pb-24 pl-12 md:gap-28 md:pl-0">
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <path className="stroke-ink/25" fill="none" strokeWidth="6" strokeDasharray="14 14" strokeLinecap="round" />
          <path className="road-drawn stroke-ink" fill="none" strokeWidth="6" strokeLinecap="round" />
        </svg>

        {milestones.map((m, i) => (
          <article
            key={m.title}
            className={`milestone brut relative rounded-3xl bg-white p-6 md:w-[42%] md:p-8 ${i % 2 ? "md:self-end" : "md:self-start"}`}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={`brut-sm flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${m.color}`}>{m.emoji}</span>
              <span className="font-display text-sm font-bold uppercase tracking-wide">{m.period}</span>
            </div>
            <h3 className="font-display text-2xl leading-tight font-extrabold md:text-3xl">{m.title}</h3>
            <p className="mt-1 font-semibold opacity-70">{m.org}</p>
            <p className="mt-4 leading-relaxed">{m.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {m.tags.map((t) => (
                <span key={t} className="rounded-full border-2 border-ink px-3 py-0.5 text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}

        {milestones.map((m) => (
          <span
            key={m.title}
            aria-hidden
            className="stop absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-white"
          />
        ))}

        <span aria-hidden className="rocket absolute top-0 left-0 z-10 text-5xl">
          🚀
        </span>
      </div>
    </section>
  );
}
