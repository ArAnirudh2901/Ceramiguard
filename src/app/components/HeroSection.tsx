/*
  HeroSection
  ─────────────────────────────────────────────────────────────────
  Pure content component — NO animation code, NO scroll runners.
  The car and stripe are on PinnedCanvas (position:fixed, z:0).
  This section is transparent so the canvas shows through fully.

  Height: 100vh (exactly one viewport) — fills the first screen.

  NOTE: All entrance animations removed to prevent Framer Motion
  from overriding GSAP's autoAlpha crossfader on this section.
*/

const HERO_HIGHLIGHTS = [
  "Paint correction",
  "Ceramic coatings",
  "Protection film installs",
] as const;

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col overflow-hidden"
      /* No background — PinnedCanvas shows through */
    >
      {/* Dark scrim behind hero text so it stays legible over the stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 30% 55%, rgba(0,0,0,0.72) 0%, transparent 100%)",
        }}
      />

      {/* Hero copy — vertically centred in remaining space after navbar */}
      <div
        className="flex-1 flex flex-col justify-center z-10 pl-8 md:pl-16 pr-8 max-w-[56rem] pointer-events-none"
      >
        <p
          className="text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#81C4FF] mb-5"
        >
          BMW M-Series Specialist
        </p>

        <h1
          className="text-5xl md:text-[4.6rem] lg:text-[5.2rem] font-black tracking-tight text-white leading-[1.02] mb-6"
        >
          Flawless{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#81C4FF] via-[#16588E] to-[#E7222E]">
            Perfection,
          </span>
          <br />
          Engineered.
        </h1>

        <p
          className="text-base md:text-lg text-zinc-200 font-light max-w-[38rem] leading-relaxed mb-10"
        >
          Where precision engineering meets artisan craftsmanship.
          Nano-ceramic coatings and multi-stage paint correction for
          the world&apos;s finest machines.
        </p>

        <div
          className="pointer-events-auto flex flex-wrap items-center gap-3"
        >
          {HERO_HIGHLIGHTS.map((item) => (
            <span
              key={item}
              className="glass-panel rounded-full px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div
          className="pointer-events-auto mt-10 flex items-center gap-10"
        >
          {[
            { value: "500+", label: "Cars Detailed" },
            { value: "9H",   label: "Ceramic Hardness" },
            { value: "5yr",  label: "Coating Warranty" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="text-2xl font-black text-white tracking-tight">
                {s.value}
              </span>
              <span className="text-[0.63rem] uppercase tracking-[0.22em] text-zinc-300 font-semibold">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[0.58rem] uppercase tracking-[0.28em] text-zinc-600 font-semibold">
          Scroll
        </span>
        <div
          className="scroll-hint-line w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </div>
    </section>
  );
}
