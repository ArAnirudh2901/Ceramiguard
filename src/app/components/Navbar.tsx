"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

import {
  getActiveTarget,
  scrollToTarget,
} from "../lib/scrollSections";
import { STACK_SECTIONS, type ScrollTargetId } from "../lib/sectionData";

const navContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
};

const navItem: Variants = {
  hidden: { y: -24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 24 } },
};

export default function Navbar() {
  const [activeTarget, setActiveTarget] = useState<ScrollTargetId>("hero");

  useEffect(() => {
    let frameId = 0;

    const syncActiveTarget = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const nextTarget = getActiveTarget();
        setActiveTarget((currentTarget) =>
          currentTarget === nextTarget ? currentTarget : nextTarget,
        );
      });
    };

    syncActiveTarget();
    window.addEventListener("scroll", syncActiveTarget, { passive: true });
    window.addEventListener("resize", syncActiveTarget);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", syncActiveTarget);
      window.removeEventListener("resize", syncActiveTarget);
    };
  }, []);

  return (
    <motion.nav
      id="navbar"
      variants={navContainer}
      initial="hidden"
      animate="show"
      className="fixed inset-x-0 top-0 z-50 bg-transparent px-4 pb-2 pt-[calc(env(safe-area-inset-top)+0.75rem)] transition-all duration-300 pointer-events-auto sm:px-6 sm:pb-3 sm:pt-[calc(env(safe-area-inset-top)+0.85rem)] md:px-10 md:pb-4 md:pt-6 lg:px-16 lg:pb-5"
    >
      <div className="flex items-center justify-between gap-4 sm:gap-5 md:gap-6">
        <motion.button
          type="button"
          variants={navItem}
          onClick={() => scrollToTarget("hero")}
          className="flex items-center select-none"
        >
          <Image
            src="/ceramiguard-logo-theme.png"
            alt="Ceramiguard logo"
            width={1746}
            height={463}
            priority
            className="h-6 w-auto sm:h-7 md:h-9"
          />
        </motion.button>

        <div className="hidden md:flex items-center gap-0">
          {STACK_SECTIONS.map((link) => {
            const isActive = activeTarget === link.id;

            return (
              <motion.div key={link.id} variants={navItem}>
                  <button
                    type="button"
                    onClick={() => scrollToTarget(link.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-2 left-5 right-5 h-px bg-gradient-to-r from-[#81C4FF] to-[#E7222E] transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
              </motion.div>
            );
          })}
        </div>


      </div>

      <div className="mt-2 flex gap-1.5 overflow-x-auto px-0.5 pb-1 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {STACK_SECTIONS.map((link) => {
          const isActive = activeTarget === link.id;

          return (
            <motion.div key={link.id} variants={navItem}>
              <button
                type="button"
                onClick={() => scrollToTarget(link.id)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-3.5 sm:py-2 sm:text-[0.6rem] ${
                  isActive
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/10 bg-black/20 text-zinc-400"
                }`}
              >
                {link.label}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}
