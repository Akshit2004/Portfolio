"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = {
  title: string;
  category: string;
  stack: string[];
  description: string;
  impact: string[];
  image: string;
  url: string;
  liveUrl?: string;
  note?: string;
  color: string;
};

const projects: Project[] = [
  {
    title: "ServiceBridge",
    category: "Full Stack System",
    stack: ["React.js", "PostgreSQL", "Gmail API"],
    description:
      "A customer support ticketing system with dual dashboards for customers and agents, real-time messaging and Gmail API integration.",
    impact: ["40% faster response time via automated triage", "500+ concurrent tickets, zero data loss"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
    url: "https://github.com/Akshit2004/EonDesk",
    color: "bg-pink",
  },
  {
    title: "PDF Fusion",
    category: "Client-Side Tool",
    stack: ["React", "PDF.js", "Web Workers", "Tailwind"],
    description:
      "A privacy-focused PDF editor: merging, page reordering and annotations with zero server-side processing.",
    impact: ["100% private, files never leave the browser", "3x faster merges with Web Workers"],
    image: "https://img.freepik.com/premium-photo/office-documents-papers-office-documents-papers_912214-68300.jpg",
    url: "https://github.com/Akshit2004/Pdfeditor",
    color: "bg-mint",
  },
  {
    title: "Flow",
    category: "Project Management",
    stack: ["Next.js", "Dnd-kit", "MongoDB", "Redis"],
    description:
      "A high-performance, Jira-style Kanban board built for speed and clarity, with drag-and-drop and real-time collaboration.",
    impact: ["30% less task-management overhead for small teams", "Smooth drag-and-drop across 100+ items"],
    image: "/flow_dashboard.png",
    url: "https://flowcept.in",
    liveUrl: "https://flowcept.in",
    color: "bg-yellow",
  },
  {
    title: "Trip Buddy",
    category: "AI Travel Platform",
    stack: ["Next.js", "Firebase", "GROK API"],
    description:
      "An AI travel companion that plans personalized day-by-day itineraries, with hotel & flight search and bookings.",
    impact: ["200+ itineraries generated for beta users", "95% satisfaction during initial testing"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2080&auto=format&fit=crop",
    url: "https://github.com/Akshit2004/Trip-Buddy",
    color: "bg-blue",
  },
  {
    title: "Aaradhya Trust",
    category: "Full Stack Modernization",
    stack: ["React", "Node.js", "Express", "Razorpay"],
    description:
      "Rebuilt the Aaradhya Trust website with React and Node.js, adding transaction tracking and admin tools.",
    impact: ["25% boost in online donation conversion", "Razorpay integration for global donors"],
    note: "Built at TenSketch, thanks to Balachandiran for the opportunity.",
    image: "/Aaradhya-Trust-Honouring-the-Eternal-Legacy-of-S-P-Balasubrahmanyam-12-03-2025_12_56_AM.png",
    url: "https://github.com/TenSketch/Aaradhaya-UI-React",
    liveUrl: "https://aaradhyatrust.org/",
    color: "bg-purple",
  },
];

function TiltImage({ src, alt, href }: { src: string; alt: string; href: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 15 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 15 });

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="brut relative block aspect-[4/3] overflow-hidden rounded-2xl bg-white md:aspect-auto md:h-full"
    >
      <Image src={src} alt={alt} fill className="object-cover" unoptimized />
    </motion.a>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const wraps = gsap.utils.toArray<HTMLElement>(".card-wrap");
      wraps.forEach((wrap, i) => {
        gsap.from(wrap.querySelector(".card"), {
          rotate: i % 2 ? 7 : -7,
          y: 120,
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "top 40%", scrub: true },
        });
        const next = wraps[i + 1];
        if (!next) return;
        // Card shrinks and tilts back as the next one slides over it
        gsap.to(wrap, {
          scale: 0.88,
          rotate: i % 2 ? 3 : -3,
          filter: "brightness(0.8)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} className="px-4 py-32 md:px-10 md:py-40">
      <div className="mx-auto mb-20 max-w-6xl text-center">
        <p className="brut-sm mb-6 inline-block rounded-full bg-white px-4 py-1 font-display text-sm font-semibold">Selected work</p>
        <h2 className="font-display text-6xl leading-[0.9] font-extrabold tracking-tight md:text-8xl">
          Stuff I&apos;ve <span className="text-pink [-webkit-text-stroke:3px_var(--ink)]">built</span> 🛠
        </h2>
      </div>

      <div className="mx-auto max-w-6xl">
        {projects.map((p, i) => (
          <div key={p.title} className="card-wrap mb-[8vh] md:sticky md:mb-[12vh] origin-top last:mb-0" style={{ top: `calc(5.5rem + ${i * 14}px)` }}>
            <article
              className={`card brut grid gap-8 rounded-[2rem] p-6 md:min-h-[72vh] md:grid-cols-2 md:p-10 ${p.color}`}
            >
              <div className="flex flex-col">
                <div className="mb-6 flex items-center gap-3">
                  <span className="brut-sm flex h-12 w-12 items-center justify-center rounded-full bg-white font-display text-xl font-extrabold">
                    {i + 1}
                  </span>
                  <span className="brut-sm rounded-full bg-white px-3 py-1 text-sm font-semibold">{p.category}</span>
                </div>
                <h3 className="mb-4 font-display text-5xl leading-[0.9] font-extrabold tracking-tight md:text-7xl">{p.title}</h3>
                <p className="mb-6 text-lg leading-relaxed">{p.description}</p>
                <ul className="mb-6 space-y-2">
                  {p.impact.map((item) => (
                    <li key={item} className="flex gap-2 font-semibold">
                      <span>⚡</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mb-8 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full border-2 border-ink bg-white/60 px-3 py-0.5 text-sm font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                {p.note && <p className="mb-6 text-sm opacity-80">{p.note}</p>}
                <div className="mt-auto flex flex-wrap gap-3">
                  <a
                    href={p.liveUrl ?? p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brut-sm press rounded-full bg-ink px-5 py-2.5 font-display font-bold text-white"
                  >
                    {p.liveUrl ? "Visit live ↗" : "View code ↗"}
                  </a>
                  {p.liveUrl && p.liveUrl !== p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brut-sm press rounded-full bg-white px-5 py-2.5 font-display font-bold"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
              <TiltImage src={p.image} alt={`Screenshot of ${p.title}`} href={p.liveUrl ?? p.url} />
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
