"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "ServiceBridge",
      category: "Full Stack System",
      role: "Lead Developer",
      stack: ["React.js", "PostgreSQL", "Gmail API"],
      description:
        "A comprehensive customer support ticketing system with dual dashboards for customers and agents. Features real-time messaging, Gmail API integration, and automated notifications.",
      challenge: "Support time of the organization was too high and was not organized.",
      impact: [
        "Reduced response time by 40% through automated triage.",
        "Handled 500+ active tickets concurrently with zero data loss.",
        "Streamlined agent workflow by centralizing Gmail communication."
      ],
      glow: "from-blue-500/30",
      accent: "text-blue-400",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
      url: "https://github.com/Akshit2004/EonDesk",
    },
    {
      id: 2,
      title: "PDF Fusion",
      category: "Client-Side Tool",
      role: "Frontend Architect",
      stack: ["React", "PDF.js", "Web Workers", "Tailwind"],
      description:
        "A privacy-focused PDF editor built with React and PDF.js. Features merging, page reordering, and annotation tools with zero server-side processing.",
      challenge: "Managing memory-intensive PDF concatenation entirely on the client-side.",
      impact: [
        "Achieved 100% data privacy with zero server-side processing.",
        "Optimized merge speed by 3x using Web Workers.",
        "Supported multi-MB files with real-time drag-and-drop reordering."
      ],
      glow: "from-red-500/20",
      accent: "text-red-400",
      year: "2025",
      image:
        "https://img.freepik.com/premium-photo/office-documents-papers-office-documents-papers_912214-68300.jpg",
      url: "https://github.com/Akshit2004/Pdfeditor",
    },
    {
      id: 3,
      title: "Flow",
      category: "Project Management",
      role: "Full-Stack Developer",
      stack: ["Next.js", "Dnd-kit", "MongoDB", "Redis"],
      description:
        "A high-performance, Jira-style Kanban board built for speed and clarity. Features drag-and-drop task management, real-time collaboration, and a professional dark-mode interface.",
      challenge: "Synchronizing complex Kanban states across devices in real-time with MongoDB.",
      impact: [
        "Reduced task management overhead for small teams by 30%.",
        "Implemented a robust drag-and-drop system handling 100+ items.",
        "Built a consistent dark-mode UI prioritizing speed and focus."
      ],
      glow: "from-violet-500/20",
      accent: "text-violet-400",
      year: "2025",
      image: "/flow_dashboard.png",
      url: "https://flowcept.in",
    },
    {
      id: 4,
      title: "Trip Buddy",
      category: "AI Travel Platform",
      role: "Solo Developer",
      stack: ["Next.js", "Firebase", "GROK API"],
      description:
        "An AI-powered travel companion built with Next.js and Firebase that generates personalized day-by-day itineraries, integrates hotel & flight search, and manages bookings through a secure user profile.",
      challenge: "Engineering precise AI prompts for consistent, structured JSON itineraries.",
      impact: [
        "Generated 200+ detailed itineraries for early beta users.",
        "95% user satisfaction rate during the initial testing phase.",
        "Integrated live hotel and flight search for a unified experience."
      ],
      note: "Personal project — built end-to-end features including AI trip planning, booking flows, and user profiles.",
      glow: "from-amber-500/20",
      accent: "text-amber-400",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2080&auto=format&fit=crop",
      url: "https://github.com/Akshit2004/Trip-Buddy",
    },
    {
      id: 5,
      title: "Aaradhya Trust",
      category: "Full Stack Modernization",
      role: "Modernization Lead",
      stack: ["React", "Node.js", "Express", "Razorpay"],
      description:
        "Modernized the Aaradhya Trust website by rebuilding it with React and Node.js, adding transaction tracking, and enhancing content management through admin tools.",
      challenge: "Migrating legacy donation records while ensuring transaction integrity.",
      impact: [
        "Boosted online donation conversion by 25% with new flow.",
        "Developed a secure admin dashboard for real-time tracking.",
        "Implemented seamless Razorpay integration for global donors."
      ],
      note: "Built at TenSketch — special thanks to Balachandiran internship opportunity.",
      glow: "from-cyan-500/20",
      accent: "text-cyan-400",
      year: "2025",
      image:
        "/Aaradhya-Trust-Honouring-the-Eternal-Legacy-of-S-P-Balasubrahmanyam-12-03-2025_12_56_AM.png",
      url: "https://github.com/TenSketch/Aaradhaya-UI-React",
      companyUrl: "https://tensketch.com",
      creditLink: "https://www.linkedin.com/in/balachandirantensketch/",
      liveUrl: "https://aaradhyatrust.org/",
    },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const rightPanels = gsap.utils.toArray(".project-info");
      const leftImages = gsap.utils.toArray(".project-image");

      // Initialize all images: hide all except the first one
      gsap.set(leftImages, { opacity: 0, scale: 1.05 });
      if (leftImages[0]) {
        gsap.set(leftImages[0], { opacity: 1, scale: 1 });
      }

      rightPanels.forEach((panel: any, i) => {
        // Toggle the sticky images on the left based on scroll position of right side
        ScrollTrigger.create({
          trigger: panel,
          start: "top center+=100", // slightly below the center of the viewport
          end: "bottom center+=100",
          onToggle: (self) => {
            if (self.isActive && leftImages[i]) {
              // Fade out ALL other images
              leftImages.forEach((img: any, index: number) => {
                if (index !== i) {
                  gsap.to(img, {
                    opacity: 0,
                    scale: 1.05,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }
              });
              // Fade in CURRENT image
              gsap.to(leftImages[i], {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                overwrite: "auto",
              });
            }
          },
        });

        // Parallax and fade-in scrub for the text content itself on the right side
        gsap.fromTo(
          panel,
          { opacity: 0.1, y: 150 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%", 
              end: "top 30%",   
              scrub: 1, // Momentum-style smooth scrubbing
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative bg-black text-white"
      aria-label="Selected Works Sticky Showcase"
    >
      {/* Decorative Blur Background behind the whole section */}
      <div
        className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[200px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex flex-col md:flex-row w-full max-w-[1800px] mx-auto min-h-screen">
        
        {/* Left Side: Sticky Image Viewer (Desktop only) */}
        <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center p-8 lg:p-16 border-r border-white/5 z-0">
          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] max-h-[85vh] rounded-[2rem] overflow-hidden bg-[#050505] border border-white/10 shadow-2xl">
            { projects.map((project) => (
              <div key={`img-${project.id}`} className="project-image absolute inset-0 z-0">
                {/* Subtle Glow Behind Image */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-40 mix-blend-screen pointer-events-none`}
                  aria-hidden="true"
                />
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover"
                  unoptimized // For remote URLs
                />
                {/* Dark Vignette Overlay for cinematic depth */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Scrolling Content */}
        <div className="w-full md:w-1/2 flex flex-col pt-[15vh] pb-[20vh] px-6 sm:px-12 lg:px-24 z-10 relative">
          
          <div className="mb-[15vh] md:mb-[30vh]">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 relative">
              Selected <br/><span className="text-neutral-600">Works</span>
              <div className="absolute -left-6 top-4 w-1 h-3/4 bg-neutral-800" />
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-sm font-light leading-relaxed">
              High-impact digital experiences documented through architecture, challenges, and measurable results.
            </p>
          </div>

          <div className="flex w-full flex-col gap-[30vh]">
            {projects.map((project, index) => (
              <article
                key={`info-${project.id}`}
                className="project-info w-full flex flex-col justify-center origin-left"
              >
                {/* Mobile Image Fallback (Hidden on Desktop) */}
                <div className="md:hidden w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-lg">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-30 pointer-events-none z-10`}
                    aria-hidden="true"
                  />
                  <Image
                    src={project.image}
                    alt={`Overview image for ${project.title}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/30 pointer-events-none z-20" />
                </div>

                {/* Text Content block */}
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-8">
                    <span
                      aria-label={`Built in ${project.year}`}
                      className="text-xs md:text-sm font-mono border border-white/20 bg-white/5 px-4 py-1.5 rounded-full text-neutral-300 backdrop-blur-md"
                    >
                      0{index + 1} &mdash; {project.year}
                    </span>
                    <span
                      className={`text-xs md:text-sm font-bold uppercase tracking-widest ${project.accent}`}
                    >
                      {project.category}
                    </span>
                    {project.role && (
                      <span className="text-[10px] md:text-xs font-mono uppercase text-neutral-500 tracking-tighter border-l border-white/10 pl-4 ml-auto md:ml-0">
                        {project.role}
                      </span>
                    )}
                  </div>

                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[0.9]">
                    {project.title}
                  </h3>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.stack?.map((tech) => (
                      <span key={tech} className="text-[10px] md:text-xs font-mono text-neutral-400 bg-neutral-900 border border-white/5 px-3 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-neutral-300 text-base md:text-xl leading-relaxed mb-10 font-light max-w-lg">
                    {project.description}
                  </p>

                  {/* Challenge & Impact */}
                  <div className="space-y-10 mb-12">
                    <div className="max-w-md">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">The Challenge</h4>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed italic">
                        &ldquo;{project.challenge}&rdquo;
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Proof of Impact</h4>
                      <ul className="space-y-3">
                        {project.impact?.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm md:text-base text-neutral-300 font-light">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${project.accent.replace('text-', 'bg-')} opacity-60`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {project.note && (
                    <div className="text-sm text-neutral-500 leading-relaxed border-l-2 border-white/10 pl-5 py-2 mb-12">
                      <p>
                        {project.note}
                        {project.companyUrl && (
                          <a
                            href={project.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-2 underline underline-offset-4 hover:text-white transition-colors"
                          >
                            TenSketch →
                          </a>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Project Action Button */}
                  <div className="flex flex-wrap items-center gap-6 md:gap-10">
                    {(() => {
                      const primaryLink = project.liveUrl || project.url;
                      const isLive = project.liveUrl || !project.url.includes("github.com");
                      return (
                        <a
                          href={primaryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 text-sm md:text-base font-medium text-neutral-400 hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white/40"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:scale-110 transition-transform">
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </div>
                          View Here &mdash; {isLive ? 'Live' : 'Source'}
                        </a>
                      );
                    })()}
                  </div>
                </div>
              </article>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
