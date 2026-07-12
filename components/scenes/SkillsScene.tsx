"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript"],
  },
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Angular",
      "Umi.js",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Ant Design",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Nest.js"],
  },
  {
    title: "Mobile Development",
    skills: ["React Native"],
  },
  {
    title: "State Management",
    skills: ["Redux Toolkit"],
  },
  {
    title: "Video Streaming",
    skills: ["WebRTC", "FFmpeg"],
  },
  {
    title: "AI-Assisted Development",
    skills: [
      "tmux",
      "Herdr",
      "Prompt Engineering",
      "Context Engineering",
      "Loop Engineering",
      "Claude",
      "Cursor",
    ],
  },
];

export default function SkillsScene() {
  return (
    <div className="flex flex-col max-h-[70vh] md:max-h-[75vh] w-full">
      {/* Fixed Header */}
      <div className="shrink-0 pb-6 z-10 bg-space-black/80 backdrop-blur-sm">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-aqua"
        >
          03 — Skills
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display font-700 text-4xl md:text-5xl mt-2 text-frost"
        >
          Technical Capabilities.
        </motion.h2>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 pr-2 pb-16 scrollbar-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + index * 0.05,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={category.title === "AI-Assisted Development" || category.title === "Frontend" ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <GlassCard className="p-6 h-full flex flex-col justify-between" tilt={true}>
                <div>
                  <h3 className="font-display font-600 text-lg text-frost mb-4 pb-2 border-b border-white/10">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 text-soft-gray border border-white/5 hover:border-aqua/30 hover:text-aqua transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
