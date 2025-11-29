"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * Renders a "Selected Works" portfolio section with stacked, scroll-animated project cards.
 *
 * Sets up GSAP ScrollTrigger animations that scale, dim, and blur the previous card as the next card scrolls into view.
 *
 * @returns The JSX element for the portfolio section containing project cards and their interactive image/content layout.
 */
export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "ServiceBridge",
      category: "Full Stack System",
      description: "A comprehensive customer support ticketing system with dual dashboards for customers and agents. Features real-time messaging, Gmail API integration, and automated notifications.",
      color: "bg-[#0B1120]",
      accent: "text-blue-400",
      year: "2025",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "PDF Fusion",
      category: "Client-Side Tool",
      description: "A privacy-focused PDF editor built with React and PDF.js. Features merging, page reordering, and annotation tools with zero server-side processing.",
      color: "bg-[#1a0505]",
      accent: "text-red-400",
      year: "2024",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "CulinaryQ",
      category: "Web Application",
      description: "Smart recipe discovery platform with dietary filtering and personalized recommendations. Integrated with external APIs for real-time culinary data.",
      color: "bg-[#051a05]",
      accent: "text-green-400",
      year: "2023",
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2080&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Aaradhya Trust",
      category: "Full Stack Modernization",
      description: "Modernized legacy platform for the SP Balasubramaniam trust. React frontend with Node.js backend for transaction tracking and admin management.",
      color: "bg-[#050a1a]",
      accent: "text-cyan-400",
      year: "2023",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];

      cards.forEach((card, i) => {
        const scale = 1 - (cards.length - i) * 0.05;
        
        // Set initial z-index to ensure correct stacking order
        gsap.set(card, { zIndex: i + 1 });

        // Animate the previous card when the current card enters
        if (i > 0) {
          const prevCard = cards[i - 1];
          
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              // Scale down the previous card as the new one comes up
              // We want it to go from scale 1 to roughly 0.9 or 0.8
              // and maybe darken it a bit
              const progress = self.progress;
              gsap.to(prevCard, {
                scale: 1 - (progress * 0.1), // Scale down by 10%
                filter: `brightness(${1 - (progress * 0.4)}) blur(${progress * 5}px)`, // Darken and blur
                transformOrigin: "center top",
                overwrite: "auto",
                duration: 0
              });
            }
          });
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black text-white py-20 px-4 md:px-10">
      
      {/* Header */}
      <div className="mb-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Selected <span className="text-neutral-600">Works</span>
        </h2>
        <p className="text-neutral-400 text-xl max-w-lg mx-auto">
          A collection of digital experiences crafted with precision and passion.
        </p>
      </div>

      {/* Stacked Cards Container */}
      <div className="flex flex-col items-center w-full gap-10 pb-40">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="project-card sticky top-20 w-full max-w-5xl h-[70vh] md:h-[80vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl origin-top"
          >
            <div className={`relative w-full h-full ${project.color} flex flex-col md:flex-row`}>
              
              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-mono border border-white/20 px-3 py-1 rounded-full text-neutral-300">
                      {project.year}
                    </span>
                    <span className={`text-sm font-mono uppercase tracking-wider ${project.accent}`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    {project.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 md:mt-0">
                  <button className="group flex items-center gap-3 text-lg font-medium hover:text-white/80 transition-colors">
                    View Project
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:scale-110">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative w-full md:w-1/2 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 z-10" />
                {/* Using a standard img tag for the example if Next Image is tricky with external URLs without config, 
                    but I'll use Next Image and assume domains are configured or I'll just use standard img for safety if I can't check config.
                    Actually, I checked next.config.ts and it was small, likely didn't have images configured. 
                    I'll use a regular img tag to avoid 'hostname not configured' errors for these unsplash images.
                */}
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}