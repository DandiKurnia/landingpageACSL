import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import ScrollReveal from "@/components/ScrollReveal";

type FocusArea = {
  code: string;
  name: string;
  desc: string;
  link: string;
};

const FOCUS_AREAS: FocusArea[] = [
  {
    code: "JKD",
    name: "Jaringan Komputer Dasar",
    desc: "Fondasi konsep jaringan, protokol, dan konektivitas untuk pemula.",
    link: "https://jkd.acsl.my.id",
  },
  {
    code: "JKL",
    name: "Jaringan Komputer Lanjut",
    desc: "DNS, CMS, E-Mail, Proxy, Firewall dan Konfigurasi Ubuntu Server.",
    link: "https://jkl.acsl.my.id",
  },
  {
    code: "MCS",
    name: "Mobile Computing System",
    desc: "Pengembangan aplikasi Android dengan Flutter.",
    link: "https://mcs.acsl.my.id",
  },
  {
    code: "FPGA",
    name: "Field Programmable Gate Array",
    desc: "Perancangan logika digital dan sistem hardware.",
    link: "https://fpga.acsl.my.id",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Subtle radial backdrop, mirrored from the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 45% at 8% 12%, rgba(0,102,255,0.05), transparent 60%), radial-gradient(40% 38% at 92% 88%, rgba(245,194,74,0.06), transparent 65%)",
        }}
      />

      <div className="container mx-auto max-w-[1240px] px-4 py-24 sm:py-28 lg:py-32">
        {/* Header + statements */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-16">
          {/* Left rail */}
          <ScrollReveal delay={50} className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0066FF]">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[#0066FF]"
              />
              Tentang Kami
            </span>

            <h2
              id="about-heading"
              className="text-balance text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0E1116]"
            >
              Lebih dari sekadar ruang praktikum.
            </h2>

            <p className="max-w-[44ch] text-pretty text-[15.5px] leading-[1.65] text-[#3F4753]">
              ACSL menggabungkan fasilitas modern, riset terapan, dan komunitas
              asisten yang aktif membimbing setiap praktikan di Universitas
              Gunadarma.
            </p>
          </ScrollReveal>

          {/* Right: Visi + Misi */}
          <div className="flex flex-col">
            {/* Visi — the focal statement */}
            <ScrollReveal delay={150} className="relative">
              <span
                aria-hidden
                className="block h-0.5 w-10 rounded-full bg-[#F5C24A]"
              />
              <h3 className="mt-5 text-[13px] font-medium uppercase tracking-[0.14em] text-[#0E1116]">
                Visi
              </h3>
              <p className="mt-3 text-balance text-[clamp(1.25rem,2.2vw,1.7rem)] font-medium leading-[1.4] tracking-[-0.01em] text-[#0E1116]">
                Menjadi laboratorium unggulan dalam riset teknologi komputasi
                masa depan.
              </p>
            </ScrollReveal>

            <hr className="my-9 border-0 border-t border-[#0E1116]/10" />

            {/* Misi */}
            <ScrollReveal delay={250}>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#0E1116]">
                Misi
              </h3>
              <p className="mt-3 max-w-[58ch] text-pretty text-[16px] leading-[1.65] text-[#3F4753]">
                Menyediakan fasilitas modern dan memfasilitasi riset inovatif
                bagi mahasiswa dan dosen, serta mendampingi praktikan menguasai
                kompetensi inti di setiap mata praktikum.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Focus areas */}
        <div className="mt-16 lg:mt-24">
          <ScrollReveal delay={100} className="flex items-baseline justify-between gap-4 border-b border-[#0E1116]/10 pb-4">
            <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#0E1116]">
              Mata Praktikum
            </h3>
            <span className="font-mono text-[12px] text-[#0E1116]/45">
              4 mata pelajaran
            </span>
          </ScrollReveal>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS_AREAS.map((area, i) => (
              <ScrollReveal
                as="li"
                key={area.code}
                delay={i * 100}
                className="group relative flex flex-col gap-3 border-t border-[#0E1116]/10 py-7 pr-6 lg:py-8"
              >
                {/* Short top accent tick */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-0.5 w-8 bg-[#0066FF] transition-[width] duration-300 ease-out group-hover:w-12 motion-reduce:transition-none"
                />
                <span className="font-mono text-[13px] font-medium tracking-tight text-[#0066FF]">
                  {area.code}
                </span>
                <span className="text-[15.5px] font-semibold leading-snug text-[#0E1116]">
                  {area.name}
                </span>
                <span className="text-[13.5px] leading-[1.55] text-[#3F4753]">
                  {area.desc}
                </span>
                <Link
                  href={area.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-fit items-center gap-1 text-[13px] font-medium text-[#0066FF] hover:underline"
                >
                  Pelajari lebih lanjut
                  <GoArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom gradient hairline, matching the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0E1116]/10 to-transparent"
      />
    </section>
  );
}
