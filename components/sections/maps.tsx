"use client";

import { useState } from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { LAB_REGIONS } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";

// Keyless Google Maps embed: the `q` search query drops a pin on the campus
// and `output=embed` returns the iframe-friendly map.
const embedSrc = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

export function MapsSection() {
  const [active, setActive] = useState(0);
  const region = LAB_REGIONS[active];

  return (
    <section
      id="lokasi"
      aria-labelledby="maps-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Subtle radial backdrop, mirrored from the neighboring sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 45% at 92% 10%, rgba(0,102,255,0.05), transparent 60%), radial-gradient(40% 38% at 6% 92%, rgba(245,194,74,0.06), transparent 65%)",
        }}
      />

      <div className="container mx-auto max-w-[1240px] px-4 py-24 sm:py-28 lg:py-32">
        {/* Header */}
        <ScrollReveal delay={50} className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0066FF]">
            <span aria-hidden className="size-1.5 rounded-full bg-[#0066FF]" />
            Lokasi
          </span>
          <h2
            id="maps-heading"
            className="max-w-[20ch] text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[#0E1116]"
          >
            Temukan kami di tiga region.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-12">
          {/* Region selector */}
          <ScrollReveal
            as="div"
            delay={150}
            role="tablist"
            aria-label="Pilih region lab"
            aria-orientation="vertical"
            className="flex flex-col"
          >
            {LAB_REGIONS.map((r, i) => {
              const selected = i === active;
              return (
                <button
                  key={r.name}
                  role="tab"
                  type="button"
                  id={`region-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="region-map-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    // Roving arrow-key navigation between tabs.
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault();
                      const dir = e.key === "ArrowDown" ? 1 : -1;
                      const next =
                        (i + dir + LAB_REGIONS.length) % LAB_REGIONS.length;
                      setActive(next);
                      document.getElementById(`region-tab-${next}`)?.focus();
                    }
                  }}
                  className="group relative flex flex-col gap-1 border-t border-[#0E1116]/10 py-6 pl-6 pr-4 text-left transition-colors duration-200 last:border-b focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
                >
                  {/* Active marker — the yellow tick used across sections */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-6 h-7 w-0.5 rounded-full bg-[#F5C24A] transition-opacity duration-200 ${
                      selected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span className="flex items-baseline justify-between gap-3">
                    <span
                      className={`text-[1.15rem] font-semibold tracking-[-0.02em] transition-colors duration-200 ${
                        selected
                          ? "text-[#0066FF]"
                          : "text-[#0E1116] group-hover:text-[#0066FF]"
                      }`}
                    >
                      {r.name}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#0E1116]/45">
                      {r.campus}
                    </span>
                  </span>
                  <span className="text-[13.5px] leading-[1.55] text-[#3F4753]">
                    {r.address}
                  </span>
                </button>
              );
            })}
          </ScrollReveal>

          {/* Map panel */}
          <ScrollReveal
            as="div"
            delay={250}
            id="region-map-panel"
            role="tabpanel"
            aria-labelledby={`region-tab-${active}`}
            className="flex flex-col gap-4"
          >
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-[#0E1116]/10">
              <iframe
                key={region.name}
                title={`Peta lokasi ACSL ${region.name}, ${region.campus}`}
                src={embedSrc(region.mapQuery)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/10] w-full border-0 sm:aspect-[16/9]"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-[14px] leading-snug text-[#3F4753]">
                <span className="font-medium text-[#0E1116]">
                  {region.name}
                </span>{" "}
                — {region.description}
              </p>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  region.mapQuery,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-[#0066FF] transition-colors duration-200 hover:text-[#0052cc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
              >
                Buka di Maps
                <GoArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom gradient hairline, matching neighboring sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0E1116]/10 to-transparent"
      />
    </section>
  );
}
