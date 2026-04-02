const SERVICES = [
  {
    id: "paint-correction",
    label: "Stage I–III",
    title: "Paint Correction",
    desc: "Defect removal calibrated to the paint system, from refinement passes on newer BMW finishes to full multi-stage correction on neglected clear coats.",
    highlights: [
      "Inspection-led pad and compound pairing",
      "Finish refined for gloss, depth, and clean reflections",
    ],
    gradient: "from-[#81C4FF]/12 to-[#16588E]/10",
    accent: "#81C4FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 3a9 9 0 100 18A9 9 0 0012 3z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "ceramic-coating",
    label: "9H Nano-Ceramic",
    title: "Ceramic Coating",
    desc: "A tightly controlled coating install with paint prep, panel wipe-down, and infrared curing so the hydrophobic finish looks deliberate instead of overdone.",
    highlights: [
      "UV resilience and chemical resistance built in",
      "Maintenance guidance delivered with every handover",
    ],
    gradient: "from-[#16588E]/12 to-[#81C4FF]/10",
    accent: "#16588E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 3C8 3 4 7.5 4 12a8 8 0 0016 0c0-4.5-4-9-8-9z" />
        <path d="M9 12c0-2 1.5-4 3-4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "ppf",
    label: "Xpel / SunTek",
    title: "Paint Protection Film",
    desc: "Protection film templated and wrapped to preserve panel lines while guarding the paint from motorway chips, wash marring, and daily-use abrasion.",
    highlights: [
      "High-impact coverage with self-healing top layers",
      "Edges tucked for a cleaner, less visible install",
    ],
    gradient: "from-[#E7222E]/10 to-[#16588E]/10",
    accent: "#E7222E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M7 6V4a1 1 0 011-1h8a1 1 0 011 1v2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ─── Individual card with staggered entrance ───────────────────
function ServiceCard({
  svc,
  className = "",
}: {
  svc: (typeof SERVICES)[number];
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className="glass-panel h-full rounded-[1.5rem] p-5 sm:p-6 xl:rounded-[1.75rem] xl:p-7"
      >
        {/* Icon + badge row */}
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${svc.gradient} border border-white/10 flex items-center justify-center`}
            style={{ color: svc.accent }}
          >
            {svc.icon}
          </div>
          <span className="text-[0.65rem] uppercase tracking-[0.28em] text-zinc-400 font-extrabold">
            {svc.label}
          </span>
        </div>

        <h3 className="text-white text-xl font-bold tracking-tight mb-3">{svc.title}</h3>

        <p className="text-zinc-300 text-sm leading-relaxed font-light">{svc.desc}</p>

        <ul className="mt-5 space-y-2">
          {svc.highlights.map((detail) => (
            <li key={detail} className="flex items-start gap-2.5 text-sm text-zinc-400">
              <span
                className="mt-1.5 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: svc.accent }}
              />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <div
          className="mt-6 h-px w-full opacity-30"
          style={{ background: `linear-gradient(to right, transparent, ${svc.accent}, transparent)` }}
        />
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────
export default function ServiceSection() {
  return (
    <section id="services" data-reveal-section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 pt-[11vh] pb-6 sm:px-8 md:px-12 md:pt-[13vh] md:pb-8 lg:px-16" style={{ backgroundColor: "rgba(10,10,10,0.15)" }}>
      {/* Animated divider line that scales in on scroll */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(8,10,15,0.05) 0%, rgba(8,10,15,0.15) 55%, rgba(8,10,15,0.3) 100%)",
        }}
      />

      {/* Background orb */}
      <div
        aria-hidden="true"
        className="section-orb absolute top-0 left-1/2 -translate-x-1/2 w-[48vw] h-[48vw] rounded-full blur-[120px] opacity-[0.02] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #81C4FF 0%, transparent 70%)" }} />
      </div>

      {/* Secondary orb */}
      <div
        aria-hidden="true"
        className="section-orb absolute bottom-0 right-0 w-[34vw] h-[34vw] rounded-full blur-[100px] opacity-[0.015] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #E7222E 0%, transparent 70%)" }} />
      </div>

      <div className="section-content relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center">
        {/* Section header */}
        <div className="mb-6 text-center md:mb-10 lg:mb-12">
          <h2 className="mb-4 text-[2.2rem] font-black tracking-tight text-white sm:text-4xl md:mb-5 md:text-[2.9rem] lg:text-5xl">
            Correction, Coating, and Film With Clear Outcomes
          </h2>
          <p className="mx-auto max-w-3xl text-sm font-light leading-relaxed text-zinc-400 sm:text-base md:text-lg">
            Every package is scoped around paint condition, storage, mileage,
            and how the car is actually driven, so the finish feels controlled,
            durable, and believable under any light.
          </p>
        </div>

        {/* Cards */}
        <div className="grid auto-cols-[84%] grid-flow-col gap-4 overflow-x-auto pb-3 pr-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:auto-cols-auto md:grid-flow-row md:grid-cols-2 md:overflow-visible md:pb-0 md:pr-0 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} className="snap-center md:snap-none" />
          ))}
        </div>
      </div>
    </section>
  );
}
