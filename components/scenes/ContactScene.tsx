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
import {
  validateContactForm,
  isFormValid,
  type ContactFormData,
  type ValidationErrors,
} from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactScene() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function updateField(field: keyof ContactFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    // Clear the error for this field as user types
    if (errors[field]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    // Validate all fields
    const validationErrors = validateContactForm(form);
    setErrors(validationErrors);
    if (!isFormValid(validationErrors)) return;

    setStatus("sending");

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
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-start md:items-center">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => updateField("name", v)}
                error={errors.name}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                error={errors.email}
              />
            </div>
            <Field
              label="Subject"
              value={form.subject}
              onChange={(v) => updateField("subject", v)}
              error={errors.subject}
            />
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase text-soft-gray/70">
                Message
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className={`w-full mt-2 bg-transparent border-b outline-none py-2 text-sm text-frost resize-none transition-colors ${
                  errors.message ? "border-red-400" : "border-white/15 focus:border-aqua"
                }`}
              />
              <div className="min-h-[20px] pt-1">
                {errors.message && (
                  <p className="text-red-400 text-[11px] font-mono leading-tight">{errors.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <AnimatePresence mode="wait">
                {status === "sending" && (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="font-mono text-xs text-aqua"
                  >
                    Sending…
                  </motion.span>
                )}
                {status === "sent" && (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="font-mono text-xs text-aqua flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faCircleCheck} /> Sent.
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="font-mono text-xs text-red-400 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} /> Failed — try again.
                  </motion.span>
                )}
                {status === "idle" && <span />}
              </AnimatePresence>

              <MagneticButton variant="primary" type="submit" disabled={status === "sending"}>
                <FontAwesomeIcon icon={faPaperPlane} size="sm" />
                {status === "sending" ? "Sending…" : "Send message"}
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
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest uppercase text-soft-gray/70">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-2 bg-transparent border-b outline-none py-2 text-sm text-frost transition-colors ${
          error ? "border-red-400" : "border-white/15 focus:border-aqua"
        }`}
      />
      <div className="min-h-[20px] pt-1">
        {error && (
          <p className="text-red-400 text-[11px] font-mono leading-tight">{error}</p>
        )}
      </div>
    </div>
  );
}
