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
      className="relative flex flex-col"
    >
      {/* Number badge */}
      <div
        className="text-[5.5rem] font-black leading-none tracking-tighter mb-4 select-none relative"
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
      <div className="glass-panel rounded-2xl p-6 flex-1 group hover:bg-white/[0.06] transition-colors duration-300">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border border-white/10"
          style={{ background: `${step.accent}18`, color: step.accent }}
        >
          {step.icon}
        </div>
        <h3 className="text-white font-bold text-lg tracking-tight mb-3">{step.title}</h3>
        <p className="text-zinc-300 text-sm leading-relaxed font-light">{step.desc}</p>

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
    <section id="process" data-reveal-section className="relative h-screen flex flex-col items-center justify-center pt-24 pb-10 px-8 md:px-16 overflow-hidden" style={{ backgroundColor: "rgba(10,10,10,0.15)" }}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Parallax BG orb */}
      <div
        aria-hidden="true"
        className="section-orb absolute bottom-0 left-1/2 -translate-x-1/2 w-[56vw] h-[56vw] rounded-full blur-[120px] opacity-[0.03] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #16588E 0%, transparent 70%)" }} />
      </div>

      <div className="section-content max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5">
            Four Steps to Flawless
          </h2>
          <p className="text-zinc-300 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Every vehicle follows the same uncompromising sequence — no shortcuts,
            no skipped stages.
          </p>
        </div>

        {/* Animated connector line (desktop only) */}
        <div className="hidden md:block relative mb-2 h-px mx-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6">
          {STEPS.map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
