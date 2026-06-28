import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export const metadata = {
  title: "Laboratorium · ACSL",
  description:
    "Tiga kampus Universitas Gunadarma — Depok, Kalimalang, dan Karawaci — yang menaungi laboratorium ACSL.",
};

type Region = {
  name: string;
  campus: string;
  address: string;
  description: string;
  image: string;
};

// The three primary regions ACSL operates across. These are the source of
// truth for copy/order; DB rows enrich them (real id, image, description).
const REGIONS: Region[] = [
  {
    name: "Depok",
    campus: "Kampus D",
    address: "Jl. Margonda Raya, Pondok Cina, Depok",
    description:
      "Pusat kegiatan praktikum ACSL. Kampus D menampung laboratorium jaringan dan komputasi dengan perangkat terbaru serta jadwal praktikum terpadat sepanjang semester.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Kalimalang",
    campus: "Kampus E",
    address: "Jl. KH. Noer Ali, Kalimalang, Bekasi",
    description:
      "Melayani praktikum mahasiswa wilayah Bekasi dengan fokus pada jaringan komputer dan komputasi bergerak, didukung ruang lab yang lapang dan koneksi stabil.",
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Karawaci",
    campus: "Kampus Karawaci",
    address: "Jl. Imam Bonjol, Karawaci, Tangerang",
    description:
      "Mengusung penelitian terapan dan pengembangan inovasi, kampus Karawaci menjadi simpul ACSL untuk eksperimen FPGA dan riset perangkat keras.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function LaboratoriesPage() {
  const regions = REGIONS;

  return (
    <main className="bg-white">
      {/* ---------- Header ---------- */}
      <section
        aria-labelledby="labs-heading"
        className="relative isolate overflow-hidden bg-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 45% at 82% 14%, rgba(0,102,255,0.06), transparent 60%), radial-gradient(40% 40% at 10% 95%, rgba(245,194,74,0.05), transparent 65%)",
          }}
        />

        <div className="container mx-auto max-w-[1240px] px-4 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36">
          <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0066FF]">
            <span aria-hidden className="size-1.5 rounded-full bg-[#0066FF]" />
            Laboratorium · Universitas Gunadarma
          </span>

          <h1
            id="labs-heading"
            className="mt-6 max-w-[20ch] text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[#0E1116]"
          >
            Tiga kampus, satu komunitas riset.
          </h1>

          <p className="mt-6 max-w-[60ch] text-pretty text-[15.5px] leading-[1.65] text-[#3F4753] sm:text-[17px]">
            ACSL hadir di tiga wilayah Universitas Gunadarma. Setiap kampus
            menjalankan praktikum dan riset yang sama mutunya — pilih lokasi
            terdekat untuk melihat detail fasilitas dan jadwalnya.
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#0E1116]/10 pt-5 text-[13px] text-[#3F4753]">
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Region</dt>
              <dd className="font-mono text-[#0E1116]">3</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Mata Praktikum</dt>
              <dd className="font-mono text-[#0E1116]">4</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Asisten</dt>
              <dd className="font-mono text-[#0E1116]">28</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------- Region rows ---------- */}
      <section aria-label="Daftar lokasi laboratorium">
        <ul className="container mx-auto max-w-[1240px] px-4">
          {regions.map((region, i) => {
            const reversed = i % 2 === 1;

            return (
              <li
                key={region.name}
                className="group grid items-center gap-8 border-t border-[#0E1116]/10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
              >
                {/* Image */}
                <figure
                  className={`relative overflow-hidden rounded-2xl ring-1 ring-[#0E1116]/8 ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={region.image}
                    alt={`Laboratorium ACSL ${region.campus}, ${region.address}`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <span
                    aria-hidden
                    className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0E1116] backdrop-blur-sm"
                  >
                    {region.campus}
                  </span>
                </figure>

                {/* Content */}
                <div
                  className={`flex flex-col ${reversed ? "lg:order-1" : ""}`}
                >
                  <span aria-hidden className="h-0.5 w-10 rounded-full bg-[#F5C24A]" />

                  <h2 className="mt-5 text-balance text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0E1116]">
                    {region.name}
                  </h2>

                  <p className="mt-2 font-mono text-[12.5px] text-[#0E1116]/55">
                    {region.address}
                  </p>

                  <p className="mt-5 max-w-[54ch] text-pretty text-[15.5px] leading-[1.65] text-[#3F4753]">
                    {region.description}
                  </p>

                  <Link
                    href="/laboratories"
                    className="group/link mt-7 inline-flex w-fit items-center gap-2 text-[14px] font-medium text-[#0066FF] transition-colors duration-200 hover:text-[#0052cc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
                  >
                    Lihat detail {region.name}
                    <GoArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Closing note ---------- */}
      <section className="border-t border-[#0E1116]/10">
        <div className="container mx-auto flex max-w-[1240px] flex-col items-start gap-5 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <p className="max-w-[44ch] text-balance text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-[1.35] tracking-[-0.01em] text-[#0E1116]">
            Tertarik bergabung sebagai asisten di salah satu region?
          </p>
          <Link
            href="/team"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0066FF] px-5 py-3 text-[14px] font-medium text-white shadow-[0_8px_24px_-12px_rgba(0,102,255,0.6)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(0,102,255,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Temui tim kami
            <GoArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
