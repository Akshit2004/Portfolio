"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Quote, User } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  index: number;
}

export const TestimonialCard = ({ text, name, role, index }: TestimonialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-white/10 shadow-2xl">
        {/* Spotlight Effect */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouseX)_var(--mouseY),rgba(255,255,255,0.06),transparent_80%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            // @ts-ignore
            "--mouseX": `${(mouseX.get() + 0.5) * 100}%`,
            "--mouseY": `${(mouseY.get() + 0.5) * 100}%`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <Quote className="w-10 h-10 text-primary/20 mb-6" />
          
          <p className="text-lg text-foreground/80 leading-relaxed mb-8 italic text-balance">
            "{text}"
          </p>

          <div className="mt-auto flex items-center gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 bg-primary/5">
              <User className="w-6 h-6 text-primary/40" />
            </div>
            <div>
              <h4 className="font-bold text-foreground leading-tight">{name}</h4>
              <p className="text-sm text-foreground/50">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
