import PinnedCanvas         from "./components/PinnedCanvas";
import HeroSection          from "./components/HeroSection";
import ServiceSection       from "./components/ServiceSection";
import ProcessSection       from "./components/ProcessSection";
import GallerySection       from "./components/GallerySection";
import TestimonialsSection  from "./components/TestimonialsSection";
import Footer               from "./components/Footer";
import IdleAutoScroll       from "./components/IdleAutoScroll";
import Navbar               from "./components/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <IdleAutoScroll />
      <Navbar />
      {/*
        Layer 0 — Fixed canvas (position:fixed, z:0)
        Always visible behind everything. Contains:
        • Ambient orbs
        • M-stripe diagonal SVG
        • BMW car (GSAP MotionPath, scrub:1.4 over full page scroll)
      */}
      <PinnedCanvas />

      <div id="scroll-track" className="relative h-[500svh]">
        {/*
          Layer 1 — Sticky presentation stack
          The showcase panels stay pinned while the footer lives below the stack,
          so the footer no longer cross-fades in like another scene.
        */}
        <div
          id="section-stack"
          data-ready="false"
          className="sticky top-0 z-10 h-[100svh] w-full overflow-hidden pointer-events-none *:absolute *:inset-0 *:pointer-events-auto"
        >
          <HeroSection />
          <ServiceSection />
          <ProcessSection />
          <GallerySection />
          <TestimonialsSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}
