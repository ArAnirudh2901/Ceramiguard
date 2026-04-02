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
        className="pointer-events-none z-10 flex flex-1 flex-col justify-center px-6 pt-24 pb-16 sm:px-8 md:max-w-[56rem] md:pl-16 md:pr-8"
      >
        <p
          className="text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#81C4FF] mb-5"
        >
          BMW M-Series Specialist
        </p>

        <h1
          className="mb-5 text-[2.9rem] font-black leading-[0.98] tracking-tight text-white sm:text-5xl md:mb-6 md:text-[4.6rem] lg:text-[5.2rem]"
        >
          Flawless{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#81C4FF] via-[#16588E] to-[#E7222E]">
            Perfection,
          </span>
          <br />
          Engineered.
        </h1>

        <p
          className="mb-8 max-w-[34rem] text-[0.96rem] leading-relaxed text-zinc-200 sm:text-base md:mb-10 md:max-w-[38rem] md:text-lg font-light"
        >
          Where precision engineering meets artisan craftsmanship.
          Nano-ceramic coatings and multi-stage paint correction for
          the world&apos;s finest machines.
        </p>

        <div
          className="pointer-events-auto flex flex-wrap items-center gap-2.5 md:gap-3"
        >
          {HERO_HIGHLIGHTS.map((item) => (
            <span
              key={item}
              className="glass-panel rounded-full px-3.5 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-zinc-300 sm:px-4 md:text-[0.62rem]"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div
          className="pointer-events-auto mt-8 grid max-w-[26rem] grid-cols-3 gap-4 sm:mt-10 sm:max-w-none sm:flex sm:flex-wrap sm:items-center sm:gap-8 md:gap-10"
        >
          {[
            { value: "500+", label: "Cars Detailed" },
            { value: "9H",   label: "Ceramic Hardness" },
            { value: "5yr",  label: "Coating Warranty" },
          ].map((s) => (
            <div key={s.label} className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[1.45rem] font-black text-white tracking-tight sm:text-2xl">
                {s.value}
              </span>
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-zinc-300 sm:text-[0.63rem] sm:tracking-[0.22em]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex md:bottom-8"
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
