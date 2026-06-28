import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import ScrollReveal from "@/components/ScrollReveal";

const NAV_GROUPS: {
  heading: string;
  links: { label: string; href: string }[];
}[] = [
  {
    heading: "Jelajahi",
    links: [
      { label: "Tentang", href: "/#about" },
      { label: "Galeri", href: "/#gallery" },
      { label: "Tim Asisten", href: "/#team" },
    ],
  },
  {
    heading: "Laboratorium",
    links: [
      { label: "Semua Lab", href: "/laboratories" },
      { label: "Penelitian", href: "/laboratories#penelitian" },
      { label: "Jadwal Praktikum", href: "/laboratories" },
    ],
  },
];

export function FooterSection() {
  const year = 2026;

  return (
    <footer className="relative isolate overflow-hidden bg-white text-[#0E1116]">
      {/* Top gradient hairline — echoes the hero's bottom rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0E1116]/12 to-transparent"
      />

      {/* Subtle radial backdrop, mirrored from the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 55% at 88% 0%, rgba(0,102,255,0.06), transparent 60%), radial-gradient(45% 50% at 5% 100%, rgba(245,194,74,0.06), transparent 65%)",
        }}
      />

      <ScrollReveal
        delay={50}
        className="container mx-auto max-w-[1240px] px-4 pt-20 pb-10 sm:pt-24"
      >
        {/* Top: brand statement + nav */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.0fr)] lg:gap-14">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0066FF]"
            >
              <Image
                src="/images/logo.png"
                alt="Logo ACSL"
                width={70}
                height={70}
                className="rounded-lg"
              />
            </Link>

            <p className="max-w-[42ch] text-pretty text-[15px] leading-[1.65] text-[#3F4753]">
              Advanced Computing and Systems Laboratory — laboratorium riset
              mahasiswa Universitas Gunadarma untuk praktikum jaringan, mobile
              computing system, dan field programmable gate array.
            </p>
          </div>

          {/* Nav columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {NAV_GROUPS.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <h3 className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0E1116]/55">
                  <span
                    aria-hidden
                    className="size-1 rounded-full bg-[#0066FF]"
                  />
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-[#3F4753] transition-colors duration-200 hover:text-[#0066FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-[#0E1116]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[#3F4753]">
            © {year} Advanced Computer System Laboratory.
          </p>
          <p className="font-mono text-[12px] text-[#0E1116]/45">
            Depok · Kalimalang · Karawaci
          </p>
        </div>
      </ScrollReveal>
    </footer>
  );
}
