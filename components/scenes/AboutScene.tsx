"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { profile, skills } from "@/data/content";

const fragments = [
  {
    label: "Origin",
    body: "Based in Lahore, Pakistan. Studying Software Engineering while shipping production code in parallel.",
  },
  {
    label: "Focus",
    body: "Full-Stack Development & Real-Time Systems, where complex problems become elegant products"
  },
  {
    label: "Workflow",
    body: "Builds with AI as real engineering leverage, using Claude for planning and architecture, Cursor for implementation, tmux for parallel development workflows, and Herdr to coordinate multiple AI agents."
  },
  {
    label: "Off-console",
    body: "Cricket, sketching, and reading. Thinks in first principles over frameworks, values depth over trends, and enjoys breaking down complex problems into simple, practical solutions.",
  },
];

export default function AboutScene() {
  return (
    <div className="grid md:grid-cols-[1fr_1.3fr] gap-10 items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-aqua">
          02 — About
        </span>
        <h2 className="font-display font-700 text-4xl md:text-5xl mt-4 leading-tight text-frost">
          Fragments,
          <br />
          not a bio.
        </h2>
        <p className="text-soft-gray mt-6 text-sm leading-relaxed max-w-sm">
          {profile.bio}
        </p>
        <div className="flex flex-wrap gap-2 mt-8">
          {[...skills.core, ...skills.growing, ...skills.tools].map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full glass text-soft-gray"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {fragments.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.15 + i * 0.1,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <GlassCard className="p-6 h-full">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-aqua/80">
                {f.label}
              </span>
              <p className="text-frost/90 text-sm leading-relaxed mt-3">{f.body}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
