import { prisma } from "@/lib/prisma";
import { roleLabel } from "@/lib/roles";
import { RegionRoster } from "@/components/team/RegionRoster";

export const metadata = {
  title: "Tim · ACSL",
  description:
    "Koordinator dan asisten ACSL di tiga region Universitas Gunadarma — Depok, Kalimalang, dan Karawaci.",
};

// Source of truth for display order + campus label per region. Mirrors the
// laboratories page so the two surfaces stay in lockstep.
const REGION_ORDER = ["Depok", "Kalimalang", "Karawaci"] as const;
const REGION_CAMPUS: Record<string, string> = {
  Depok: "Kampus D",
  Kalimalang: "Kampus E",
  Karawaci: "Kampus Karawaci",
};

export default async function TeamPage() {
  // Fetch all users including roles and photos from the database
  const dbUsers = await prisma.user.findMany({
    where: {
      NOT: {
        email: "admin@webacsl.com",
      },
    },
    orderBy: { name: "asc" },
    select: {
      name: true,
      region: true,
      role: {
        select: {
          name: true,
        },
      },
      photos: {
        where: { type: "profile" },
        select: { url: true },
        take: 1,
      },
    },
  });

  const members = dbUsers.map((u) => ({
    name: u.name,
    region: u.region || "Semua Region",
    role: roleLabel(u.role.name),
    avatar: u.photos[0]?.url || `https://i.pravatar.cc/400?u=${encodeURIComponent(u.name)}`,
  }));

  const byRegion = REGION_ORDER.map((region) => ({
    region,
    campus: REGION_CAMPUS[region],
    members: members.filter((m) => m.region === region),
  })).filter((group) => group.members.length > 0);

  const regionCount = new Set(members.map((m) => m.region)).size;

  return (
    <main className="bg-white">
      {/* ---------- Header ---------- */}
      <section
        aria-labelledby="team-heading"
        className="relative isolate overflow-hidden bg-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 45% at 84% 12%, rgba(0,102,255,0.06), transparent 60%), radial-gradient(40% 40% at 8% 95%, rgba(245,194,74,0.05), transparent 65%)",
          }}
        />

        <div className="container mx-auto max-w-[1240px] px-4 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36">
          <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0066FF]">
            <span aria-hidden className="size-1.5 rounded-full bg-[#0066FF]" />
            Tim Asisten
          </span>

          <p className="mt-6 max-w-[60ch] text-pretty text-[15.5px] leading-[1.65] text-[#3F4753] sm:text-[17px]">
            Tim ACSL adalah mahasiswa yang menjalankan praktikum di tiga region
            Universitas Gunadarma. Mereka menyiapkan modul, mendampingi sesi
            lab, dan menjaga perangkat tetap siap dipakai setiap pekan.
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#0E1116]/10 pt-5 text-[13px] text-[#3F4753]">
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Anggota</dt>
              <dd className="font-mono text-[#0E1116]">
                {members.length}
              </dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Region</dt>
              <dd className="font-mono text-[#0E1116]">{regionCount}</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="text-[#0E1116]/60">Mata Pelajaran</dt>
              <dd className="font-mono text-[#0E1116]">4</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------- Roster by region ---------- */}
      <RegionRoster groups={byRegion} />
    </main>
  );
}
