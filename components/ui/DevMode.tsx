"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const STACK = [
  "Next.js 16 (App Router)",
  "TypeScript",
  "Tailwind CSS v4",
  "Framer Motion",
  "Font Awesome",
  "Resend + Route Handlers",
  "Netlify",
];

const NOTES = [
  "Scroll is fully hijacked — wheel/touch/keyboard drive a scene index, not a scroll position.",
  "Scene transitions are blur + scale + directional translate, choreographed via a single shared variants object.",
  "The cursor renders in a separate fixed layer above everything and disables on touch devices.",
  "The boot sequence uses a signal/broadcast metaphor instead of generic particles — it's the one deliberate risk in the design.",
  "Resume PDF is generated from the same structured content the site itself renders from — one source of truth.",
];

export default function DevMode() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler() {
      setOpen((o) => !o);
    }
    window.addEventListener("open-dev-mode", handler);
    return () => window.removeEventListener("open-dev-mode", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-space-black/95 backdrop-blur-xl overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="max-w-2xl mx-auto px-6 py-16">
            <button
              data-cursor-hover
              onClick={() => setOpen(false)}
              className="fixed top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-soft-gray hover:text-frost"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-aqua">
              Developer Mode
            </span>
            <h2 className="font-display font-700 text-4xl text-frost mt-4 mb-8">
              You found the secret room.
            </h2>

            <h3 className="font-mono text-[10px] tracking-widest uppercase text-soft-gray mb-3">
              Stack
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {STACK.map((s) => (
                <span key={s} className="glass rounded-full px-3 py-1.5 text-xs font-mono text-frost/90">
                  {s}
                </span>
              ))}
            </div>

            <h3 className="font-mono text-[10px] tracking-widest uppercase text-soft-gray mb-3">
              Engineering notes
            </h3>
            <ul className="space-y-3 mb-8">
              {NOTES.map((n) => (
                <li key={n} className="text-sm text-frost/80 leading-relaxed flex gap-2">
                  <span className="text-aqua mt-1.5 w-1 h-1 rounded-full bg-aqua shrink-0" />
                  {n}
                </li>
              ))}
            </ul>

            <a
              data-cursor-hover
              href="https://github.com/SulymanKhalil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-sm text-frost hover:border-aqua/40"
            >
              <FontAwesomeIcon icon={faGithub} /> View source
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
