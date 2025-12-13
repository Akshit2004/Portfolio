"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  period: string;
  summary: string;
  stack: string[];
  impact: string;
};

type EducationItem = {
  id: number;
  degree: string;
  institution: string;
  period: string;
  summary: string;
  coursework: string[];
  achievements: string;
};

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: "Full-Stack Developer",
      company: "TenSketch (Remote)",
      period: "March 2025 — Present",
      summary: "Contributed across frontend, backend, and end-to-end projects—building responsive UIs, designing and implementing APIs, and shipping full-stack features for client-facing products.",
      stack: ["HTML5", "SCSS", "JavaScript", "GSAP", "Tailwind CSS", "React.js", "Next.js", "Node.js"],
      impact: "Delivered cross-functional features that improved UX and performance, while collaborating closely with designers and backend teams.",
    },
    {
      id: 2,
      role: "Software Developer Intern",
      company: "Eon Infotech Limited (Chandigarh)",
      period: "June 2025 — July 2025",
      summary: "Developed an internal ticketing system for the support team to manage and resolve client issues efficiently using React.js and PostgreSQL.",
      stack: ["React.js", "PostgreSQL", "Node.js", "Express"],
      impact: "Improved issue resolution time by streamlining support operations with live status tracking and efficient escalation processes.",
    },
  ];

  const education: EducationItem[] = [
    {
      id: 2,
      degree: "Product Management & Agentic AI",
      institution: "MASAIxBITSOM",
      period: "2025 - 2026",
      summary: "Advanced certification program focusing on product management principles and cutting-edge AI agent technologies.",
      coursework: ["Product Strategy", "Agentic AI", "Product Management"],
      achievements: "Completed intensive program combining business strategy with modern AI implementation.",
    },
    {
      id: 1,
      degree: "B.Tech — Computer Science Engineering",
      institution: "Jaypee University of Information Technology",
      period: "2022 — 2026",
      summary: "Focused on full-stack development, data structures, and modern web technologies.",
      coursework: ["Data Structures", "Web Development", "Database Management"],
      achievements: "Comprehensive computer science education with hands-on project experience.",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spotlight Effect
      const cards = document.querySelectorAll<HTMLElement>(".holo-card");
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
          (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        });
      });

      // Staggered Entrance for Cards
      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((card) => {
        gsap.fromTo(
          card,
          { 
            y: 100, 
            opacity: 0,
            rotateX: -10,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
          }
        );
      });

      // Sticky Title Animation
      const sections = gsap.utils.toArray<HTMLElement>(".sticky-section");
      sections.forEach((section) => {
        const title = section.querySelector(".sticky-title");
        if (title) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: title,
            pinSpacing: false,
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 bg-black text-white overflow-hidden selection:bg-cyan-500/30"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-10 z-10">
        
        {/* Header */}
        <div className="mb-32">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="font-mono text-xs text-cyan-500 tracking-[0.2em] uppercase">
              <ScrambleText text="System Log: v2.4.0" />
            </span>
          </div>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10">
            JOURNEY
          </h2>
        </div>

        {/* Experience Section */}
        <div className="sticky-section grid grid-cols-1 lg:grid-cols-12 gap-12 mb-40">
          <div className="lg:col-span-4 relative">
            <div className="sticky-title lg:h-screen lg:sticky lg:top-32 flex flex-col justify-start">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-6xl text-cyan-500/20 font-bold">01</span>
                <h3 className="text-4xl font-bold tracking-tight">Experience</h3>
              </div>
              <p className="text-neutral-500 max-w-xs leading-relaxed hidden lg:block">
                Professional milestones and contributions to the digital ecosystem.
              </p>
              <div className="mt-12 hidden lg:block w-px h-32 bg-gradient-to-b from-cyan-500/50 to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            {experiences.map((item) => (
              <div 
                key={item.id} 
                className="holo-card reveal-card group relative bg-neutral-900/40 border border-white/5 p-8 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/30"
                style={{ "--mouse-x": "0px", "--mouse-y": "0px" } as React.CSSProperties}
              >
                {/* Spotlight Gradient */}
                <div 
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.15), transparent 40%)`
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {item.role}
                      </h4>
                      <p className="text-xl text-neutral-400 mt-1">{item.company}</p>
                    </div>
                    <span className="font-mono text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-cyan-200 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-neutral-300 leading-relaxed mb-8 text-lg">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {item.stack.map((tech) => (
                      <span 
                        key={tech} 
                        className="font-mono text-xs uppercase px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="sticky-section grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 relative">
            <div className="sticky-title lg:h-screen lg:sticky lg:top-32 flex flex-col justify-start">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-6xl text-purple-500/20 font-bold">02</span>
                <h3 className="text-4xl font-bold tracking-tight">Education</h3>
              </div>
              <p className="text-neutral-500 max-w-xs leading-relaxed hidden lg:block">
                Academic foundations and specialized certifications.
              </p>
              <div className="mt-12 hidden lg:block w-px h-32 bg-gradient-to-b from-purple-500/50 to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            {education.map((item) => (
              <div 
                key={item.id} 
                className="holo-card reveal-card group relative bg-neutral-900/40 border border-white/5 p-8 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30"
                style={{ "--mouse-x": "0px", "--mouse-y": "0px" } as React.CSSProperties}
              >
                {/* Spotlight Gradient */}
                <div 
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(168,85,247,0.15), transparent 40%)`
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {item.degree}
                      </h4>
                      <p className="text-xl text-neutral-400 mt-1">{item.institution}</p>
                    </div>
                    <span className="font-mono text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-purple-200 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-neutral-300 leading-relaxed mb-8 text-lg">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {item.coursework.map((course) => (
                      <span 
                        key={course} 
                        className="font-mono text-xs uppercase px-3 py-1.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
