import ScrollNavButton from "./ScrollNavButton";
import { PRIMARY_NAV_ITEMS } from "../lib/sectionData";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.89a8.26 8.26 0 004.83 1.55V7a4.85 4.85 0 01-1.06-.31z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="deferred-footer relative z-10 border-t border-white/[0.06]" style={{ backgroundColor: "rgba(7,7,7,0.96)" }}>
      {/* M-stripe top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(to right, #81C4FF 0%, #16588E 45%, #E7222E 100%)" }} />

      <div className="max-w-6xl mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              {/* Logo mark */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #16588E, #81C4FF)" }}>
                <span className="text-white font-black text-xs">CG</span>
              </div>
              <span className="text-white font-black text-xl tracking-tight">Ceramiguard</span>
            </div>
            <p className="text-zinc-600 text-sm font-light leading-relaxed max-w-xs">
              BMW M-Series detailing specialists. Precision paint correction,
              9H ceramic coatings, and self-healing PPF — all under one roof.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white font-semibold text-sm mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {PRIMARY_NAV_ITEMS.map((link) => (
                <li key={link.id}>
                  <ScrollNavButton
                    target={link.id}
                    className="text-zinc-600 text-sm font-light hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </ScrollNavButton>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div>
            <p className="text-white font-semibold text-sm mb-5">Studio</p>
            <address className="not-italic">
              <p className="text-zinc-600 text-sm font-light leading-relaxed">
                12 Motorway Court<br />
                Industrial Quarter<br />
                Manchester, M17 1QX
              </p>
              <a
                href="tel:+441615550192"
                className="block mt-4 text-sm text-zinc-600 hover:text-white transition-colors duration-200 font-light"
              >
                +44 (0) 161 555 0192
              </a>
              <a
                href="mailto:hello@ceramiguard.co.uk"
                className="block mt-1 text-sm text-zinc-600 hover:text-white transition-colors duration-200 font-light"
              >
                hello@ceramiguard.co.uk
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-700 text-xs font-light">
            © {new Date().getFullYear()} Ceramiguard Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <ScrollNavButton
              target="hero"
              className="text-zinc-700 text-xs font-light hover:text-zinc-400 transition-colors duration-200"
            >
              Back to Top
            </ScrollNavButton>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <a key={t} href="#" className="text-zinc-700 text-xs font-light hover:text-zinc-400 transition-colors duration-200">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
