"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { cn } from "@/lib/utils";

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo?: React.ReactNode;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ctaHref?: string;
}

// Locked brand + lab-instrument palette.
// Surface is a slightly cool off-white (avoiding the cream/parchment band).
// Cards live in cool ink → slate, with a single bronze card as the lab-phosphor signature.
const DEFAULT_BASE_COLOR = "#FAFAFA";
const DEFAULT_MENU_COLOR = "#0E1116";
const DEFAULT_BUTTON_BG = "#0066FF";
const DEFAULT_BUTTON_TEXT = "#FFFFFF";

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "ACSL",
  items,
  className = "",
  ease = "power3.out",
  baseColor = DEFAULT_BASE_COLOR,
  menuColor,
  buttonBgColor = DEFAULT_BUTTON_BG,
  buttonTextColor = DEFAULT_BUTTON_TEXT,
  ctaHref = "/laboratories",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hamburgerColor = menuColor || DEFAULT_MENU_COLOR;

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 60;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(
        ".card-nav-content",
      ) as HTMLElement | null;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        // force reflow before measuring
        void contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 60 + Math.max(180, Math.min(260, items.length * 30 + 80));
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.45,
      ease,
    });

    // Card stagger with a slight overshoot — echoes the gooey pill bounce
    // from GooeyNav's `cubic-bezier(0.34, 1.56, 0.64, 1)` keyframe.
    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "back.out(1.4)",
        stagger: 0.07,
      },
      "-=0.18",
    );

    return tl;
  };

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      // Reduced motion: show cards immediately, skip animation timeline
      if (navRef.current) {
        gsap.set(navRef.current, { height: 60, overflow: "hidden" });
        gsap.set(cardsRef.current, { y: 0, opacity: 0 });
      }
      return;
    }
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items.length, prefersReducedMotion]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (prefersReducedMotion) {
        // Reduced motion: just adjust height instantly
        if (navRef.current && isExpanded) {
          gsap.set(navRef.current, { height: calculateHeight() });
        }
        return;
      }
      if (!tlRef.current || !navRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, prefersReducedMotion]);

  const toggleMenu = () => {
    // Reduced motion: skip GSAP — instant show/hide
    if (prefersReducedMotion) {
      if (!isExpanded) {
        setIsHamburgerOpen(true);
        setIsExpanded(true);
        if (navRef.current) {
          gsap.set(navRef.current, {
            height: calculateHeight(),
            overflow: "hidden",
          });
          gsap.set(cardsRef.current, { y: 0, opacity: 1 });
        }
      } else {
        setIsHamburgerOpen(false);
        setIsExpanded(false);
        if (navRef.current) {
          gsap.set(navRef.current, { height: 60, overflow: "hidden" });
          gsap.set(cardsRef.current, { y: 50, opacity: 0 });
        }
      }
      return;
    }

    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={cn(
        "card-nav-container absolute left-1/2 -translate-x-1/2 w-[92%] max-w-[860px] z-[99] top-[1.2em] md:top-[1.6em]",
        className,
      )}
    >
      <nav
        ref={navRef}
        className={cn(
          "card-nav block h-[60px] p-0 rounded-xl shadow-[0_1px_0_rgba(14,17,22,0.04),0_8px_24px_-12px_rgba(14,17,22,0.18)] relative overflow-hidden will-change-[height]",
          isExpanded && "open",
        )}
        style={{ backgroundColor: baseColor }}
        aria-label="Primary"
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={cn(
              "hamburger-menu group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none",
              isHamburgerOpen && "open",
            )}
            onClick={toggleMenu}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: hamburgerColor, width: 44 }}
          >
            <span
              className={cn(
                "hamburger-line w-[26px] h-[1.5px] bg-current block transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%]",
                isHamburgerOpen ? "translate-y-[3.75px] rotate-45" : "",
              )}
            />
            <span
              className={cn(
                "hamburger-line w-[26px] h-[1.5px] bg-current block transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%]",
                isHamburgerOpen ? "-translate-y-[3.75px] -rotate-45" : "",
              )}
            />
          </div>

          <a
            href=""
            className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none select-none"
            aria-label={logoAlt}
          >
            {logo ?? (
              <span className="logo inline-flex items-baseline gap-[0.18em] text-[15px] font-semibold tracking-[-0.02em] text-[#0E1116]">
                <span className="font-mono text-[#0066FF] tracking-[0.04em]">
                  ACSL
                </span>
              </span>
            )}
          </a>
        </div>

        <div
          className={cn(
            "card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-4 flex flex-col items-stretch gap-5 justify-start z-[1]",
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none",
            "md:flex-row md:items-start md:gap-[24px] md:p-6 md:pt-8",
          )}
          aria-hidden={!isExpanded}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="select-none relative flex flex-col gap-3 min-w-0 flex-[1_1_auto] md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
            >
              <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0E1116]/40 border-b border-[#0E1116]/8 pb-2">
                {item.label}
              </div>
              <div className="flex flex-col gap-2">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="inline-flex items-center gap-[6px] no-underline cursor-pointer transition-colors duration-200 text-[14px] font-medium leading-[1.3] text-[#3F4753] hover:text-[#0066FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel ?? lnk.label}
                  >
                    <GoArrowUpRight
                      className="shrink-0 size-3.5 text-[#0E1116]/30 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
