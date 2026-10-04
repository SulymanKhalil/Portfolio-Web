# Portfolio • Sulyman

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.42.2-black?style=flat-square&logo=framer)](https://www.framer.com/motion/)

> A scene-based, glassmorphic interactive portfolio built with Next.js App Router and Framer Motion.

**Live Demo:** [https://sulymanlive.netlify.app](https://sulymanlive.netlify.app)

---

## 🌟 Overview

An interactive portfolio featuring full-screen scenes arranged in a unified interface, navigated via a broadcast console dock:

- **01 — Home**: Introduction, availability badge, quick links, and Developer OS link.
- **02 — About**: Bio, core fragments (Origin, Focus, Workflow, Off-console), and skills tags.
- **03 — Skills**: Technical capabilities categorized by Languages, Frontend, State Management, Streaming, and AI Engineering.
- **04 — Projects**: Filterable project gallery with detailed modal overlays and smooth internal scrolling.
- **05 — Experience**: Work history, responsibilities, key achievements, and tech stacks.
- **06 — Contact**: Direct messaging channel with custom client-side validation and Resend API routing.

---

## ✨ Features

- **Scene Navigation**: Clean bottom console bar for deliberate, transition-choreographed scene switching.
- **Minimal Boot Loader**: Streamlined initial progress sequence displaying brand identity.
- **Project Detail Modals**: Interactive popup cards with architectural breakdowns, challenges, solutions, and live demo links.
- **Validated Contact System**: Dedicated form validation (`lib/validation.ts`) with zero-layout-shift error feedback, backed by Next.js API route handlers and Resend.
- **Glassmorphic Aesthetic**: Tailwind CSS v4 design tokens, ambient motion gradients, and noise overlays.
- **Developer Mode**: Built-in developer console triggerable via `Ctrl + Shift + D`.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.2.10` | Full-stack framework (App Router, Turbopack) |
| **React** | `19.2.4` | UI library |
| **TypeScript** | `^5` | Static type safety |
| **Tailwind CSS** | `^4` | Utility-first CSS framework |
| **Framer Motion** | `^12.42.2` | Scene transitions and UI animations |
| **Font Awesome** | `^7.3.0` | Vector icons |
| **Resend** | `^6.17.2` | Email delivery service |
| **Netlify Next Plugin** | `^5.15.12` | Serverless deployment runtime |

---

## 📁 Project Structure

```
├── app/
│   ├── api/contact/route.ts  # Contact form submission handler (Resend)
│   ├── globals.css           # Tailwind v4 styles, themes, and glass tokens
│   ├── layout.tsx            # Root layout, metadata & favicon setup
│   └── page.tsx              # Scene orchestrator & responsive shell
├── components/
│   ├── loader/BootSequence.tsx # Minimal startup loader
│   ├── nav/SceneNav.tsx        # Bottom console navigation dock & HUD
│   ├── scenes/                 # Scene components (Home, About, Skills, Projects, Experience, Contact)
│   └── ui/                     # Reusable glass cards, magnetic buttons, ambient lighting & dev console
├── data/
│   └── content.ts            # Single source of truth for all content & portfolio data
├── lib/
│   ├── sceneTransition.ts    # Framer Motion animation variants
│   ├── useSceneNavigation.ts # Navigation state manager
│   └── validation.ts         # Contact form validation rules & error utilities
└── public/
    ├── favicon.png           # Portfolio favicon
    └── Sulyman_Khalil_Resume.pdf # Resume document
```

---

## 🌐 Deployment

The repository is configured for zero-config deployment on **Netlify** using `netlify.toml` and `@netlify/plugin-nextjs`.

1. Push your repository to GitHub.
2. Link the repository in Netlify.
3. In **Site Configuration → Environment variables**, add your `RESEND_API_KEY`.
4. Deploy the site.

---

## 📬 Contact & Author

- **Author**: Sulyman Khalil
- **GitHub**: [@SulymanKhalil](https://github.com/SulymanKhalil)
- **Email**: [sulymankhalil.dev@gmail.com](mailto:sulymankhalil.dev@gmail.com)
- **Live Portfolio**: [https://sulymanlive.netlify.app](https://sulymanlive.netlify.app)
