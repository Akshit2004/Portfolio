"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Highlight = {
  id: string;
  title: string;
  value: string;
  detail: string;
};

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

/**
 * Render the "JOURNEY" section presenting professional experience and education with interactive UI elements.
 *
 * The component displays two columns (Experience and Education), decorative kinetic typography in the background,
 * animated entrance effects for content cards, and hover interactions for slate cards and tech/coursework badges.
 * It sets up GSAP ScrollTrigger-driven animations for the kinetic rows (parallax) and for card entrance animations.
 *
 * @returns The section JSX containing the Journey content and its associated animations and interactions.
 */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kineticRef = useRef<HTMLDivElement>(null);

  const highlights: Highlight[] = [
    {
      id: "projects",
      title: "Projects Shipped",
      value: "04",
      detail: "Full-stack applications deployed",
    },
    {
      id: "stack",
      title: "Tech Stack",
      value: "10+",
      detail: "Modern frameworks & tools mastered",
    },
    {
      id: "focus",
      title: "Current Focus",
      value: "AI",
      detail: "Product Management & Agentic AI",
    },
  ];

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TenSketch (Remote)",
      period: "March 2025 — Present",
      summary: "Developing and optimizing responsive web projects for business clients. Redesigned corporate website for Paris region using HTML5, SCSS, and vanilla JavaScript.",
      stack: ["HTML5", "SCSS", "JavaScript", "GSAP"],
      impact: "Enhanced UX through GSAP animations resulting in a 50% increase in organic traffic within the first month.",
    },
    {
      id: 2,
      role: "Software Developer Intern",
      company: "Eon Infotech Limited (Chandigarh)",
      period: "June 2024 — July 2024",
      summary: "Developed an internal ticketing system for the support team to manage and resolve client issues efficiently using React.js and PostgreSQL.",
      stack: ["React.js", "PostgreSQL", "Node.js", "Express"],
      impact: "Improved issue resolution time by streamlining support operations with live status tracking and efficient escalation processes.",
    },
  ];

  const education: EducationItem[] = [
    {
      id: 1,
      degree: "B.Tech — Computer Science Engineering",
      institution: "Jaypee University of Information Technology",
      period: "2022 — 2026",
      summary: "Focused on full-stack development, data structures, and modern web technologies.",
      coursework: ["Data Structures", "Web Development", "Database Management"],
      achievements: "Comprehensive computer science education with hands-on project experience.",
    },
    {
      id: 2,
      degree: "Product Management & Agentic AI",
      institution: "MASAIxBITSOM",
      period: "2025 - 2026",
      summary: "Advanced certification program focusing on product management principles and cutting-edge AI agent technologies.",
      coursework: ["Product Strategy", "Agentic AI", "ML Systems"],
      achievements: "Completed intensive program combining business strategy with modern AI implementation.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic Typography Parallax
      const kineticRows = gsap.utils.toArray<HTMLElement>(".kinetic-row");
      kineticRows.forEach((row, i) => {
        gsap.to(row, {
          xPercent: i % 2 === 0 ? -20 : 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      // Data Slate Card Entrance
      const cards = gsap.utils.toArray<HTMLElement>(".data-slate");
      cards.forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 bg-black text-white overflow-hidden"
    >
      {/* Kinetic Typography Background */}
      <div ref={kineticRef} className="absolute inset-0 flex flex-col justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="kinetic-row text-[20vw] font-black leading-[0.8] whitespace-nowrap text-white">
          EXPERIENCE EDUCATION BUILD SHIP
        </div>
        <div className="kinetic-row text-[20vw] font-black leading-[0.8] whitespace-nowrap text-white ml-[-50vw]">
          DESIGN CODE DEPLOY SCALE INNOVATE
        </div>
        <div className="kinetic-row text-[20vw] font-black leading-[0.8] whitespace-nowrap text-white">
          FUTURE ORIGIN ORBIT SYSTEM DATA
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-10 z-10">
        
        {/* Header Section */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/20 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-cyan-500 animate-pulse" />
                <span className="font-mono text-xs text-cyan-500 tracking-widest uppercase">
                  <ScrambleText text="System Log: v2.4.0" />
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                  JOURNEY
                </span>
              </h2>
            </div>
          </div>
        </div>


        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Experience Column */}
          <div className="space-y-16">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-4xl text-cyan-500/50">01</span>
              <h3 className="text-3xl font-bold tracking-tight">Professional Orbit</h3>
            </div>

            <div className="space-y-8">
              {experiences.map((item) => (
                <div key={item.id} className="data-slate group relative">
                  {/* Chromatic Aberration Effect on Hover */}
                  <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-300 -skew-x-6 rounded-sm" />
                  
                  <div className="relative border-l-2 border-white/10 pl-8 py-2 group-hover:border-cyan-500 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
                      <h4 className="text-2xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                        {item.role}
                      </h4>
                      <span className="font-mono text-xs text-neutral-500 group-hover:text-cyan-500 transition-colors">
                        {item.period}
                      </span>
                    </div>
                    
                    <p className="text-lg text-neutral-400 mb-4 font-medium">{item.company}</p>
                    <p className="text-neutral-400 leading-relaxed mb-6 text-sm max-w-md">
                      {item.summary}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {item.stack.map((tech) => (
                        <span key={tech} className="font-mono text-[10px] uppercase border border-white/20 px-2 py-1 text-neutral-400 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-16 pt-0 lg:pt-32">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-4xl text-purple-500/50">02</span>
              <h3 className="text-3xl font-bold tracking-tight">Academic Origin</h3>
            </div>

            <div className="space-y-8">
              {education.map((item) => (
                <div key={item.id} className="data-slate group relative">
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors duration-300 -skew-x-6 rounded-sm" />
                  
                  <div className="relative border-l-2 border-white/10 pl-8 py-2 group-hover:border-purple-500 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
                      <h4 className="text-2xl font-bold group-hover:translate-x-2 transition-transform duration-300">
                        {item.degree}
                      </h4>
                      <span className="font-mono text-xs text-neutral-500 group-hover:text-purple-500 transition-colors">
                        {item.period}
                      </span>
                    </div>
                    
                    <p className="text-lg text-neutral-400 mb-4 font-medium">{item.institution}</p>
                    <p className="text-neutral-400 leading-relaxed mb-6 text-sm max-w-md">
                      {item.summary}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {item.coursework.map((course) => (
                        <span key={course} className="font-mono text-[10px] uppercase border border-white/20 px-2 py-1 text-neutral-400 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-colors">
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
      </div>
    </section>
  );
}