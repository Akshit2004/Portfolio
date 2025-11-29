"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

/**
 * Render the contact section with animated entrance and hover-driven background imagery.
 *
 * Sets up a scroll-triggered reveal for each contact link and updates background visibility and text emphasis based on hover state.
 *
 * @returns The rendered contact section element
 */
export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const links = [
    {
      name: "Email",
      url: "mailto:hello@example.com",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "LinkedIn",
      url: "#",
      image: "https://tse1.mm.bing.net/th/id/OIP.mtmVoOewnfe3PRfHxahTqwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "GitHub",
      url: "#",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop"
    },
    {
      name: "Instagram",
      url: "#",
      image: "https://colorlib.com/wp/wp-content/uploads/sites/2/instagram-image-size.jpg"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal
      gsap.from(".contact-link", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full flex flex-col justify-center bg-black text-white relative overflow-hidden px-4 md:px-20 py-20"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {links.map((link, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${hoveredIndex === index ? 'opacity-40' : 'opacity-0'}`}
          >
            <Image
              src={link.image}
              alt={link.name}
              fill
              className="object-cover filter blur-sm scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-xl md:text-2xl font-mono text-neutral-500 mb-4">
            Got an idea?
          </h2>
          <p className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
            Let&apos;s build something <br/> 
            <span className="text-blue-500">extraordinary</span> together.
          </p>
        </div>

        <div className="flex flex-col items-start">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="contact-link group relative block w-full border-t border-neutral-800 py-10 md:py-16 transition-colors duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`flex justify-between items-center transition-all duration-500 ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}>
                <span className="text-5xl md:text-8xl font-bold tracking-tighter group-hover:translate-x-10 transition-transform duration-500">
                  {link.name}
                </span>
                <span className="hidden md:block text-xl font-mono text-neutral-500 group-hover:text-white group-hover:-translate-x-10 transition-all duration-500">
                  ↗
                </span>
              </div>
            </a>
          ))}
          <div className="w-full border-t border-neutral-800"></div>
        </div>
      </div>

      <footer className="absolute bottom-10 w-full text-center opacity-50 text-sm z-10">
        <p>&copy; {new Date().getFullYear()} Portfolio. Crafted with passion.</p>
      </footer>
    </section>
  );
}