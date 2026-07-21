"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCircleCheck,
  faCircleExclamation,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile } from "@/data/content";

type Status = "idle" | "encrypting" | "securing" | "routing" | "delivered" | "error";

const STATUS_LABEL: Record<Status, string> = {
  idle: "",
  encrypting: "Encrypting…",
  securing: "Securing…",
  routing: "Routing…",
  delivered: "Delivered.",
  error: "Transmission failed — try again.",
};

export default function ContactScene() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "idle" && status !== "error" && status !== "delivered") return;

    setStatus("encrypting");
    await wait(500);
    setStatus("securing");
    await wait(500);
    setStatus("routing");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          device: navigator.userAgent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("delivered");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  const busy = ["encrypting", "securing", "routing"].includes(status);

  return (
    <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-aqua">
          06 — Contact
        </span>
        <h2 className="font-display font-700 text-4xl md:text-5xl mt-4 mb-6 text-frost">
          Open a channel.
        </h2>
        <p className="text-soft-gray text-sm leading-relaxed max-w-sm">
          Direct line — no forms disappearing into a void. Every message routes
          straight to my inbox.
        </p>
        <div className="mt-8 space-y-4 font-mono text-xs text-soft-gray">
          <p className="flex items-center gap-4">
            <span className="w-5 flex justify-center text-aqua shrink-0">
              <FontAwesomeIcon icon={faEnvelope} size="sm" />
            </span>
            <a href={`mailto:${profile.email}`} className="hover:text-aqua transition-colors">
              {profile.email}
            </a>
          </p>
          <p className="flex items-center gap-4">
            <span className="w-5 flex justify-center text-aqua shrink-0">
              <FontAwesomeIcon icon={faGithub} size="sm" />
            </span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-aqua transition-colors">
              {profile.github.replace("https://", "")}
            </a>
          </p>
          <p className="flex items-center gap-4">
            <span className="w-5 flex justify-center text-aqua shrink-0">
              <FontAwesomeIcon icon={faLinkedin} size="sm" />
            </span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-aqua transition-colors">
              {profile.linkedin.replace("https://", "")}
            </a>
          </p>
          <p className="flex items-center gap-4">
            <span className="w-5 flex justify-center text-aqua shrink-0">
              <FontAwesomeIcon icon={faLocationDot} size="sm" />
            </span>
            <span>{profile.location}</span>
          </p>
          <p className="flex items-center gap-4">
            <span className="w-5 flex justify-center text-aqua shrink-0">
              <FontAwesomeIcon icon={faPhone} size="sm" />
            </span>
            <a href={`https://wa.me/${profile.contact.replace(/\D/g, "")}`} target="_blank"
              rel="noopener noreferrer" className="hover:text-aqua transition-colors">
              {profile.contact}
            </a>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlassCard strong className="p-6 md:p-8" tilt={false}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
              />
            </div>
            <Field
              label="Subject"
              value={form.subject}
              onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
              required
            />
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase text-soft-gray/70">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full mt-2 bg-transparent border-b border-white/15 focus:border-aqua outline-none py-2 text-sm text-frost resize-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <AnimatePresence mode="wait">
                {status !== "idle" && (
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`font-mono text-xs flex items-center gap-2 ${status === "error" ? "text-red-400" : "text-aqua"
                      }`}
                  >
                    {status === "delivered" && <FontAwesomeIcon icon={faCircleCheck} />}
                    {status === "error" && <FontAwesomeIcon icon={faCircleExclamation} />}
                    {STATUS_LABEL[status]}
                  </motion.span>
                )}
                {status === "idle" && <span />}
              </AnimatePresence>

              <MagneticButton variant="primary" type="submit" disabled={busy}>
                <FontAwesomeIcon icon={faPaperPlane} size="sm" />
                {busy ? "Sending…" : "Send message"}
              </MagneticButton>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest uppercase text-soft-gray/70">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 bg-transparent border-b border-white/15 focus:border-aqua outline-none py-2 text-sm text-frost transition-colors"
      />
    </div>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
