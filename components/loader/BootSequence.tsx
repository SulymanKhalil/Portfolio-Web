"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOG_LINES = [
  "establishing uplink",
  "calibrating signal",
  "loading glass layers",
  "compositing light",
  "syncing typography",
  "transmission ready",
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (lineIndex >= LOG_LINES.length) {
      const t = setTimeout(() => setExiting(true), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 320);
    return () => clearTimeout(t);
  }, [lineIndex]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [exiting, onDone]);

  const progress = Math.min(100, Math.round((lineIndex / LOG_LINES.length) * 100));

  return (
    <AnimatePresence>
      {
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-space-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ pointerEvents: exiting ? "none" : "auto" }}
        >
          {/* signal scan sweep */}
          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(77,232,214,0.09), transparent 60%)",
            }}
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 scanline opacity-60" />

          <div className="relative flex flex-col items-center gap-8 px-6">
            {/* frequency bars forming into a mark */}
            <div className="flex items-end gap-[3px] h-14">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    background:
                      i % 3 === 0 ? "var(--aqua)" : "var(--electric-blue)",
                  }}
                  initial={{ height: 4, opacity: 0.3 }}
                  animate={{
                    height: [4, 6 + ((i * 37) % 42), 4 + ((i * 19) % 20)],
                    opacity: [0.3, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.1 + (i % 5) * 0.12,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.03,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-soft-gray">
              <span className="text-frost/80">Entering Sulyman</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={lineIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-aqua/90"
                >
                  {LOG_LINES[Math.min(lineIndex, LOG_LINES.length - 1)]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="w-56 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--aqua), var(--electric-blue))",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
