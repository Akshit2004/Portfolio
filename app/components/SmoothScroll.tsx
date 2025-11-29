"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth vertical scrolling and integrates it with GSAP ScrollTrigger for the component subtree.
 *
 * Sets up a Lenis instance with custom easing and duration, subscribes ScrollTrigger updates to Lenis scroll events,
 * attaches a GSAP ticker callback that drives Lenis's RAF, and cleans up all listeners and the Lenis instance on unmount.
 *
 * @param children - The elements to render inside the smooth-scroll context
 * @returns The rendered `children` wrapped in a fragment
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}