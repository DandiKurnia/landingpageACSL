import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { roleLabel } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Dashboard ACSL",
};

type Overview = {
  name: string;
  aslabCount: number;
  galleryCount: number;
  byRegion: { region: string; count: number }[];
  recent: { id: number; name: string; role: string; region: string | null }[];
  dbError: boolean;
};

async function getOverview(userId: number): Promise<Overview> {
  try {
    const [me, aslabCount, galleryCount, grouped, recent] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      }),
      prisma.user.count(),
      prisma.gallery.count(),
      prisma.user.groupBy({
        by: ["region"],
        _count: { _all: true },
        orderBy: { region: "asc" },
      }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          name: true,
          region: true,
          role: { select: { name: true } },
        },
      }),
    ]);

    return {
      name: me?.name ?? "Aslab",
      aslabCount,
      galleryCount,
      byRegion: grouped
        .filter((g) => g.region)
        .map((g) => ({ region: g.region as string, count: g._count._all })),
      recent: recent.map((u) => ({
        id: u.id,
        name: u.name,
        role: u.role.name,
        region: u.region,
      })),
      dbError: false,
    };
  } catch {
    return {
      name: "Aslab",
      aslabCount: 0,
      galleryCount: 0,
      byRegion: [],
      recent: [],
      dbError: true,
    };
  }
}

const STATS = (o: Overview) => [
  { label: "Total Aslab", value: o.aslabCount, hint: "akun terdaftar" },
  { label: "Region Aktif", value: o.byRegion.length, hint: "lokasi praktikum" },
  { label: "Item Galeri", value: o.galleryCount, hint: "dokumentasi kegiatan" },
];

export default async function DashboardPage() {
  const session = await getSession();
  // Layout already guards; this satisfies the type and is a cheap re-check.
  const overview = await getOverview(session?.userId ?? -1);

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0E1116]">
          Halo, {overview.name.split(/\s+/)[0]}.
        </h1>
        <p className="text-[14.5px] leading-[1.55] text-[#4B5563]">
          Ringkasan aktivitas Advanced Computing and Systems Laboratory.
        </p>
      </header>

      {overview.dbError ? (
        <div
          role="alert"
          className="mt-8 flex items-start gap-2.5 rounded-xl border border-[#D92D20]/25 bg-[#D92D20]/[0.06] px-4 py-3.5 text-[13.5px] leading-snug text-[#912018]"
        >
          <span
            aria-hidden
            className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#D92D20] text-[10px] font-bold text-white"
          >
            !
          </span>
          Tidak dapat memuat data dari server. Pastikan basis data tersedia,
          lalu muat ulang halaman.
        </div>
      ) : (
        <>
          {/* Stats — real counts, not decorative. */}
          <section aria-label="Statistik" className="mt-8">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STATS(overview).map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#0E1116]/8 bg-white p-5"
                >
                  <dt className="text-[13px] font-medium text-[#4B5563]">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-[2rem] font-semibold leading-none tracking-[-0.02em] text-[#0E1116]">
                      {stat.value}
                    </span>
                    <span className="text-[12.5px] text-[#6B7280]">
                      {stat.hint}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Recent aslab */}
            <section
              aria-labelledby="recent-heading"
              className="rounded-xl border border-[#0E1116]/8 bg-white"
            >
              <div className="flex items-center justify-between border-b border-[#0E1116]/8 px-5 py-4">
                <h2
                  id="recent-heading"
                  className="text-[15px] font-semibold tracking-[-0.01em] text-[#0E1116]"
                >
                  Aslab Terbaru
                </h2>
              </div>
              {overview.recent.length === 0 ? (
                <p className="px-5 py-10 text-center text-[13.5px] text-[#6B7280]">
                  Belum ada aslab terdaftar.
                </p>
              ) : (
                <ul className="divide-y divide-[#0E1116]/6">
                  {overview.recent.map((u) => (
                    <li
                      key={u.id}
                      className="flex items-center gap-3 px-5 py-3"
                    >
                      <span
                        aria-hidden
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0066FF]/10 text-[12px] font-semibold text-[#0066FF]"
                      >
                        {u.name
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((p) => p[0]?.toUpperCase() ?? "")
                          .join("")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium text-[#0E1116]">
                          {u.name}
                        </span>
                        <span className="block truncate text-[12.5px] text-[#6B7280]">
                          {roleLabel(u.role)}
                        </span>
                      </span>
                      {u.region ? (
                        <span className="shrink-0 rounded-full bg-[#0E1116]/5 px-2.5 py-1 text-[12px] font-medium text-[#374151]">
                          {u.region}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* By region */}
            <section
              aria-labelledby="region-heading"
              className="rounded-xl border border-[#0E1116]/8 bg-white"
            >
              <div className="border-b border-[#0E1116]/8 px-5 py-4">
                <h2
                  id="region-heading"
                  className="text-[15px] font-semibold tracking-[-0.01em] text-[#0E1116]"
                >
                  Sebaran Region
                </h2>
              </div>
              {overview.byRegion.length === 0 ? (
                <p className="px-5 py-10 text-center text-[13.5px] text-[#6B7280]">
                  Belum ada data region.
                </p>
              ) : (
                <ul className="flex flex-col gap-3 px-5 py-4">
                  {overview.byRegion.map((r) => {
                    const max = Math.max(
                      ...overview.byRegion.map((x) => x.count),
                      1,
                    );
                    const pct = Math.round((r.count / max) * 100);
                    return (
                      <li key={r.region}>
                        <div className="flex items-baseline justify-between">
                          <span className="text-[13.5px] font-medium text-[#0E1116]">
                            {r.region}
                          </span>
                          <span className="font-mono text-[13px] text-[#4B5563]">
                            {r.count}
                          </span>
                        </div>
                        <div
                          className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#0E1116]/6"
                          role="presentation"
                        >
                          <div
                            className="h-full rounded-full bg-[#0066FF]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
