import CardSwap, { Card } from '@/components/CardSwap';
import { GoArrowUpRight, GoCpu, GoWorkflow, GoZap } from 'react-icons/go';

type Direction = {
  tag: string;
  title: string;
  body: string;
  meta: string;
  fg: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
};

const DIRECTIONS: Direction[] = [
  {
    tag: '// 01',
    title: 'Computing & AI',
    body: 'Riset machine learning, computer vision, dan infrastruktur data untuk aplikasi nyata.',
    meta: '4 riset aktif · 12 kontributor',
    fg: '#F5C24A',
    bg: '#0E1116',
    border: 'rgba(245,194,74,0.28)',
    icon: <GoCpu className="size-5" aria-hidden />,
  },
  {
    tag: '// 02',
    title: 'Networking & IoT',
    body: 'Eksplorasi protokol jaringan, edge computing, dan sistem tertanam untuk smart campus.',
    meta: '3 riset aktif · 9 kontributor',
    fg: '#A8D8FF',
    bg: '#15171D',
    border: 'rgba(168,216,255,0.28)',
    icon: <GoWorkflow className="size-5" aria-hidden />,
  },
  {
    tag: '// 03',
    title: 'Robotics & Embedded',
    body: 'Bangun robot otonom, sistem kendali, dan integrasi sensor-actuator end-to-end.',
    meta: '2 riset aktif · 7 kontributor',
    fg: '#FFD060',
    bg: '#3A2A1F',
    border: 'rgba(255,208,96,0.32)',
    icon: <GoZap className="size-5" aria-hidden />,
  },
];

function HeroCard({ d }: { d: Direction }) {
  return (
    <Card>
      <div
        className="flex h-full w-full flex-col justify-between p-7 sm:p-8"
        style={{ backgroundColor: d.bg, color: d.fg, borderColor: d.border }}
      >
        <header className="flex items-start justify-between gap-3">
          <span
            className="font-mono text-[11px] tracking-[0.18em]"
            style={{ color: d.fg, opacity: 0.7 }}
          >
            {d.tag}
          </span>
          <span
            className="grid size-9 place-items-center rounded-full border"
            style={{ borderColor: d.border }}
            aria-hidden
          >
            {d.icon}
          </span>
        </header>

        <div className="flex flex-col gap-2">
          <h3
            className="text-[clamp(1.25rem,1.6vw,1.65rem)] font-semibold leading-[1.1] tracking-[-0.025em]"
            style={{ color: '#FAFAFA' }}
          >
            {d.title}
          </h3>
          <p
            className="text-[13px] leading-[1.5] sm:text-[14px]"
            style={{ color: '#FAFAFA', opacity: 0.7 }}
          >
            {d.body}
          </p>
        </div>

        <footer
          className="font-mono text-[10.5px] tracking-[0.16em]"
          style={{ color: d.fg, opacity: 0.65 }}
        >
          {d.meta}
        </footer>
      </div>
    </Card>
  );
}

export default function HeroSection() {
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
            'radial-gradient(60% 50% at 78% 18%, rgba(0,102,255,0.06), transparent 60%), radial-gradient(45% 40% at 12% 90%, rgba(245,194,74,0.05), transparent 65%)',
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
            Bangun masa depan{' '}
            <span className="relative whitespace-nowrap text-[#0066FF]">
              komputasi
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
            , bareng-bareng.
          </h1>

          <p className="max-w-[58ch] text-pretty text-[15.5px] leading-[1.6] text-[#3F4753] sm:text-[17px]">
            WebACSL adalah laboratorium riset mahasiswa Universitas Gunadarma —
            tempat asisten laboratorium belajar, riset, dan membangun perangkat
            lunak bersama untuk kebutuhan kampus dan industri.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="/laboratories"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0066FF] px-5 py-3 text-[14px] font-medium text-white shadow-[0_8px_24px_-12px_rgba(0,102,255,0.6)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(0,102,255,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
            >
              Lihat Lab
              <GoArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-[#0E1116]/15 px-5 py-3 text-[14px] font-medium text-[#0E1116] transition-colors duration-200 ease-out hover:border-[#0E1116]/35 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
            >
              Cara gabung
            </a>
          </div>

          <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#0E1116]/8 pt-5 text-[13px] text-[#3F4753]">
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Asisten</dt>
              <dd className="font-mono text-[#0E1116]">28</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Riset aktif</dt>
              <dd className="font-mono text-[#0E1116]">9</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Tahun</dt>
              <dd className="font-mono text-[#0E1116]">5</dd>
            </div>
          </dl>
        </div>

        {/* Right: CardSwap */}
        <div
          className="relative h-[480px] w-full sm:h-[520px] lg:h-[560px]"
          aria-label="Tiga arah riset laboratorium"
        >
          <CardSwap
            cardDistance={50}
            verticalDistance={62}
            delay={4200}
            pauseOnHover
            skewAmount={4}
            easing="elastic"
            width="100%"
            height="100%"
          >
            {DIRECTIONS.map(d => (
              <HeroCard key={d.tag} d={d} />
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