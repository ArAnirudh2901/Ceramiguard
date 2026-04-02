"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

import {
  getActiveTarget,
  scrollToTarget,
} from "../lib/scrollSections";
import { PRIMARY_NAV_ITEMS, type ScrollTargetId } from "../lib/sectionData";

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
      className="fixed inset-x-0 top-0 z-50 px-6 pt-5 pb-4 md:px-16 md:pt-6 md:pb-5 bg-transparent transition-all duration-300 pointer-events-auto"
    >
      <div className="flex items-center justify-between gap-6">
        <motion.button
          type="button"
          variants={navItem}
          onClick={() => scrollToTarget("hero")}
          className="flex items-center select-none"
        >
          <Image
            src="/ceramiguard-logo.png"
            alt="Ceramiguard logo"
            width={1746}
            height={463}
            priority
            className="h-8 w-auto md:h-9"
          />
        </motion.button>

        <div className="hidden md:flex items-center gap-0">
          {PRIMARY_NAV_ITEMS.map((link) => {
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

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PRIMARY_NAV_ITEMS.map((link) => {
          const isActive = activeTarget === link.id;

          return (
            <motion.div key={link.id} variants={navItem}>
              <button
                type="button"
                onClick={() => scrollToTarget(link.id)}
                className={`rounded-full border px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
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
