"use client";

import { startTransition, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: "t1",
    name: "James Hartwell",
    car: "BMW M4 Competition · Frozen Red",
    stars: 5,
    quote:
      "I've had my M4 detailed at four different places over the years. Nothing comes close to what Ceramiguard delivered — the paint looks better than the day I drove it off the forecourt. The 9H coating has been flawless for eight months.",
    initials: "JH",
    accent: "#81C4FF",
  },
  {
    id: "t2",
    name: "Sophie Renard",
    car: "BMW M5 CS · Ultimate Grey",
    stars: 5,
    quote:
      "Booked in for a full-front PPF after seeing their work on Instagram. The install was invisible and the finish was immaculate. They documented every step and showed me exactly what they'd done. Total professionals.",
    initials: "SR",
    accent: "#16588E",
  },
  {
    id: "t3",
    name: "Rahul Sharma",
    car: "BMW M3 Touring · Brooklyn Grey",
    stars: 5,
    quote:
      "Stage III paint correction and ceramic coating — the whole process took two days but the result was genuinely jaw-dropping. My M3 had swirl marks I'd lived with for three years. They're completely gone.",
    initials: "RS",
    accent: "#E7222E",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = (active + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length;
    startTransition(() => {
      setPage([page + newDirection, newDirection]);
      setActive(newIndex);
    });
  };

  const goTo = (index: number) => {
    if (index === active) {
      return;
    }

    const dir = index > active ? 1 : -1;
    startTransition(() => {
      setPage([page + dir, dir]);
      setActive(index);
    });
  };

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" data-reveal-section className="relative h-screen flex flex-col items-center justify-center pt-24 pb-10 px-8 md:px-16 overflow-hidden" style={{ backgroundColor: "rgba(10,10,10,0.15)" }}>
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Parallax BG orb */}
      <div
        aria-hidden="true"
        className="section-orb absolute top-0 right-0 w-[42vw] h-[42vw] rounded-full blur-[110px] opacity-[0.045] pointer-events-none translate-x-1/3 -translate-y-1/3"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #81C4FF 0%, transparent 70%)" }} />
      </div>

      <div className="section-content max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5">
            What Clients Notice After Pickup
          </h2>
          <p className="text-zinc-300 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Notes from recent correction, coating, and protection jobs,
            focused on finish quality, clarity, and how the car looked once it
            left the studio.
          </p>
        </div>

        <div className="relative h-[340px] md:h-[300px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="absolute inset-0 flex items-start justify-center"
            >
              <div className="w-full max-w-xl">
                <div
                  className="glass-panel rounded-2xl p-8 shadow-[0_18px_48px_-24px_rgba(129,196,255,0.25)]"
                >
                  {/* Quote mark */}
                  <div
                    className="text-6xl font-black leading-none mb-2 select-none"
                    style={{ color: t.accent, opacity: 0.25 }}
                  >
                    &ldquo;
                  </div>

                  <p className="text-zinc-300 text-base leading-relaxed font-light mb-7 italic text-balance">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: `${t.accent}22`, color: t.accent, border: `1px solid ${t.accent}44` }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{t.name}</p>
                        <p className="text-zinc-400 text-[0.68rem] font-light mt-0.5">{t.car}</p>
                      </div>
                    </div>
                    <StarRating count={t.stars} />
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="mt-6 h-px opacity-20"
                    style={{ background: `linear-gradient(to right, ${t.accent}, transparent)` }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  background: i === active ? "#81C4FF" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
