const STEPS = [
  {
    num: "01",
    title: "Paint Inspection",
    desc: "A thorough clay-bar decontamination and multi-angle inspection under specialist lighting identifies every micro-defect across the entire paint surface.",
    accent: "#81C4FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.4}>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        <path d="M11 8v3l2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Decontamination",
    desc: "Iron fallout removers, tar dissolvers, and pH-neutral snow foam strip every bonded contaminant from the clear coat — no abrasion, no risk.",
    accent: "#60A5FA",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.4}>
        <path d="M12 3C8 7 4 9 4 13a8 8 0 0016 0c0-4-4-6-8-10z" />
        <path d="M12 16v-4m0 0l-2-2m2 2l2-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Paint Correction",
    desc: "Multi-stage machine polishing with Rupes LHR21 and calibrated compounds removes 95%+ of surface defects, restoring factory-level gloss and clarity.",
    accent: "#81C4FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.4}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.5 12h.5M4 12h.5M12 4.5V4M12 20v-.5M16.95 7.05l.35-.35M6.7 17.3l.35-.35M16.95 16.95l.35.35M6.7 6.7l.35.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Ceramic Bond",
    desc: "Pro-spec 9H SiO₂ nano-ceramic is hand-applied panel by panel in our climate-controlled bay, then infrared-cured for a permanent, hydrophobic armour.",
    accent: "#81C4FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.4}>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
];

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div
      className="relative flex min-w-0 flex-col"
    >
      {/* Number badge */}
      <div
        className="relative mb-2 text-[2.75rem] font-black leading-none tracking-tighter select-none sm:mb-4 sm:text-[4.4rem] lg:text-[5.5rem]"
        style={{
          color: "rgba(255, 255, 255, 0.06)",
          WebkitTextStroke: `1.5px ${step.accent}`,
          opacity: 0.95,
          textShadow: `0 0 24px ${step.accent}50`,
        }}
      >
        {step.num}
      </div>

      {/* Glass card */}
      <div className="glass-panel group flex-1 rounded-2xl p-4 transition-colors duration-300 hover:bg-white/[0.06] sm:p-5 lg:p-6">
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 sm:mb-5 sm:h-11 sm:w-11"
          style={{ background: `${step.accent}18`, color: step.accent }}
        >
          {step.icon}
        </div>
        <h3 className="mb-2.5 text-[1.05rem] font-bold tracking-tight text-white sm:mb-3 sm:text-lg">{step.title}</h3>
        <p className="text-[0.84rem] font-light leading-relaxed text-zinc-300 sm:text-sm">{step.desc}</p>

        {/* Bottom accent */}
        <div
          className="mt-5 h-px opacity-25"
          style={{ background: `linear-gradient(to right, ${step.accent}, transparent)` }}
        />
      </div>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" data-reveal-section className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-5 pt-[calc(env(safe-area-inset-top)+6.45rem)] sm:px-6 sm:pb-6 sm:pt-[calc(env(safe-area-inset-top)+6.85rem)] md:px-8 md:pb-8 md:pt-[7.5rem] lg:px-16 lg:pt-[8.5rem]" style={{ backgroundColor: "rgba(10,10,10,0.15)" }}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Parallax BG orb */}
      <div
        aria-hidden="true"
        className="section-orb absolute bottom-0 left-1/2 -translate-x-1/2 w-[56vw] h-[56vw] rounded-full blur-[120px] opacity-[0.03] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #16588E 0%, transparent 70%)" }} />
      </div>

      <div className="section-content mx-auto flex h-full w-full max-w-6xl flex-col justify-start md:justify-center">
        {/* Header */}
        <div className="mb-5 text-left sm:text-center md:mb-8 lg:mb-10">
          <h2 className="mb-3 text-[1.95rem] font-black tracking-tight text-white sm:text-4xl md:mb-5 md:text-[2.9rem] lg:text-5xl">
            Four Steps to Flawless
          </h2>
          <p className="max-w-xl text-[0.92rem] font-light leading-relaxed text-zinc-300 sm:mx-auto sm:text-base md:text-lg">
            Every vehicle follows the same uncompromising sequence — no shortcuts,
            no skipped stages.
          </p>
        </div>

        {/* Animated connector line (desktop only) */}
        <div className="relative mb-2 mx-4 hidden h-px xl:block">
          <div className="absolute inset-0 bg-white/[0.06]" />
          <div
            className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#81C4FF] via-[#16588E] to-[#E7222E]"
          />
          {/* Dots at each step position */}
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 bg-[#0a0a0a]"
              style={{ left: `${(i / (STEPS.length - 1)) * 100}%`, borderColor: s.accent, transform: "translate(-50%, -50%)" }}
            />
          ))}
        </div>

        {/* Step cards grid */}
        <div className="-mx-1 mt-3 flex min-h-0 snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 xl:mt-6 xl:grid-cols-4 xl:gap-5">
          {STEPS.map((step) => (
            <div key={step.num} className="min-w-[82%] shrink-0 snap-start sm:min-w-[72%] md:min-w-0 md:shrink md:snap-none">
              <StepCard step={step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
