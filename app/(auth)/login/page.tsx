import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Masuk · ACSL",
  description:
    "Masuk ke dasbor asisten Advanced Computing and Systems Laboratory.",
};

export default async function LoginPage() {
  // Already signed in — no reason to show the form.
  const session = await getSession();
  if (session) redirect("/");

  return (
    <main className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#FBFCFE] px-5 py-10 sm:px-6">
      {/* Atmospheric backdrop — the brand's blue-top / yellow-bottom radial
          language at low alpha, so the white card reads as one step above its
          surface. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 40% at 85% 6%, rgba(0,102,255,0.07), transparent 60%), radial-gradient(44% 40% at 12% 96%, rgba(245,194,74,0.06), transparent 65%)",
        }}
      />

      {/* Login card */}
      <div className="w-full max-w-[420px] rounded-2xl border border-[#0E1116]/8 bg-white p-7 shadow-[0_24px_60px_-28px_rgba(14,17,22,0.22)] sm:p-9">
        <h1 className="mt-5 text-balance text-[clamp(1.7rem,3.4vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#0E1116]">
          Selamat datang
        </h1>

        <div className="mt-8">
          <LoginForm />
        </div>

        <p className="mt-7 border-t border-[#0E1116]/10 pt-6 text-[13.5px] leading-relaxed text-[#3F4753]">
          Belum punya akses?{" "}
          <span className="font-medium text-[#0E1116]">
            Hubungi koordinator lab
          </span>{" "}
          di region kamu untuk dibuatkan akun.
        </p>
      </div>

      <p className="mt-8 text-center text-[12px] text-[#0E1116]/45">
        © {new Date().getFullYear()} Advanced Computing and Systems Laboratory
      </p>
    </main>
  );
}
