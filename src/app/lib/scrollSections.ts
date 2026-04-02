"use client";

import type { ScrollToOptions } from "lenis";

import {
  FOOTER_ID,
  STACK_SECTIONS,
  type ScrollTargetId,
  type StackSectionId,
} from "./sectionData";
import { getLenisInstance } from "./lenisInstance";

const AUTO_SCROLL_TARGETS: ScrollTargetId[] = [
  ...STACK_SECTIONS.map((section) => section.id),
];

const PROGRAMMATIC_SCROLL_PRESETS = {
  auto: {
    duration: 1.9,
    easing: (t: number) => 0.5 - Math.cos(Math.PI * t) / 2,
  },
  manual: {
    duration: 1.15,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  },
} as const satisfies Record<string, Pick<ScrollToOptions, "duration" | "easing">>;

interface ScrollToTargetOptions {
  intent?: keyof typeof PROGRAMMATIC_SCROLL_PRESETS;
  immediate?: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getFooterTop() {
  const footer = document.getElementById(FOOTER_ID);
  if (!footer) {
    return null;
  }

  return window.scrollY + footer.getBoundingClientRect().top;
}

export function getScrollTrackMetrics() {
  const track = document.getElementById("scroll-track");
  if (!track) {
    return null;
  }

  const start = window.scrollY + track.getBoundingClientRect().top;
  const span = Math.max(track.offsetHeight - window.innerHeight, 0);

  return { start, span };
}

export function getSectionFloatIndex() {
  const metrics = getScrollTrackMetrics();
  if (!metrics || metrics.span === 0) {
    return 0;
  }

  const progress = clamp((window.scrollY - metrics.start) / metrics.span, 0, 1);
  return progress * STACK_SECTIONS.length;
}

export function getSectionScrollTop(id: StackSectionId) {
  const metrics = getScrollTrackMetrics();
  const index = STACK_SECTIONS.findIndex((section) => section.id === id);

  if (!metrics || index < 0) {
    return 0;
  }

  const step = metrics.span / STACK_SECTIONS.length;
  return metrics.start + step * index;
}

export function getTargetScrollTop(target: ScrollTargetId) {
  return target === FOOTER_ID ? getFooterTop() : getSectionScrollTop(target);
}

export function scrollToTarget(
  target: ScrollTargetId,
  { immediate = false, intent = "manual" }: ScrollToTargetOptions = {},
) {
  const top = getTargetScrollTop(target);
  if (top === null) {
    return;
  }

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(top, {
      ...PROGRAMMATIC_SCROLL_PRESETS[intent],
      immediate,
    });
    return;
  }

  window.scrollTo({
    top,
    behavior: immediate ? "auto" : "smooth",
  });
}

export function getActiveTarget(): ScrollTargetId {
  const footerTop = getFooterTop();
  if (
    footerTop !== null &&
    window.scrollY + window.innerHeight * 0.45 >= footerTop
  ) {
    return FOOTER_ID;
  }

  const activeIndex = Math.min(Math.round(getSectionFloatIndex()), STACK_SECTIONS.length - 1);
  return STACK_SECTIONS[activeIndex]?.id ?? "hero";
}

export function getNextAutoScrollTarget(currentTarget = getActiveTarget()) {
  const currentIndex = AUTO_SCROLL_TARGETS.indexOf(currentTarget);

  if (currentIndex < 0 || currentIndex === AUTO_SCROLL_TARGETS.length - 1) {
    return AUTO_SCROLL_TARGETS[0] ?? "hero";
  }

  return AUTO_SCROLL_TARGETS[currentIndex + 1] ?? AUTO_SCROLL_TARGETS[0] ?? "hero";
}
