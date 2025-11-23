"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  const skillsRow1 = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "GSAP"];
  const skillsRow2 = ["Three.js", "PostgreSQL", "AWS", "Docker", "Figma", "Git"];

  useEffect(() => {
    // Clock
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const ctx = gsap.context(() => {
      // Bento Grid Entry Animation
      const items = gsap.utils.toArray(".bento-item");
      gsap.from(items, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Marquee Animation
      if (marqueeRef1.current) {
        gsap.to(marqueeRef1.current, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "linear",
        });
      }

      if (marqueeRef2.current) {
        gsap.set(marqueeRef2.current, { xPercent: -50 });
        gsap.to(marqueeRef2.current, {
          xPercent: 0,
          repeat: -1,
          duration: 20,
          ease: "linear",
        });
      }
      
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  const MarqueeItem = ({ text }: { text: string }) => (
    <span className="mx-8 text-4xl md:text-6xl font-bold uppercase tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] hover:[-webkit-text-stroke:0px] hover:text-white transition-all duration-300 cursor-default select-none">
      {text}
    </span>
  );

  return (
    <section ref={containerRef} className="relative w-full py-32 px-4 md:px-10 bg-black text-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bento-item text-center">
            About <span className="text-neutral-600">Me.</span>
          </h2>
          <p className="text-neutral-400 text-xl max-w-lg bento-item mx-auto">
            Full-stack developer bridging design and scalable backend systems.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Bio Card - Large */}
          <div className="bento-item md:col-span-2 row-span-2 p-8 md:p-12 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm hover:bg-neutral-900/80 transition-colors duration-500 group">
            <div className="h-full flex flex-col justify-between gap-8">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="space-y-6 text-lg md:text-2xl text-neutral-300 leading-relaxed font-light text-center">
                <p>
                  I&apos;m a full-stack developer based in India, building scalable, user-focused applications from pixel-perfect
                  frontends to reliable backend services. With a foundation in UI/UX design and engineering, I take a product-first
                  approach to build solutions that are both delightful and performant.
                </p>
                <p>
                  My journey grew from designing interfaces into building APIs, databases, and cloud infrastructure. I enjoy solving
                  problems across the stack using modern tools like React, Next.js, TypeScript, Node.js, PostgreSQL, Docker, and AWS,
                  while keeping accessibility and performance at the core. Outside of work, I explore new technologies and contribute
                  to open-source projects.
                </p>
              </div>
            </div>
          </div>

          {/* Image Card */}
          <div className="bento-item md:col-span-1 row-span-2 relative rounded-3xl overflow-hidden border border-white/10 min-h-[400px]">
             <Image 
               src="/pic%20with%20nmae.png"
               alt="Profile photo"
               fill
               className="object-cover hover:scale-110 transition-transform duration-700"
               unoptimized
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             <div className="absolute bottom-8 left-8">
                <p className="text-2xl font-bold">Akshit Mahajan</p>
             </div>
          </div>

          {/* Location & Time Card */}
          <div className="bento-item md:col-span-1 p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm hover:bg-neutral-900/80 transition-colors duration-500 flex flex-col justify-between min-h-[180px]">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/5 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Location</span>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white mb-1">{time}</h4>
              <p className="text-neutral-400 text-sm">Solan, India</p>
            </div>
          </div>

          {/* Music/Soundtrack Card */}
          <div className="bento-item md:col-span-1 p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm hover:bg-neutral-900/80 transition-colors duration-500 flex flex-col justify-between min-h-[180px]">
             <div className="flex justify-between items-start">
              <div className="flex gap-1 items-end h-5">
                <div className="w-1 bg-green-500 h-2 animate-[bounce_1s_infinite]"></div>
                <div className="w-1 bg-green-500 h-4 animate-[bounce_1.2s_infinite]"></div>
                <div className="w-1 bg-green-500 h-3 animate-[bounce_0.8s_infinite]"></div>
                <div className="w-1 bg-green-500 h-5 animate-[bounce_1.1s_infinite]"></div>
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">On Repeat</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1 truncate">20 Mins</h4>
              <p className="text-neutral-400 text-sm">Lil Uzi Vert</p>
            </div>
          </div>

          {/* Status Card */}
          <div className="bento-item md:col-span-1 p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm hover:bg-neutral-900/80 transition-colors duration-500 flex flex-col justify-between min-h-[180px]">
             <div className="flex justify-between items-start">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Status</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Available</h4>
              <p className="text-neutral-400 text-sm">For Freelance Work</p>
            </div>
          </div>

          {/* Tech Stack Marquee - Wide */}
          <div className="bento-item md:col-span-3 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm overflow-hidden py-12 flex flex-col gap-8">
            <div className="px-10">
               <h3 className="text-2xl font-semibold text-white mb-2">Tech Stack</h3>
               <p className="text-neutral-500 text-sm">The tools I use to build the future.</p>
            </div>
            
            {/* Row 1 */}
            <div className="relative flex overflow-hidden w-full">
              <div ref={marqueeRef1} className="flex whitespace-nowrap">
                {[...skillsRow1, ...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, i) => (
                  <MarqueeItem key={`r1-${i}`} text={skill} />
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="relative flex overflow-hidden w-full">
              <div ref={marqueeRef2} className="flex whitespace-nowrap">
                {[...skillsRow2, ...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, i) => (
                  <MarqueeItem key={`r2-${i}`} text={skill} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
