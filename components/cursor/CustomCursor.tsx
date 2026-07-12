"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [variant, setVariant] = useState<"default" | "hover" | "press">("default");
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConf = { damping: 28, stiffness: 400, mass: 0.4 };
  const x = useSpring(mouseX, springConf);
  const y = useSpring(mouseY, springConf);

  const trailX = useSpring(mouseX, { damping: 34, stiffness: 140, mass: 0.7 });
  const trailY = useSpring(mouseY, { damping: 34, stiffness: 140, mass: 0.7 });

  const raf = useRef<number | null>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!visible) setVisible(true);
        const target = e.target as HTMLElement;
        const interactive = target.closest(
          "[data-cursor-hover], button, a, [role='button']"
        );
        setVariant(interactive ? "hover" : "default");
      });
    }
    function onDown() { setVariant("press"); }
    function onUp() {
      setVariant((v) => (v === "press" ? "default" : v));
    }
    function onLeave() { setVisible(false); }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mouseX, mouseY, visible]);

  const size = variant === "hover" ? 56 : variant === "press" ? 20 : 14;

  return (
    <div className="cursor-layer pointer-events-none fixed inset-0 z-[70]" aria-hidden>
      <motion.div
        className="absolute rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 34,
          height: 34,
          border: "1px solid var(--glass-border-bright)",
          opacity: visible ? 0.55 : 0,
        }}
        animate={{ opacity: visible ? 0.55 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
          background:
            variant === "hover"
              ? "radial-gradient(circle at 35% 30%, rgba(77,232,214,0.35), rgba(77,232,214,0.06) 70%)"
              : "var(--aqua)",
          border: variant === "hover" ? "1px solid rgba(77,232,214,0.5)" : "none",
          boxShadow: variant === "default" ? "0 0 12px rgba(77,232,214,0.6)" : "none",
        }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 26, stiffness: 420 }}
      />
    </div>
  );
}
