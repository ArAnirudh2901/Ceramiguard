"use client";

import { useEffect, useEffectEvent, useRef } from "react";

import {
  getNextAutoScrollTarget,
  scrollToTarget,
} from "../lib/scrollSections";

const AUTO_SCROLL_IDLE_MS = 5000;

export default function IdleAutoScroll() {
  const timeoutRef = useRef<number | null>(null);

  const clearIdleTimeout = useEffectEvent(() => {
    if (timeoutRef.current === null) {
      return;
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  });

  const queueAutoScroll = useEffectEvent(() => {
    clearIdleTimeout();

    if (document.hidden) {
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      scrollToTarget(getNextAutoScrollTarget(), { intent: "auto" });
    }, AUTO_SCROLL_IDLE_MS);
  });

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reduceMotionQuery.matches) {
      return;
    }

    const resetIdleTimer = () => {
      queueAutoScroll();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearIdleTimeout();
        return;
      }

      queueAutoScroll();
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      "keydown",
      "pointerdown",
      "pointermove",
      "resize",
      "scroll",
      "touchstart",
      "wheel",
    ];

    queueAutoScroll();

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetIdleTimer, { passive: true });
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearIdleTimeout();
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
