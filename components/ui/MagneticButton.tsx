"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  target,
  rel,
  download,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  download?: boolean | string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium font-body tracking-wide transition-colors duration-300";
  const styles = {
    primary: "bg-aqua text-space-black hover:bg-frost",
    secondary: "glass text-frost hover:border-aqua/50",
    ghost: "text-soft-gray hover:text-frost",
  }[variant];

  const Comp = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block"
      data-cursor-hover
    >
      <Comp
        href={href}
        onClick={onClick}
        type={href ? undefined : type}
        disabled={href ? undefined : disabled}
        target={target || (href?.startsWith("http") ? "_blank" : undefined)}
        rel={rel || (href?.startsWith("http") ? "noopener noreferrer" : undefined)}
        download={download}
        className={`${base} ${styles} ${className} ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
