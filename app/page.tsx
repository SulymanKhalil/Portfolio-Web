"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import BootSequence from "@/components/loader/BootSequence";
import AmbientBackground from "@/components/ui/AmbientBackground";
import SceneNav from "@/components/nav/SceneNav";
import SceneShell from "@/components/scenes/SceneShell";
import DevMode from "@/components/ui/DevMode";
import HomeScene from "@/components/scenes/HomeScene";
import AboutScene from "@/components/scenes/AboutScene";
import ProjectsScene from "@/components/scenes/ProjectsScene";
import ExperienceScene from "@/components/scenes/ExperienceScene";
import SkillsScene from "@/components/scenes/SkillsScene";
import ContactScene from "@/components/scenes/ContactScene";
import { useSceneNavigation } from "@/lib/useSceneNavigation";
import { scenes } from "@/data/content";

type ScenePropsMap = { onNavigate: (id: string) => void };
const SCENE_COMPONENTS: Record<string, React.ComponentType<Partial<ScenePropsMap>>> = {
  home: HomeScene,
  about: AboutScene,
  projects: ProjectsScene,
  experience: ExperienceScene,
  skills: SkillsScene,
  contact: ContactScene,
};

export default function Home() {
  const [booted, setBooted] = useState(false);
  const { index, direction, goTo } = useSceneNavigation();
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Secret developer mode trigger: Ctrl+Shift+D
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        window.dispatchEvent(new CustomEvent("open-dev-mode"));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ActiveScene = SCENE_COMPONENTS[scenes[index].id];

  function navigateById(id: string) {
    const i = scenes.findIndex((s) => s.id === id);
    if (i >= 0) goTo(i);
  }

  // Mobile screen block overlay
  if (width !== null && width < 900) {
    return (
      <main className="w-screen h-screen bg-space-black flex items-center justify-center p-6 text-frost overflow-hidden font-body relative">
        <div className="noise-layer" />

        {/* Subtle background glow effect behind the card */}
        <div className="absolute w-[300px] h-[300px] rounded-full bg-aqua/5 blur-[120px] pointer-events-none" />

        <div className="glass-strong rounded-3xl p-8 md:p-10 max-w-md w-full text-center border border-white/10 flex flex-col items-center gap-6 relative z-10 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-aqua shadow-inner relative">
            <div className="absolute inset-0 rounded-full bg-aqua/10 blur-md opacity-50" />
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-3xl relative z-10 text-red-500" />
          </div>

          <div className="space-y-4">
            <h1 className="font-display font-700 text-2xl text-frost leading-tight tracking-tight">
              Desktop Experience Required!
            </h1>
            <p className="text-sm text-soft-gray leading-relaxed font-600 text-aqua/90">
              Please view this page on a desktop or a device with a wider viewport to experience the full features.
            </p>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 pt-6 border-t border-white/10 font-mono text-xs">
            <div className="glass rounded-xl p-4 flex flex-col items-center border border-white/5">
              <span className="text-[10px] text-soft-gray/60 uppercase tracking-widest mb-1.5">
                Current Width
              </span>
              <span className="text-aqua font-600 text-base">{width}px</span>
            </div>
            <div className="glass rounded-xl p-4 flex flex-col items-center border border-white/5">
              <span className="text-[10px] text-soft-gray/60 uppercase tracking-widest mb-1.5">
                Required Width
              </span>
              <span className="text-frost font-600 text-base">900px</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      {booted && (
        <>
          <AmbientBackground />
          <SceneNav index={index} onSelect={goTo} />
          <DevMode />

          <div className="relative w-full h-full">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <SceneShell key={scenes[index].id} custom={direction}>
                <ActiveScene onNavigate={navigateById} />
              </SceneShell>
            </AnimatePresence>
          </div>
        </>
      )}
    </main>
  );
}
