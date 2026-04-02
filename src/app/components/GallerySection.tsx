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
    span: "col-span-2 row-span-2",   // large hero image
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
    span: "col-span-2 row-span-1",
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
}: {
  item: (typeof GALLERY)[number];
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border-0 bg-transparent p-0 text-left appearance-none ${item.span}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={72}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.14)_60%,transparent_100%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[linear-gradient(to_right,#81C4FF,#16588E,#E7222E)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="translate-y-1 opacity-90 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[#81C4FF] font-semibold mb-1">
            {item.sub}
          </p>
          <h4 className="text-white font-bold text-base md:text-lg tracking-tight">
            {item.label}
          </h4>
        </div>

        <div className="mt-2 flex translate-x-[-8px] items-center gap-1.5 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          <span className="text-zinc-300 text-xs font-medium">View Detail</span>
          <span className="text-[#E7222E] text-xs">→</span>
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
    <section id="gallery" data-reveal-section className="relative flex h-screen flex-col items-center justify-start overflow-hidden px-6 pt-[11vh] pb-5 sm:px-8 md:px-12 md:pt-[13vh] md:pb-7 lg:px-16 lg:pt-[14vh] lg:pb-8" style={{ backgroundColor: "rgba(10,10,10,0.15)" }}>
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

      <div className="section-content relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col">
        {/* Header */}
        <div
          className="mb-4 grid gap-3 md:mb-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start shrink-0"
        >
          <div className="max-w-3xl">
            <h2 className="text-[2.15rem] font-black tracking-tight text-white leading-[0.98] sm:text-3xl md:text-[3.1rem] md:leading-[1.02] lg:text-[3.55rem]">
              Results You Can Read <br className="hidden md:block" />
              <span className="inline-block pr-[0.08em] pb-[0.06em] italic text-transparent bg-clip-text bg-gradient-to-r from-[#81C4FF] to-[#E7222E]">
                In Every Reflection
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-[0.92rem] font-light leading-relaxed text-zinc-300 md:mt-4 md:text-base">
              These recent deliveries show what the finish looks like after
              correction, protection, and final inspection: sharper reflections,
              calmer paint, and surfaces that hold their depth under hard studio light.
            </p>
          </div>
          <div className="self-start rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-zinc-400 backdrop-blur-sm md:justify-self-end md:px-4 md:py-2 md:text-[0.62rem] md:tracking-[0.18em]">
            Recent delivery archive
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 md:mb-5 md:gap-3 shrink-0">
          {RESULT_MARKERS.map((marker) => (
            <div
              key={marker.label}
              className="glass-panel rounded-2xl px-3 py-2.5 md:px-4 md:py-3"
            >
              <p className="text-sm font-black tracking-tight text-white md:text-lg">{marker.value}</p>
              <p className="text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-zinc-400 md:text-[0.66rem] md:tracking-[0.16em]">
                {marker.label}
              </p>
            </div>
          ))}
        </div>

        {/* Asymmetric masonry grid */}
        <div className="mb-1 flex-1 min-h-0 w-full md:mb-2">
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2.5 md:grid-cols-4 md:gap-4">
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
            className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 pt-[6rem] sm:pt-[7rem]"
            style={{ backgroundColor: "rgba(8,10,15,0.9)" }}
            onClick={closeItem}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full max-w-5xl bg-[#080a0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-full"
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
              
              <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center overflow-y-auto">
                <p className="text-[#81C4FF] text-xs font-semibold tracking-[0.16em] uppercase mb-2">
                  {selectedItem.sub}
                </p>
                <h3 className="text-white text-3xl md:text-4xl font-bold mb-4 tracking-tight">{selectedItem.label}</h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                  Experience the ultimate {selectedItem.label.toLowerCase()} finish. Using specialized tools and the industry&apos;s most advanced ceramic technology, this vehicle was subjected to our rigorous detailing protocol, yielding an intense, wet-look gloss, formidable hydrophobics, and profound clarity that sets a new standard for protection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                   <button 
                     className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold tracking-tight hover:bg-zinc-200 transition-colors text-center"
                     onClick={closeItem}
                   >
                     Close Gallery
                   </button>
                   <button className="bg-transparent border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold tracking-tight hover:bg-white/5 transition-colors text-center">
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
