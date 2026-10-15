"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { id: "top", label: "Home", color: "bg-yellow" },
  { id: "about", label: "About", color: "bg-pink" },
  { id: "work", label: "Work", color: "bg-blue" },
  { id: "experience", label: "Journey", color: "bg-mint" },
  { id: "contact", label: "Contact", color: "bg-orange" },
];

export default function Nav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 1.2 }}
      className="brut-sm fixed top-4 left-1/2 z-50 flex items-center gap-1 rounded-full bg-white p-1.5"
    >
      {links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className="relative rounded-full px-3 py-1.5 font-display text-sm font-semibold md:px-4"
        >
          {active === l.id && (
            <motion.span
              layoutId="nav-pill"
              className={`absolute inset-0 rounded-full border-2 border-ink ${l.color}`}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            />
          )}
          <span className="relative">{l.label}</span>
        </a>
      ))}
    </motion.nav>
  );
}
