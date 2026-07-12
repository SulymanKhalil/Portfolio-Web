"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scenes } from "@/data/content";

const TRANSITION_LOCK_MS = 900;
const WHEEL_THRESHOLD = 40;

function getScrollableParent(el: HTMLElement | null): HTMLElement | null {
  let current = el;
  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY;
    if (overflowY === "auto" || overflowY === "scroll") {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function canScroll(el: HTMLElement | null, deltaY: number): boolean {
  const scrollable = getScrollableParent(el);
  if (!scrollable) return false;

  const { scrollTop, scrollHeight, clientHeight } = scrollable;
  if (scrollHeight <= clientHeight) return false;

  if (deltaY > 0 && scrollTop + clientHeight < scrollHeight - 2) {
    return true; // Can scroll down
  }
  if (deltaY < 0 && scrollTop > 2) {
    return true; // Can scroll up
  }
  return false;
}

export function useSceneNavigation() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const locked = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartTarget = useRef<EventTarget | null>(null);
  const wheelAccum = useRef(0);
  const wheelResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    function isModalOpen() {
      return document.querySelector("[data-modal-open]") !== null;
    }

    function onWheel(e: WheelEvent) {
      if (isModalOpen()) {
        return; // Disable scene navigation while modal is open
      }

      const target = e.target as HTMLElement;
      if (canScroll(target, e.deltaY)) {
        // Let the scrollable element handle the scroll naturally
        return;
      }

      e.preventDefault();
      if (locked.current) return;
      wheelAccum.current += e.deltaY;
      if (wheelResetTimer.current) clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = setTimeout(() => {
        wheelAccum.current = 0;
      }, 200);
      if (Math.abs(wheelAccum.current) > WHEEL_THRESHOLD) {
        if (wheelAccum.current > 0) next();
        else prev();
        wheelAccum.current = 0;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onKey(e: KeyboardEvent) {
      if (isModalOpen()) {
        return; // Disable scene navigation while modal is open
      }

      // If user is focused on a scrollable element or an input, skip keyboard shortcuts
      const activeEl = document.activeElement as HTMLElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable)) {
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
      touchStartTarget.current = e.target;
    }

    function onTouchEnd(e: TouchEvent) {
      if (touchStartY.current === null) return;
      if (isModalOpen()) {
        touchStartY.current = null;
        touchStartTarget.current = null;
        return; // Disable scene navigation while modal is open
      }

      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const target = touchStartTarget.current as HTMLElement | null;

      if (Math.abs(delta) > 60) {
        if (target && canScroll(target, delta)) {
          // Let the container scroll touch-wise instead of changing scene
          touchStartY.current = null;
          touchStartTarget.current = null;
          return;
        }

        if (delta > 0) next();
        else prev();
      }
      touchStartY.current = null;
      touchStartTarget.current = null;
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  return {
    index,
    direction,
    scene: scenes[index],
    goTo,
    next,
    prev,
    isFirst: index === 0,
    isLast: index === scenes.length - 1,
  };
}
