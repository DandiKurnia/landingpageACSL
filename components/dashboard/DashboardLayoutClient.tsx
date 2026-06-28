"use client";

import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { GoGrabber } from "react-icons/go";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  name: string;
  role: string;
}

export function DashboardLayoutClient({
  children,
  name,
  role,
}: DashboardLayoutClientProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <div className="min-h-dvh bg-[#F8FAFC] flex relative overflow-hidden">
      {/* Sidebar Component */}
      <DashboardSidebar
        name={name}
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
      />

      {/* Main content wrapper */}
      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "lg:pl-0" : "lg:pl-[264px]"
        }`}
      >
        {/* Header bar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6 shrink-0 sticky top-0 z-30 shadow-sm shadow-slate-100/40">
          <div className="flex items-center gap-3">
            {/* Burger toggle for sidebar (visible when sidebar is closed/collapsed) */}
            <button
              type="button"
              onClick={() => {
                if (window.innerWidth >= 1024) {
                  setCollapsed((c) => !c);
                } else {
                  setOpenMobile((o) => !o);
                }
              }}
              className={`size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#0066FF] ${
                collapsed ? "lg:flex" : "lg:hidden"
              } ${
                openMobile ? "hidden" : "flex"
              }`}
              aria-label={collapsed ? "Tampilkan sidebar" : "Sembunyikan sidebar"}
            >
              <GoGrabber className="size-5" />
            </button>
            <span className="font-sans text-[15px] font-semibold text-slate-800 tracking-tight">
              Dasbor ACSL
            </span>
          </div>

          {/* Quick status badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Sistem Aktif
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
