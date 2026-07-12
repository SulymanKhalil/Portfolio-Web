# Entering Sulyman

A scene-based, glassmorphic interactive portfolio. Not a scrolling page — six full-screen
scenes (Home, About, Projects, Experience, Resume, Contact) navigated by wheel, touch,
keyboard, or the bottom console nav.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

## Before you deploy — 3 things to wire up

1. **Resend API key** (Contact scene)
   - Sign up at https://resend.com, grab an API key.
   - Set `RESEND_API_KEY` in your environment (Netlify → Site settings → Environment variables).
   - Until you verify your own domain in Resend, keep `CONTACT_FROM_EMAIL` as the default
     `onboarding@resend.dev` sender — Resend blocks sending from unverified domains.
   - Without this key set, the form still runs the full encrypt/secure/route animation but
     returns a clean "not configured yet" error instead of a silent failure.

2. **Resume content** (`/public/resume.pdf`)
   - I generated a real one-page PDF from the same data the site renders from
     (`data/content.ts`), so it's not a placeholder — but you should proofread it and swap
     in your actual dates/bullets as your CV evolves. Regenerate anytime by editing
     `data/content.ts` and re-running the resume script, or just replace the PDF directly.

3. **Developer OS link**
   - The "Open Developer OS" button on Home currently points at
     `https://sulymanlive.netlify.app`. Point it at your separate OS-style portfolio once
     that exists — right now it opens your existing portfolio site instead.

## Structure

```
app/
  page.tsx              — orchestrates boot → scenes → nav → cursor
  api/contact/route.ts   — Resend email send, server-side validated
components/
  loader/BootSequence.tsx   — signal/broadcast boot sequence (the signature moment)
  cursor/CustomCursor.tsx   — reactive custom cursor, disabled on touch
  scenes/*                  — one component per scene
  nav/SceneNav.tsx           — bottom "console" nav + top HUD readout
  ui/*                       — GlassCard, MagneticButton, AmbientBackground, DevMode
lib/
  useSceneNavigation.ts   — wheel/touch/keyboard scene index controller
  sceneTransition.ts      — shared framer-motion transition variants
data/content.ts           — single source of truth for projects/experience/skills/bio
```

## Easter egg

`Ctrl + Shift + D` opens Developer Mode — stack, architecture notes, source link.

## Deploy (Netlify)

Push to GitHub, connect the repo in Netlify. `netlify.toml` is already set up with the
official Next.js runtime plugin — no manual config needed beyond the env vars above.

## Known gaps (by design, not oversight)

- Project `live` demo links are empty for projects you haven't deployed publicly yet —
  fill in `data/content.ts` as those go live.
- Accessibility: scroll-hijacking is inherently a tradeoff. Keyboard nav (arrow keys,
  PageUp/PageDown) and the bottom nav both work as a non-scroll-dependent path through
  the site, and `prefers-reduced-motion` is respected globally in `globals.css`.
