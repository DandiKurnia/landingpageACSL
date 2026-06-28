"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GoHome,
  GoPerson,
  GoPeople,
  GoSignOut,
  GoGrabber,
  GoX,
} from "react-icons/go";
import { logout } from "@/app/(dashboard)/dashboard/actions";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: GoHome },
  { label: "User", href: "/dashboard/user", icon: GoPeople },
  { label: "Profil Saya", href: "/dashboard/profile", icon: GoPerson },
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function DashboardSidebar({
  name,
  role,
  collapsed,
  setCollapsed,
  openMobile,
  setOpenMobile,
}: {
  name: string;
  role: string;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (v: boolean) => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Backdrop for the mobile drawer */}
      {openMobile ? (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpenMobile(false)}
          className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      ) : null}

      <aside
        id="dashboard-nav"
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-slate-200 bg-white text-slate-800 transition-transform duration-300 ease-in-out lg:z-20 ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        } ${
          collapsed ? "lg:-translate-x-full" : "lg:translate-x-0"
        }`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between px-5 pb-5 pt-6 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <img
              src="/images/logo.png"
              alt="ACSL Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-sans text-[14.5px] font-bold tracking-tight text-slate-900 leading-tight">
                ACSL
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase leading-none mt-0.5">
                Lab Portal
              </span>
            </div>
          </Link>

          {/* Close button on mobile / Collapse button on desktop */}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth >= 1024) {
                setCollapsed(true);
              } else {
                setOpenMobile(false);
              }
            }}
            className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors focus-visible:outline-2 focus-visible:outline-[#0066FF]"
            aria-label="Tutup sidebar"
          >
            <GoX className="size-5 lg:hidden" />
            <GoGrabber className="size-5 hidden lg:block" />
          </button>
        </div>

        {/* Primary nav */}
        <nav aria-label="Navigasi dasbor" className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpenMobile(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] ${
                      active
                        ? "bg-[#0066FF] text-white shadow-sm shadow-[#0066FF]/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      aria-hidden
                      className={`size-[18px] transition-colors duration-150 ${
                        active ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Identity + logout */}
        <div className="border-t border-slate-100 p-3 bg-slate-50/50">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <span
              aria-hidden
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[12px] font-bold text-slate-700 ring-1 ring-slate-200"
            >
              {initials(name)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-semibold text-slate-800">
                {name}
              </span>
              <span className="block truncate text-[12px] text-slate-500 font-medium leading-none mt-0.5">
                {role}
              </span>
            </span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
            >
              <GoSignOut aria-hidden className="size-[18px] text-slate-400" />
              Keluar
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
