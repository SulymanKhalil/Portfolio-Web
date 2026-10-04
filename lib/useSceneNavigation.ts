"use client";

import { useCallback, useRef, useState } from "react";
import { scenes } from "@/data/content";

const TRANSITION_LOCK_MS = 900;

export function useSceneNavigation() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const locked = useRef(false);

  const goTo = useCallback((next: number) => {
    if (locked.current) return;
    if (next < 0 || next > scenes.length - 1) return;
    locked.current = true;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    setTimeout(() => {
      locked.current = false;
    }, TRANSITION_LOCK_MS);
  }, [index]);

  return {
    index,
    direction,
    scene: scenes[index],
    goTo,
    isFirst: index === 0,
    isLast: index === scenes.length - 1,
  };
}
