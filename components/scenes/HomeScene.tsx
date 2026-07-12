"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile } from "@/data/content";

export default function HomeScene({
  onNavigate,
}: {
  onNavigate?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 font-mono text-[11px] tracking-[0.35em] uppercase text-aqua"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-aqua" />
        On air — {profile.availability}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-800 text-[13vw] leading-[0.95] md:text-[7.2vw] tracking-tight text-gradient"
      >
        Signal, not
        <br />
        static.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl text-base md:text-lg text-soft-gray leading-relaxed"
      >
        {profile.name} — {profile.title} Building digital products where
        thoughtful engineering meets meaningful experiences. From web to mobile,
        I turn ambitious ideas into production-ready software at MultiConnect
        Horizon.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-center gap-4 mt-2"
      >
        <MagneticButton
          variant="primary"
          onClick={() => onNavigate?.("projects")}
        >
          Explore My Work
        </MagneticButton>
        <MagneticButton variant="secondary" href="/Sulyman_Khalil_Resume.pdf" download="Sulyman_Khalil_Resume.pdf">
          Resume
        </MagneticButton>
        <MagneticButton variant="ghost" href="https://my-os.netlify.app/">
          Open Developer OS ↗
        </MagneticButton>
      </motion.div>
    </div>
  );
}
