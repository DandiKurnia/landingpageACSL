"use client";

import { useEffect, useRef } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import type { TeamMember } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";

export type RegionGroup = {
  region: string;
  campus: string;
  members: TeamMember[];
};

// Repeat short rosters so one segment always overflows the viewport; the loop
// wraps at the segment boundary, where an identical clone hides the jump.
const MIN_SEGMENT_CARDS = 8;

export function RegionRoster({ groups }: { groups: RegionGroup[] }) {
  return (
    <section aria-label="Asisten per region">
      {groups.map((group) => (
        <RegionRow key={group.region} {...group} />
      ))}
    </section>
  );
}

function RegionRow({ region, campus, members }: RegionGroup) {
  const scrollerRef = useRef<HTMLUListElement>(null);

  const repeat = Math.max(1, Math.ceil(MIN_SEGMENT_CARDS / members.length));
  const segment = Array.from({ length: repeat }, () => members).flat();
  // One segment plus an identical clone. The clone is the runway that lets a
  // page in either direction always have somewhere to go.
  const track = [...segment, ...segment];

  // Keep the resting scroll position inside the first segment [0, half). The
  // clone occupies [half, full), so snapping back by one segment width is
  // visually seamless — that illusion is what makes the paging endless.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let idle = 0;
    const normalize = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft <= 0) el.scrollLeft = half;
    };
    // Debounce: our own programmatic jumps and smooth pages both fire scroll
    // events, so only normalize once motion has settled (150ms of quiet).
    const onScroll = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(normalize, 150);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
    };
  }, [members.length]);

  const page = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    // Page by ~85% of the viewport so a sliver of the next card stays visible
    // as a continuity cue between pages.
    const amount = el.clientWidth * 0.85;

    // Make room in the travel direction *before* animating, so a press never
    // dead-ends at a hard scroll edge — the clone supplies the runway. These
    // assignments are instant (no scroll-smooth on the element), so the jump
    // between identical copies is invisible.
    if (dir === 1 && el.scrollLeft >= half) el.scrollLeft -= half;
    else if (dir === -1 && el.scrollLeft < amount) el.scrollLeft += half;

    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="border-t border-[#0E1116]/10">
      <div className="py-12 lg:py-16">
        <ScrollReveal variant="up" delay={50} duration={600}>
          <header className="container mx-auto flex max-w-[1240px] items-end justify-between gap-6 px-4">
            <div className="flex flex-col">
              <span
                aria-hidden
                className="h-0.5 w-10 rounded-full bg-[#F5C24A]"
              />
              <h2 className="mt-4 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0E1116]">
                {region}
              </h2>
              <p className="mt-2 font-mono text-[12px] text-[#0E1116]/55">
                {campus}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <span className="font-mono text-[12px] text-[#3F4753]">
                {members.length} asisten
              </span>
              <div className="flex items-center gap-2">
                <PagerButton
                  direction="prev"
                  onClick={() => page(-1)}
                  region={region}
                />
                <PagerButton
                  direction="next"
                  onClick={() => page(1)}
                  region={region}
                />
              </div>
            </div>
          </header>
        </ScrollReveal>

        <ul
          ref={scrollerRef}
          tabIndex={0}
          aria-label={`Daftar asisten region ${region}`}
          className="no-scrollbar acsl-fade-x mt-6 flex gap-x-6 overflow-x-auto px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0066FF]"
        >
          {track.map((member, i) => (
            <MemberCard
              // Only the first pass is announced; the rest are visual clones.
              key={`${member.name}-${i}`}
              member={member}
              decorative={i >= members.length}
              index={i}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function PagerButton({
  direction,
  onClick,
  region,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  region: string;
}) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? GoArrowLeft : GoArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        isPrev
          ? `Asisten sebelumnya, region ${region}`
          : `Asisten berikutnya, region ${region}`
      }
      className="inline-flex size-11 items-center justify-center rounded-full text-[#0E1116] ring-1 ring-[#0E1116]/12 transition-[color,background-color,box-shadow,transform] duration-200 ease-out hover:bg-[#0066FF] hover:text-white hover:ring-[#0066FF] hover:scale-[1.06] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}

function MemberCard({
  member,
  decorative = false,
  index = 0,
}: {
  member: TeamMember;
  decorative?: boolean;
  index?: number;
}) {
  const cardContent = (
    <>
      <div className="relative overflow-hidden rounded-xl ring-1 ring-[#0E1116]/8 shadow-sm transition-shadow duration-500 ease-out group-hover/card:shadow-md">
        <img
          src={member.avatar}
          alt={decorative ? "" : `${member.name}, ${member.role}`}
          draggable={false}
          className="aspect-[3/4] w-full object-cover object-top transition-transform duration-600 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
          loading="lazy"
          style={{ imageRendering: "auto" }}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[15px] font-semibold leading-snug text-[#0E1116]">
          {member.name}
        </span>
        <span className="text-[13px] text-[#3F4753]">{member.role}</span>
      </div>
    </>
  );

  const className = "group/card flex w-[200px] shrink-0 flex-col gap-4 sm:w-[220px]";

  if (decorative) {
    return (
      <li aria-hidden="true" className={className}>
        {cardContent}
      </li>
    );
  }

  return (
    <ScrollReveal
      as="li"
      variant="up"
      delay={Math.min(index * 60, 480)}
      duration={650}
      threshold={0.01}
      className={className}
    >
      {cardContent}
    </ScrollReveal>
  );
}
