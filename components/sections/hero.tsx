import CardSwap, { Card } from "@/components/CardSwap";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { prisma } from "@/lib/prisma";

type HeroImage = {
  src: string;
  alt: string;
};

const HERO_IMAGES: HeroImage[] = [
  { src: "/images/hero/jkl.png", alt: "Lab JKl - Jaringan Komputer Lanjut" },
  { src: "/images/hero/jkd.png", alt: "Lab JKd - Jaringan Komputer Dasar" },
  {
    src: "/images/hero/fpga.png",
    alt: "Lab FPGA - Field Programmable Gate Array",
  },
  { src: "/images/hero/mcs.png", alt: "Lab MCS - Mikrokomputer dan Sistem" },
];

function HeroImageCard({ img }: { img: HeroImage }) {
  return (
    <Card>
      <img
        src={img.src}
        alt={img.alt}
        className="h-full w-full rounded-[inherit] object-cover object-left"
        loading="eager"
      />
    </Card>
  );
}

export default async function HeroSection() {
  let aslabCount = 28; // Fallback value
  try {
    aslabCount = await prisma.user.count({
      where: {
        NOT: {
          email: "admin@webacsl.com",
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch aslab count for hero:", error);
  }

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#FAFAFA]"
    >
      {/* Subtle radial backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 18%, rgba(0,102,255,0.06), transparent 60%), radial-gradient(45% 40% at 12% 90%, rgba(245,194,74,0.05), transparent 65%)",
        }}
      />

      <div className="container mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-4 pt-24 pb-16 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-12 lg:pt-32 lg:pb-24">
        {/* Left: content */}
        <div className="flex flex-col gap-7 sm:gap-8">
          <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0066FF]">
            <span aria-hidden className="size-1.5 rounded-full bg-[#0066FF]" />
            Laboratorium · Universitas Gunadarma
          </span>

          <h1
            id="hero-heading"
            className="text-balance text-[clamp(2.4rem,5.4vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[#0E1116]"
          >
            Selamat Datang di Laboratorium{" "}
            <span className="relative whitespace-nowrap text-[#0066FF]">
              ACSL
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-2 h-2.5 w-full text-[#F5C24A]"
              >
                <path
                  d="M2 8 C 60 2, 140 2, 198 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="max-w-[58ch] text-pretty text-[15.5px] leading-[1.6] text-[#3F4753] sm:text-[17px]">
            ACSL adalah laboratorium riset mahasiswa Universitas Gunadarma —
            tempat belajar mata pelajaran Praktikum Jaringan Komputer Dasar,
            Praktikum Jaringan Komputer Lanjut, Praktikum Komputasi Bergerak,
            dan Praktikum Field Programmable Gate Array.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/laboratories"
              className="mt-2 inline-flex w-fit items-center gap-1 text-[13px] font-medium text-[#0066FF] hover:underline"
            >
              Lihat Lab
              <GoArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#0E1116]/8 pt-5 text-[13px] text-[#3F4753]">
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Asisten</dt>
              <dd className="font-mono text-[#0E1116]">{aslabCount}</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Mata Pelajaran</dt>
              <dd className="font-mono text-[#0E1116]">4</dd>
            </div>
          </dl>
        </div>

        {/* Right: CardSwap */}
        <div
          className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px]"
          aria-label="Foto laboratorium WebACSL"
        >
          <CardSwap
            cardDistance={40}
            verticalDistance={50}
            delay={4200}
            skewAmount={4}
            easing="elastic"
            width={460}
            height={320}
          >
            {HERO_IMAGES.map((img) => (
              <HeroImageCard key={img.src} img={img} />
            ))}
          </CardSwap>
        </div>
      </div>

      {/* Bottom gradient hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0E1116]/10 to-transparent"
      />
    </section>
  );
}
