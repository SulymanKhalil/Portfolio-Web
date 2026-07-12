"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { experience } from "@/data/content";

export default function ExperienceScene() {
  return (
    <div>
      <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-aqua">
        05 — Experience
      </span>
      <h2 className="font-display font-700 text-4xl md:text-5xl mt-4 mb-10 text-frost">
        Where it&apos;s been built.
      </h2>

      <div className="flex flex-col gap-6">
        {experience.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard className="p-7 md:p-8" tilt={false}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="font-display font-600 text-2xl text-frost">{e.company}</h3>
                  <p className="text-aqua font-mono text-sm uppercase tracking-wide mt-1">
                    {e.role}
                  </p>
                  <p className="text-soft-gray text-xs mt-1">{e.location}</p>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full glass text-soft-gray self-start">
                  {e.period}
                </span>
              </div>

              <ul className="mt-5 space-y-2">
                {e.responsibilities.map((r) => (
                  <li key={r} className="text-sm text-frost/80 flex gap-2 leading-relaxed">
                    <span className="text-aqua mt-1.5 w-1 h-1 rounded-full bg-aqua shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>

              {e.achievements.length > 0 && (
                <div className="mt-4 pl-3 border-l-2 border-royal-purple/40">
                  {e.achievements.map((a) => (
                    <p key={a} className="text-sm text-soft-gray italic leading-relaxed">
                      {a}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 mt-5">
                {e.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 text-soft-gray"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
