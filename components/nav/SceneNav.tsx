"use client";

import { motion } from "framer-motion";
import { scenes } from "@/data/content";

export default function SceneNav({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      {/* Top-left identity mark */}
      <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-soft-gray">
        <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
        <span className="text-frost/70">Sulyman Khalil</span>
      </div>

      {/* Top-right: on-air style scene readout */}
      <div className="fixed top-6 right-6 md:top-8 md:right-10 z-50 font-mono text-[11px] tracking-[0.25em] uppercase text-soft-gray text-right">
        <span className="text-aqua/80">{String(index + 1).padStart(2, "0")}</span>
        <span className="mx-1 text-soft-gray/50">/</span>
        <span>{String(scenes.length).padStart(2, "0")}</span>
      </div>

      {/* Bottom "lower third" broadcast console — the signature nav element */}
      <nav
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-full px-2 py-2 flex items-center gap-1"
        aria-label="Scene navigation"
      >
        {scenes.map((s, i) => (
          <button
            key={s.id}
            data-cursor-hover
            onClick={() => onSelect(i)}
            className="relative px-4 py-2 rounded-full text-[11px] font-mono tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ color: i === index ? "var(--space-black)" : "var(--soft-gray)" }}
            aria-current={i === index ? "true" : undefined}
          >
            {i === index && (
              <motion.span
                layoutId="scene-pill"
                className="absolute inset-0 rounded-full bg-aqua"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{s.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
