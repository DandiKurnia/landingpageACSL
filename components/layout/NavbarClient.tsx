"use client";

import { usePathname } from "next/navigation";
import CardNav, { type CardNavItem } from "./CardNav";

// Routes that own their full-screen chrome and must not show the marketing nav.
const HIDDEN_PREFIXES = ["/login", "/dashboard"];

const items: CardNavItem[] = [
  {
    label: "About",
    bgColor: "#0E1116",
    textColor: "#FFFFFF",
    links: [
      {
        label: "Visi & Misi",
        href: "/#about",
        ariaLabel: "Visi dan Misi",
      },
    ],
  },
  {
    label: "Laboratories",
    bgColor: "#1A1F2A",
    textColor: "#FFFFFF",
    links: [
      {
        label: "Daftar Lab",
        href: "/",
        ariaLabel: "Daftar laboratorium",
      },
    ],
  },
  {
    label: "Team",
    bgColor: "#3A2A1F",
    textColor: "#F5C24A",
    links: [
      {
        label: "Aslab Aktif",
        href: "/team",
        ariaLabel: "Asisten laboratorium aktif",
      },
    ],
  },
];

export default function NavbarClient() {
  const pathname = usePathname();
  if (
    HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  ) {
    return null;
  }

  return (
    <CardNav
      items={items}
      ease="power3.out"
      baseColor="#FAFAFA"
      buttonBgColor="#0066FF"
      buttonTextColor="#FFFFFF"
      ctaHref="/laboratories"
    />
  );
}
