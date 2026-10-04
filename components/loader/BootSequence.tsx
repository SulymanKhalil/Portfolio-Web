"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const interval = 30;
    const step = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + step + Math.random() * step * 0.5;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => setExiting(true), 300);
    return () => clearTimeout(t);
  }, [progress]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(onDone, 600);
    return () => clearTimeout(t);
  }, [exiting, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-space-black"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-700 text-2xl tracking-tight text-frost"
        >
          Portfolio{" "}
          <span className="text-aqua">•</span>{" "}
          Sulyman
        </motion.span>

        <div className="w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--aqua), var(--electric-blue))",
            }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-soft-gray"
        >
          Loading
        </motion.span>
      </div>
    </motion.div>
  );
}
