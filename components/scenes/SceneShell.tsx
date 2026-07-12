"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { sceneVariants } from "@/lib/sceneTransition";

export default function SceneShell({
  children,
  custom,
}: {
  children: ReactNode;
  custom: 1 | -1;
}) {
  return (
    <motion.section
      custom={custom}
      variants={sceneVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 overflow-hidden px-6 md:px-16 flex flex-col justify-center"
    >
      <div className="w-full max-w-6xl mx-auto my-auto py-16 md:py-24 shrink-0">
        {children}
      </div>
    </motion.section>
  );
}
