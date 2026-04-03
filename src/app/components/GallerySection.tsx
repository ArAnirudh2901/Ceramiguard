"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const GALLERY = [
  {
    id: "g1",
    src: "/gallery-studio.jpg",
    alt: "BMW M3 Competition in detailing studio",
    label: "Studio Reveal",
    sub: "BMW M3 · Full Detail",
    span: "col-span-2 row-span-1 md:col-span-2 md:row-span-2",
  },
  {
    id: "g2",
    src: "/gallery-ceramic.jpg",
    alt: "Ceramic coating hydrophobic beading on BMW M4",
    label: "9H Ceramic",
    sub: "BMW M4 · Coating",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g3",
    src: "/gallery-paint.jpg",
    alt: "Paint correction on black BMW",
    label: "Stage III Correction",
    sub: "BMW 5 Series · Paint",
    span: "col-span-1 row-span-1",
  },
  {
    id: "g4",
    src: "/gallery-ppf.jpg",
    alt: "PPF installation on BMW M5",
    label: "Full-Front PPF",
    sub: "BMW M5 · Protection",
    span: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
];

const RESULT_MARKERS = [
  { value: "95%+", label: "defect removal on full correction jobs" },
  { value: "36h", label: "typical studio turnaround once prep begins" },
  { value: "5yr", label: "supported coating protection plans" },
] as const;

function GalleryCard({
  item,
  onClick,
  className,
}: {
  item: (typeof GALLERY)[number];
  onClick: () => void;
  className?: string;
}) {
  const layoutClassName = className ?? item.span;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${item.label} details`}
      className={`group relative overflow-hidden rounded-[1.35rem] border-0 bg-transparent p-0 text-left appearance-none ${layoutClassName}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 80vw, 50vw"
        quality={72}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.14)_60%,transparent_100%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[linear-gradient(to_right,#81C4FF,#16588E,#E7222E)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 p-3.5 md:p-5">
        <div className="opacity-100 md:translate-y-1 md:opacity-90 md:transition-all md:duration-300 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#81C4FF] md:text-[0.75rem] md:tracking-[0.24em]">
            {item.sub}
          </p>
          <h4 className="text-[1.1rem] font-bold tracking-tight text-white md:text-xl">
            {item.label}
          </h4>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-sm md:translate-x-[-8px] md:opacity-0 md:transition-all md:duration-300 md:ease-out md:group-hover:translate-x-0 md:group-hover:opacity-100">
          <span className="font-semibold text-zinc-200 md:hidden">Tap to open</span>
          <span className="hidden font-semibold text-zinc-200 md:inline">View Detail</span>
          <span className="text-sm font-bold text-[#E7222E]">→</span>
        </div>
      </div>
    </button>
  );
}

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<(typeof GALLERY)[number] | null>(null);

  const openItem = (item: (typeof GALLERY)[number]) => {
    setSelectedItem(item);
  };

  const closeItem = () => {
    setSelectedItem(null);
  };

  return (
    <section id="gallery" data-reveal-section className="relative flex h-[100svh] flex-col items-center justify-start overflow-x-hidden overflow-y-auto px-4 pb-5 pt-[calc(env(safe-area-inset-top)+6.45rem)] sm:px-6 sm:pb-6 sm:pt-[calc(env(safe-area-inset-top)+6.85rem)] md:overflow-hidden md:px-8 md:pb-7 md:pt-[7.5rem] lg:px-16 lg:pb-8 lg:pt-[8.5rem]" style={{ backgroundColor: "rgba(10,10,10,0.15)" }}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
        className="section-orb absolute top-0 right-1/4 w-[48vw] h-[48vw] rounded-full blur-[120px] opacity-[0.018] pointer-events-none"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #E7222E 0%, transparent 70%)" }} />
      </div>

      <div className="section-content relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col md:h-full">
        {/* Header */}
        <div className="mb-3 grid gap-2.5 shrink-0 md:mb-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="max-w-3xl">
            <h2 className="text-[1.72rem] font-black leading-[0.98] tracking-tight text-white sm:text-3xl md:text-[3.1rem] md:leading-[1.02] lg:text-[3.55rem]">
              Results You Can Read <br className="hidden md:block" />
              <span className="inline-block pr-[0.08em] pb-[0.06em] italic text-transparent bg-clip-text bg-gradient-to-r from-[#81C4FF] to-[#E7222E]">
                In Every Reflection
              </span>
            </h2>
            <p className="mt-2.5 max-w-2xl text-[1rem] leading-[1.6] text-zinc-100 md:mt-4 md:text-lg">
              These recent deliveries show what the finish looks like after
              correction, protection, and final inspection: sharper reflections,
              calmer paint, and surfaces that hold their depth under hard studio light.
            </p>
          </div>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-1.5 shrink-0 md:mb-5 md:gap-3">
          {RESULT_MARKERS.map((marker) => (
            <div
              key={marker.label}
              className="glass-panel rounded-[1.1rem] px-2.5 py-2 md:rounded-2xl md:px-4 md:py-3"
            >
              <p className="text-[1.1rem] font-black tracking-tight text-white md:text-xl">{marker.value}</p>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.08em] text-zinc-200 md:text-[0.75rem] md:tracking-[0.16em]">
                {marker.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-1 w-full shrink-0 md:hidden">
          <div className="-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-2 pt-1 [overscroll-behavior-x:contain] [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GALLERY.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => openItem(item)}
                className="aspect-[15/11] min-w-[78%] shrink-0 snap-start"
              />
            ))}
          </div>
        </div>

        <div className="mb-1 hidden flex-1 min-h-0 w-full md:block md:mb-2">
          <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-2.5 md:grid-cols-4 md:grid-rows-2 md:gap-4">
            {GALLERY.map((item) => (
              <GalleryCard key={item.id} item={item} onClick={() => openItem(item)} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 pt-[calc(env(safe-area-inset-top)+5.75rem)] sm:p-8 sm:pt-[7rem]"
            style={{ backgroundColor: "rgba(8,10,15,0.9)" }}
            onClick={closeItem}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#080a0f] shadow-2xl md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/85 transition-colors"
                onClick={closeItem}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="relative w-full md:w-1/2 h-[35vh] md:h-auto min-h-[250px] md:min-h-[400px]">
                <Image src={selectedItem.src} alt={selectedItem.alt} fill quality={75} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080a0f] via-[#080a0f]/40 to-transparent" />
              </div>

              <div className="flex w-full flex-col justify-center overflow-y-auto p-5 sm:p-10 md:w-1/2">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#81C4FF]">
                  {selectedItem.sub}
                </p>
                <h3 className="mb-3 text-[1.75rem] font-bold tracking-tight text-white md:mb-4 md:text-4xl">{selectedItem.label}</h3>
                <p className="mb-6 text-[1rem] leading-relaxed text-zinc-200 md:mb-8 md:text-lg font-normal">
                  Experience the ultimate {selectedItem.label.toLowerCase()} finish. Using specialized tools and the industry&apos;s most advanced ceramic technology, this vehicle was subjected to our rigorous detailing protocol, yielding an intense, wet-look gloss, formidable hydrophobics, and profound clarity that sets a new standard for protection.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <button
                    className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold tracking-tight text-black transition-colors hover:bg-zinc-200"
                    onClick={closeItem}
                  >
                    Close Gallery
                  </button>
                  <button className="rounded-full border border-white/20 bg-transparent px-6 py-3 text-center text-sm font-bold tracking-tight text-white transition-colors hover:bg-white/5">
                    Book Similar Service
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
