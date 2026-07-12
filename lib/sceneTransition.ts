import type { Variants } from "framer-motion";

export const sceneVariants: Variants = {
  enter: (dir: 1 | -1) => ({
    opacity: 0,
    scale: 0.94,
    y: dir === 1 ? 40 : -40,
    filter: "blur(18px)",
  }),
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.5 },
    },
  },
  exit: (dir: 1 | -1) => ({
    opacity: 0,
    scale: 1.05,
    y: dir === 1 ? -40 : 40,
    filter: "blur(18px)",
    transition: { duration: 0.55, ease: [0.7, 0, 0.84, 0] },
  }),
};

export const staggerParent: Variants = {
  center: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export const fadeUp: Variants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
