"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
  strong = false,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  function onMouseMove(e: React.MouseEvent) {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set((0.5 - py) * 8);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }
  function onMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  const background = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(77,232,214,0.10), transparent 60%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      className={`relative rounded-2xl ${strong ? "glass-strong" : "glass"} ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
