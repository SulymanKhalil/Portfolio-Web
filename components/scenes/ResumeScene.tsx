"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPrint,
  faExpand,
  faShareNodes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile, skills } from "@/data/content";

const RESUME_PATH = "/resume.pdf";
const LAST_UPDATED = "July 2026";

export default function ResumeScene() {
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [shared, setShared] = useState(false);

  function handleDownload() {
    setDownloading(true);
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = RESUME_PATH;
      a.download = "Sulyman-Khalil-Resume.pdf";
      a.click();
      setDownloading(false);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    }, 900);
  }

  function handlePrint() {
    const w = window.open(RESUME_PATH, "_blank");
    w?.addEventListener("load", () => w.print());
  }

  async function handleShare() {
    const url = `${window.location.origin}${RESUME_PATH}`;
    if (navigator.share) {
      await navigator.share({ title: "Sulyman Khalil — Resume", url });
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1600);
    }
  }

  return (
    <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-aqua">
          05 — Resume
        </span>
        <h2 className="font-display font-700 text-4xl md:text-5xl mt-4 mb-6 text-frost">
          The full transmission.
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
          <InfoRow label="Location" value={profile.location} />
          <InfoRow label="Availability" value={profile.availability} />
          <InfoRow label="Core stack" value={skills.core.slice(0, 2).join(", ")} />
          <InfoRow label="Last updated" value={LAST_UPDATED} />
        </div>

        <div className="flex flex-wrap gap-3">
          <MagneticButton variant="primary" onClick={handleDownload}>
            <FontAwesomeIcon icon={done ? faCheck : faDownload} size="sm" />
            {downloading ? "Preparing…" : done ? "Downloaded" : "Download PDF"}
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} size="sm" /> Print
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={handleShare}>
            <FontAwesomeIcon icon={shared ? faCheck : faShareNodes} size="sm" />
            {shared ? "Link copied" : "Share"}
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlassCard strong className="p-3 relative" tilt={false}>
          <button
            data-cursor-hover
            onClick={() => setFullscreen(true)}
            className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full glass flex items-center justify-center text-soft-gray hover:text-aqua"
            aria-label="Fullscreen preview"
          >
            <FontAwesomeIcon icon={faExpand} size="xs" />
          </button>
          <div className="rounded-xl overflow-hidden bg-frost/5 aspect-[3/4]">
            <iframe
              src={`${RESUME_PATH}#toolbar=0&view=FitH`}
              title="Resume preview"
              className="w-full h-full"
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* download tray animation */}
      <AnimatePresence>
        {downloading && (
          <motion.div
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[70] glass-strong rounded-full px-5 py-3 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-aqua"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <span className="font-mono text-xs uppercase tracking-widest text-frost/90">
              Moving to download tray…
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[75] bg-space-black/90 backdrop-blur-md flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
          >
            <motion.div
              className="w-full max-w-3xl h-[85vh] glass-strong rounded-2xl overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe src={RESUME_PATH} title="Resume fullscreen" className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-widest uppercase text-soft-gray/70">
        {label}
      </p>
      <p className="text-sm text-frost mt-1">{value}</p>
    </div>
  );
}
