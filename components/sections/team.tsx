import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { prisma } from "@/lib/prisma";
import { roleLabel } from "@/lib/roles";
import ScrollReveal from "@/components/ScrollReveal";

export async function TeamSection() {
  const dbUsers = await prisma.user.findMany({
    where: {
      NOT: {
        email: "admin@webacsl.com",
      },
    },
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
      createdAt: true,
    },
  });

  // Prioritize showing roles starting with 'ketua_' (Ketua JKL, Ketua JKD, etc.)
  const sortedUsers = [...dbUsers].sort((a, b) => {
    const aIsKetua = a.role.name.startsWith("ketua_");
    const bIsKetua = b.role.name.startsWith("ketua_");

    if (aIsKetua && !bIsKetua) return -1;
    if (!aIsKetua && bIsKetua) return 1;

    // Within same category, sort by newest registered first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const members = sortedUsers.slice(0, 8).map((u) => ({
    name: u.name,
    region: u.region || "Semua Region",
    role: roleLabel(u.role.name),
    avatar: u.photos[0]?.url || `https://i.pravatar.cc/400?u=${encodeURIComponent(u.name)}`,
  }));

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative isolate overflow-hidden bg-[#FAFAFA]"
    >
      {/* Subtle radial backdrop, matching the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 45% at 12% 10%, rgba(0,102,255,0.05), transparent 60%), radial-gradient(40% 40% at 90% 92%, rgba(245,194,74,0.06), transparent 65%)",
        }}
      />

      <div className="container mx-auto max-w-[1240px] px-4 py-24 sm:py-28 lg:py-32">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <ScrollReveal delay={50} className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#0066FF]">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[#0066FF]"
              />
              Tim Asisten
            </span>
            <h2
              id="team-heading"
              className="max-w-[18ch] text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[#0E1116]"
            >
              Orang-orang ACSL
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <Link
              href="/team"
              className="group inline-flex w-fit items-center gap-2 text-[14px] font-medium text-[#0066FF] transition-colors duration-200 hover:text-[#0052cc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
            >
              Lihat semua tim
              <GoArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </Link>
          </ScrollReveal>
        </div>

        {/* Member grid */}
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {members.map((member, i) => (
            <ScrollReveal
              as="li"
              key={member.name}
              delay={i * 80}
              className="group flex flex-col gap-4"
            >
              <div className="relative overflow-hidden rounded-xl ring-1 ring-[#0E1116]/8 shadow-sm transition-shadow duration-500 ease-out group-hover:shadow-md">
                <img
                  src={member.avatar}
                  alt={`${member.name}, ${member.role} di region ${member.region}`}
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  loading="lazy"
                  style={{ imageRendering: "auto" }}
                />
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0E1116] backdrop-blur-sm">
                  {member.region}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold leading-snug text-[#0E1116]">
                  {member.name}
                </span>
                <span className="text-[13px] text-[#3F4753]">
                  {member.role}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
