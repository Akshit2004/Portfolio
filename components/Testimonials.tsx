"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

const testimonials = [
  {
    text: "Akshit modernized the Aaradhya Trust platform, integrating Razorpay and building a secure admin dashboard. His work boosted our donation conversions by 25% and delivered a world-class digital presence.",
    name: "Balachandiran",
    role: "Founder, TenSketch",
  },
  {
    text: "The ServiceBridge ticketing system Akshit built has been a game-changer for Eon Infotech. By centralizing communication and automating triage, he helped us reduce our response times by 40%.",
    name: "Amit Khanna",
    role: "Director, Eon Infotech",
  },
  {
    text: "Flowcept's high-performance Kanban board is incredibly fast. The real-time synchronization across our team's devices has streamlined our sprint planning, saving us hours every week.",
    name: "Sarah Chen",
    role: "Product Lead, TechFlow",
  },
  {
    text: "As a developer, I appreciate tools that don't get in the way. Flowcept's drag-and-drop handles hundreds of items without a hitch, and the dark-mode UI is perfect for deep focus work.",
    name: "David Miller",
    role: "Engineering Manager",
  },
  {
    text: "We switched to Flowcept and saw a 30% reduction in our team's task management overhead. The clarity and speed it provides for agile teams is unmatched in the project management space.",
    name: "Emily Rodriguez",
    role: "Full-Stack Dev @ Pulse",
  },
  {
    text: "The real-time collaboration on Flowcept is seamless. Seeing task updates happen instantly across the board has improved our coordination and eliminated status update meetings.",
    name: "Michael Park",
    role: "Senior Developer",
  },
];

const colors = ["bg-pink", "bg-yellow", "bg-blue", "bg-mint", "bg-purple", "bg-orange"];

function Card({ index, depth, onSwipe }: { index: number; depth: number; onSwipe: () => void }) {
  const t = testimonials[index];
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-20, 20]);
  const top = depth === 0;

  return (
    <motion.figure
      className={`brut absolute inset-0 flex flex-col justify-between rounded-[2rem] p-8 md:p-10 ${colors[index % colors.length]} ${
        top ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      style={{ x, rotate: top ? rotate : undefined, zIndex: 10 - depth }}
      animate={{ scale: 1 - depth * 0.06, y: depth * 22, rotate: top ? undefined : index % 2 ? 4 : -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      drag={top ? "x" : false}
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 600) onSwipe();
      }}
      whileDrag={{ scale: 1.04 }}
    >
      <blockquote className="font-display text-lg leading-snug font-semibold select-none md:text-xl">
        <span className="block text-6xl leading-none">&ldquo;</span>
        {t.text}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 select-none">
        <span className="brut-sm flex h-12 w-12 items-center justify-center rounded-full bg-white font-display text-xl font-extrabold">
          {t.name[0]}
        </span>
        <span>
          <span className="block font-display text-lg font-bold">{t.name}</span>
          <span className="block text-sm opacity-75">{t.role}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function Testimonials() {
  const [order, setOrder] = useState(() => testimonials.map((_, i) => i));
  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  return (
    <section className="overflow-hidden px-4 py-32 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="brut-sm mb-6 inline-block rounded-full bg-white px-4 py-1 font-display text-sm font-semibold">Kind words</p>
          <h2 className="font-display text-6xl leading-[0.9] font-extrabold tracking-tight md:text-7xl">
            People I&apos;ve built with 💬
          </h2>
          <p className="mt-6 max-w-sm text-lg">Swipe the cards, or use the buttons.</p>
          <div className="mt-8 flex items-center gap-4">
            <button onClick={prev} aria-label="Previous testimonial" className="brut-sm press h-14 w-14 rounded-full bg-white font-display text-2xl font-bold">
              ←
            </button>
            <button onClick={next} aria-label="Next testimonial" className="brut-sm press h-14 w-14 rounded-full bg-yellow font-display text-2xl font-bold">
              →
            </button>
            <span className="font-display text-lg font-bold" aria-live="polite">
              {order[0] + 1} / {testimonials.length}
            </span>
          </div>
        </div>

        <div className="relative mx-auto h-[26rem] w-full max-w-md md:h-[28rem]">
          {order
            .slice(0, 3)
            .map((idx, depth) => <Card key={idx} index={idx} depth={depth} onSwipe={next} />)
            .reverse()}
        </div>
      </div>
    </section>
  );
}
