"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects } from "@/data/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ProjectsScene() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId);

  return (
    <LayoutGroup>
      <div className="flex flex-col max-h-[70vh] md:max-h-[75vh] w-full">
        {/* Fixed Header */}
        <div className="shrink-0 pb-6 z-10 bg-space-black/80 backdrop-blur-sm">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-aqua"
          >
            04 — Projects
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display font-700 text-4xl md:text-5xl mt-2 text-frost"
          >
            Digital artifacts.
          </motion.h2>
        </div>

        {/* Scrollable Content: 3 columns in a row */}
        <div className="overflow-y-auto flex-1 pr-2 pb-16 scrollbar-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                layoutId={`card-${p.id}`}
                onClick={() => setOpenId(p.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between p-5 md:p-6 glass rounded-2xl hover:border-aqua/40 transition-all duration-300 cursor-pointer text-left group h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-600 text-lg md:text-xl text-frost group-hover:text-aqua transition-colors duration-300">
                      {p.name}
                    </h3>
                    {"year" in p && (p as any).year && (
                      <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 text-soft-gray/80 shrink-0">
                        {(p as any).year}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-soft-gray/90 font-mono uppercase tracking-wide mt-1">
                    {p.tag}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-soft-gray border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 shrink-0">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-aqua hover:underline">
                    View details
                  </span>

                  {((p as any).links.github || (p as any).links.live) && (
                    <a
                      href={(p as any).links.live || (p as any).links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-8 h-8 rounded-full glass hover:border-aqua/50 flex items-center justify-center text-soft-gray hover:text-aqua transition-all duration-300"
                      title="Open project link"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-modal-open="true"
            className="fixed inset-0 z-[45] flex items-center justify-center p-4 md:p-6 pb-28 md:pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-space-black/80 backdrop-blur-sm"
              onClick={() => setOpenId(null)}
            />
            <motion.div
              layoutId={`card-${open.id}`}
              className="relative glass-strong rounded-3xl p-6 md:p-10 max-w-2xl w-full"
            >
              <button
                onClick={() => setOpenId(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full glass flex items-center justify-center text-soft-gray hover:text-frost"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faXmark} size="sm" />
              </button>

              {"year" in open && (open as any).year && (
                <span className="font-mono text-[10px] tracking-widest uppercase text-soft-gray">
                  {(open as any).year}
                </span>
              )}
              <h3 className="font-display font-700 text-2xl md:text-3xl text-frost mt-2">{open.name}</h3>
              <p className="text-sm text-aqua font-mono uppercase tracking-wide mt-1">
                {open.tag}
              </p>
              
              {"description" in open && (open as any).description && (
                <p className="text-soft-gray mt-6 leading-relaxed text-sm md:text-base">{(open as any).description}</p>
              )}

              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                {"architecture" in open && (open as any).architecture && (
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase text-aqua/80 mb-2">
                      Architecture
                    </h4>
                    <p className="text-sm text-frost/85 leading-relaxed">{(open as any).architecture}</p>
                  </div>
                )}
                {"challenge" in open && (open as any).challenge && (
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase text-aqua/80 mb-2">
                      Challenge
                    </h4>
                    <p className="text-sm text-frost/85 leading-relaxed">{(open as any).challenge}</p>
                  </div>
                )}
                {"solution" in open && (open as any).solution && (
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase text-aqua/80 mb-2">
                      Solution
                    </h4>
                    <p className="text-sm text-frost/85 leading-relaxed">{(open as any).solution}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-mono text-[10px] tracking-widest uppercase text-aqua/80 mb-2">
                    Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {open.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 text-soft-gray"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {((open as any).links.github || (open as any).links.live) && (
                <div className="flex gap-3 mt-8">
                  {(open as any).links.github && (
                    <a
                      href={(open as any).links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass rounded-full px-5 py-2.5 text-sm flex items-center gap-2 hover:border-aqua/40 text-frost hover:text-aqua transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faGithub} /> Source
                    </a>
                  )}
                  {(open as any).links.live && (
                    <a
                      href={(open as any).links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-aqua text-space-black rounded-full px-5 py-2.5 text-sm flex items-center gap-2 hover:bg-aqua/80 transition-colors duration-300"
                    >
                      Live demo <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
