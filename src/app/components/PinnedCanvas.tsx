"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function PinnedCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    ScrollTrigger.config({ ignoreMobileResize: true });

    let carCtx: gsap.Context | null = null;
    let sceneTrigger: ScrollTrigger | null = null;
    const stackEl = document.querySelector<HTMLElement>("#section-stack");
    const trackEl = document.querySelector<HTMLElement>("#scroll-track");
    const containerEl = containerRef.current;
    const carEl = carRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!trackEl || !stackEl || !containerEl || !carEl) {
      stackEl?.setAttribute("data-ready", "true");
      return;
    }

    containerEl.setAttribute("data-car-ready", "false");
    let carTween: gsap.core.Tween | null = null;
    let carLoadedListener: (() => void) | null = null;
    let carInitFrame = 0;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("#section-stack > *"),
    );

    // Per scroll segment:
    // 1. The current section stays fully visible longer.
    // 2. It fades out completely.
    // 3. Only after that fade-out has finished does the next section begin.
    // 4. The car keeps moving throughout the full segment.
    //
    // To keep transitions non-overlapping, keep:
    // `SECTION_FADE_IN_START >= SECTION_FADE_OUT_END`
    const SECTION_FADE_OUT_START = 0.34;
    const SECTION_FADE_OUT_END = 0.68;
    const SECTION_FADE_IN_START = 0.68;
    const SECTION_FADE_IN_END = 1.0;
    const holdStart = sections.length > 1
      ? (sections.length - 1) / sections.length
      : 1;

    const applySceneProgress = (progress: number) => {
      const normalizedProgress = holdStart === 0
        ? 1
        : Math.min(progress / holdStart, 1);
      const segmentCount = Math.max(sections.length - 1, 0);
      const sceneProgress = normalizedProgress * segmentCount;

      let visibleIndex = 0;

      if (segmentCount > 0) {
        if (sceneProgress >= segmentCount) {
          visibleIndex = segmentCount;
        } else {
          const baseIndex = Math.floor(sceneProgress);
          const localProgress = sceneProgress - baseIndex;

          if (prefersReducedMotion) {
            visibleIndex =
              baseIndex + Number(localProgress >= SECTION_FADE_IN_START);
          } else {
            sections.forEach((section, index) => {
              let opacity = 0;

              if (index === baseIndex) {
                if (localProgress <= SECTION_FADE_OUT_START) {
                  opacity = 1;
                } else if (localProgress < SECTION_FADE_OUT_END) {
                  opacity =
                    1 -
                    (localProgress - SECTION_FADE_OUT_START) /
                      (SECTION_FADE_OUT_END - SECTION_FADE_OUT_START);
                }
              } else if (index === baseIndex + 1) {
                if (localProgress >= SECTION_FADE_IN_END) {
                  opacity = 1;
                } else if (localProgress > SECTION_FADE_IN_START) {
                  opacity =
                    (localProgress - SECTION_FADE_IN_START) /
                    (SECTION_FADE_IN_END - SECTION_FADE_IN_START);
                }
              }

              section.style.opacity = opacity.toFixed(3);
              section.style.visibility = opacity > 0.03 ? "visible" : "hidden";
              section.style.pointerEvents = opacity > 0.55 ? "auto" : "none";
            });

            carTween?.progress(normalizedProgress);
            return;
          }
        }
      }

      sections.forEach((section, index) => {
        const distance = Math.abs(visibleIndex - index);
        const opacity = prefersReducedMotion
          ? Number(index === visibleIndex)
          : Math.max(0, 1 - distance);

        section.style.opacity = opacity.toFixed(3);
        section.style.visibility = opacity > 0.03 ? "visible" : "hidden";
        section.style.pointerEvents = opacity > 0.55 ? "auto" : "none";
      });

      carTween?.progress(normalizedProgress);
    };

    const initializeCar = () => {
      if (carCtx) {
        return;
      }

      carCtx = gsap.context(() => {
        gsap.set(carEl, {
          motionPath: {
            path: "#cg-path",
            align: "#cg-path",
            alignOrigin: [0.5, 0.5],
            autoRotate: 180,
            start: 0,
            end: 0,
          },
          force3D: true,
          autoAlpha: 1,
        });

        carTween = gsap.to(carEl, {
          motionPath: {
            path: "#cg-path",
            align: "#cg-path",
            alignOrigin: [0.5, 0.5],
            autoRotate: 180,
            start: 0,
            end: 1,
          },
          ease: "none",
          force3D: true,
          paused: true,
        });

        carTween.progress(0);
      }, containerRef);

      applySceneProgress(sceneTrigger?.progress ?? 0);
      containerEl.setAttribute("data-car-ready", "true");
    };

    if (sections.length > 0) {
      sections.forEach((section, index) => {
        section.style.opacity = index === 0 ? "1" : "0";
        section.style.visibility = index === 0 ? "visible" : "hidden";
        section.style.pointerEvents = index === 0 ? "auto" : "none";
      });

      sceneTrigger = ScrollTrigger.create({
        trigger: trackEl,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          applySceneProgress(progress);
        },
        onRefresh: ({ progress }) => {
          applySceneProgress(progress);
        },
      });
    }

    if (carEl.complete && carEl.naturalWidth > 0) {
      carInitFrame = window.requestAnimationFrame(() => {
        initializeCar();
      });
    } else {
      carLoadedListener = () => {
        carInitFrame = window.requestAnimationFrame(() => {
          initializeCar();
        });
      };
      carEl.addEventListener("load", carLoadedListener, { once: true });
    }

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      applySceneProgress(sceneTrigger?.progress ?? 0);
      stackEl.setAttribute("data-ready", "true");
    });

    return () => {
      stackEl.setAttribute("data-ready", "false");
      containerEl.setAttribute("data-car-ready", "false");
      window.cancelAnimationFrame(carInitFrame);
      if (carLoadedListener) {
        carEl.removeEventListener("load", carLoadedListener);
      }
      carCtx?.revert();
      sceneTrigger?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pinned-canvas"
      data-car-ready="false"
    >

      {/* ── Ambient orbs ──────────────────────────────────────── */}
      <div className="ambient-orb absolute rounded-full blur-[96px] opacity-[0.2]"
        style={{
          width: "54vw", height: "54vw", top: "2%", left: "-18%",
          background: "radial-gradient(circle, #16588E 0%, transparent 70%)",
          animation: "orb-float-1 14s ease-in-out infinite",
        }} />
      <div className="ambient-orb absolute rounded-full blur-[72px] opacity-[0.12]"
        style={{
          width: "36vw", height: "36vw", bottom: "0%", right: "-8%",
          background: "radial-gradient(circle, #E7222E 0%, transparent 70%)",
          animation: "orb-float-2 17s ease-in-out infinite",
        }} />
      <div className="ambient-orb absolute rounded-full blur-[110px] opacity-[0.1]"
        style={{
          width: "26vw", height: "26vw", top: "-4%", left: "44%",
          background: "radial-gradient(circle, #81C4FF 0%, transparent 70%)",
          animation: "orb-float-3 11s ease-in-out infinite",
        }} />

      {/* ── M-stripe SVG + hidden motion path ─────────────────── */}
      <svg className="absolute inset-0 h-full w-full opacity-80 sm:opacity-100" viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stripeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#81C4FF" />
            <stop offset="45%" stopColor="#16588E" />
            <stop offset="100%" stopColor="#E7222E" />
          </linearGradient>
          <filter id="stripeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Wide luminous halo — extended well beyond viewport */}
        <path d="M -500 1168 L 1940 -138" stroke="url(#stripeGrad)" strokeWidth="220"
          fill="none" opacity="0.18" filter="url(#stripeGlow)" />

        {/* Light Blue — extended beyond viewport in both directions */}
        <path d="M -500 1088 L 1940 -218" stroke="#81C4FF"
          strokeWidth="60" fill="none" strokeLinecap="butt" opacity="0.92" />
        {/* Dark Blue — center stripe, car follows this exactly */}
        <path d="M -500 1168 L 1940 -138" stroke="#16588E"
          strokeWidth="60" fill="none" strokeLinecap="butt" opacity="0.96" />
        {/* Red */}
        <path d="M -500 1248 L 1940 -58" stroke="#E7222E"
          strokeWidth="60" fill="none" strokeLinecap="butt" opacity="0.92" />

        {/* Invisible car trajectory — straight line exactly on the dark blue stripe */}
        <path id="cg-path" d="M 180 804 L 1340 184"
          fill="none" stroke="transparent" strokeWidth="1" />
      </svg>

      {/* ── Car ───────────────────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={carRef} src="/Car.svg" alt="" width={560} height={1155}
        className="car-element absolute h-auto w-[13.25rem] sm:w-[18rem] md:w-[28rem] lg:w-[35rem]"
        decoding="async"
        fetchPriority="high"
        style={{
          top: 0, left: 0, zIndex: 2,
          filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.78))",
        }}
        draggable={false}
      />
    </div>
  );
}
