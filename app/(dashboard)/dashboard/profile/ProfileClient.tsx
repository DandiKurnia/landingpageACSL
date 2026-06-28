"use client";

import { useState } from "react";
import { GoShield, GoLocation, GoCheckCircle, GoAlert, GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import { roleLabel } from "@/lib/roles";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  region: string;
  roleName: string;
  avatar: string | null;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProfileClient({ user }: { user: UserProfile }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMsg("Semua field kata sandi wajib diisi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("Kata sandi baru minimal harus 6 karakter.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal memperbarui kata sandi.");
      }

      setSuccessMsg(data.message || "Kata sandi berhasil diperbarui!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5 border-b border-slate-100 pb-5">
        <h1 className="text-[24px] font-bold text-slate-800 tracking-tight leading-none">
          Profil Saya
        </h1>
        <p className="text-[13.5px] text-slate-500">
          Kelola data profil Anda dan perbarui kata sandi keamanan portal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: User Card */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm shadow-slate-100/40 p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="size-24 rounded-full object-cover border border-slate-100 ring-4 ring-slate-50 shadow-sm"
              />
            ) : (
              <span
                aria-hidden
                className="flex size-24 items-center justify-center rounded-full bg-[#0066FF]/8 text-[28px] font-bold text-[#0066FF] border border-[#0066FF]/10 ring-4 ring-[#0066FF]/5"
              >
                {initials(user.name)}
              </span>
            )}
          </div>

          <h2 className="text-[18px] font-bold text-slate-900 tracking-tight leading-snug">
            {user.name}
          </h2>
          <p className="text-[13px] text-slate-400 font-medium mb-4">{user.email}</p>

          {/* User Meta List */}
          <div className="w-full border-t border-slate-100 pt-4 flex flex-col gap-3.5 text-left text-[13px]">
            <div className="flex items-center gap-2.5 text-slate-600">
              <span className="flex size-7 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-400">
                <GoShield className="size-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 font-semibold leading-none uppercase">Jabatan</span>
                <span className="font-semibold text-slate-700 mt-0.5">{roleLabel(user.roleName)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600">
              <span className="flex size-7 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-400">
                <GoLocation className="size-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 font-semibold leading-none uppercase">Region</span>
                <span className="font-semibold text-slate-700 mt-0.5">{user.region}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Password Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm shadow-slate-100/40 p-6">
          <h3 className="text-[16px] font-bold text-slate-800 tracking-tight mb-1.5 flex items-center gap-2">
            <GoLock className="size-4.5 text-[#0066FF]" />
            Ubah Kata Sandi
          </h3>
          <p className="text-[13px] text-slate-400 mb-6">
            Gunakan minimal 6 karakter dengan kombinasi huruf dan angka agar lebih aman.
          </p>

          {/* Messages */}
          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg bg-rose-50 border border-rose-100 p-3.5 text-[13px] text-rose-700 animate-in fade-in slide-in-from-top-1 duration-200">
              <GoAlert className="size-4.5 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg bg-emerald-50 border border-emerald-100 p-3.5 text-[13px] text-emerald-700 animate-in fade-in slide-in-from-top-1 duration-200">
              <GoCheckCircle className="size-4.5 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Current Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-slate-700">
                Kata Sandi Saat Ini
              </label>
              <div className="relative flex items-center">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Masukkan kata sandi lama Anda"
                  className="w-full pl-3.5 pr-10 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  aria-label={showCurrentPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                >
                  {showCurrentPassword ? <GoEyeClosed className="size-4.5" /> : <GoEye className="size-4.5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-slate-700">
                  Kata Sandi Baru
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 karakter"
                    className="w-full pl-3.5 pr-10 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                    aria-label={showNewPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                  >
                    {showNewPassword ? <GoEyeClosed className="size-4.5" /> : <GoEye className="size-4.5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-slate-700">
                  Konfirmasi Kata Sandi Baru
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full pl-3.5 pr-10 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                    aria-label={showConfirmPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                  >
                    {showConfirmPassword ? <GoEyeClosed className="size-4.5" /> : <GoEye className="size-4.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100 mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-[13px] font-semibold text-white bg-[#0066FF] hover:bg-[#0055DD] disabled:bg-[#0066FF]/60 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm shadow-[#0066FF]/10 flex items-center gap-1.5"
              >
                {isLoading ? "Memproses..." : "Perbarui Kata Sandi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
