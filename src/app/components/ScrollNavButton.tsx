"use client";

import { type ReactNode } from "react";

import { scrollToTarget } from "../lib/scrollSections";
import { type ScrollTargetId } from "../lib/sectionData";

interface ScrollNavButtonProps {
  children: ReactNode;
  className?: string;
  target: ScrollTargetId;
}

export default function ScrollNavButton({
  children,
  className = "",
  target,
}: ScrollNavButtonProps) {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(target)}
      className={className}
    >
      {children}
    </button>
  );
}
