"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AmbientBackground() {
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-space-black">
      <motion.div
        className="absolute w-[70vw] h-[70vw] rounded-full opacity-30 blur-[120px]"
        style={{
          left: smx,
          top: smy,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, var(--royal-purple) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full opacity-25 blur-[110px]"
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["0%", "8%", "0%"],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          right: "-10%",
          top: "-10%",
          background: "radial-gradient(circle, var(--electric-blue) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute w-[45vw] h-[45vw] rounded-full opacity-20 blur-[100px]"
        animate={{
          x: ["0%", "-12%", "0%"],
          y: ["0%", "10%", "0%"],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          left: "-10%",
          bottom: "-15%",
          background: "radial-gradient(circle, var(--aqua) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--space-black)_75%)]" />
    </div>
  );
}
