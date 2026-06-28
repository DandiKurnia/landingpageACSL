"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  GoSearch,
  GoX,
  GoCalendar,
  GoLocation,
  GoShield,
  GoPlus,
  GoUpload,
  GoTrash,
  GoAlert,
} from "react-icons/go";
import { roleLabel } from "@/lib/roles";

interface User {
  id: number;
  name: string;
  email: string;
  region: string | null;
  createdAt: string;
  role: string;
}

interface UserTableProps {
  initialUsers: User[];
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserTable({ initialUsers }: UserTableProps) {
  // Use state for users to support mock client-side additions, edits, and deletions
  const [users, setUsers] = useState<User[]>(initialUsers);
  
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form Field States
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRegion, setFormRegion] = useState("Depok");
  const [formRole, setFormRole] = useState("asisten_shift");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Drag and drop states
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prevent background scrolling when a modal is open
  useEffect(() => {
    if (isFormOpen || isDeleteOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isFormOpen, isDeleteOpen]);

  // Handle client-side mounting for Portal rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique list of regions and roles for filtering options
  const regions = useMemo(() => {
    const list = new Set(users.map((u) => u.region).filter(Boolean));
    return Array.from(list) as string[];
  }, [users]);

  const roles = useMemo(() => {
    const list = new Set(users.map((u) => u.role).filter(Boolean));
    return Array.from(list) as string[];
  }, [users]);

  // Filtered users based on search text and selected dropdowns
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRegion =
        regionFilter === "all" || user.region === regionFilter;

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRegion && matchesRole;
    });
  }, [users, search, regionFilter, roleFilter]);

  const clearFilters = () => {
    setSearch("");
    setRegionFilter("all");
    setRoleFilter("all");
  };

  // Helper for role badge colors
  const getRoleBadgeClasses = (role: string) => {
    if (role === "admin") {
      return "bg-rose-50 text-rose-700 ring-rose-600/10";
    }
    if (role.startsWith("ketua_")) {
      return "bg-indigo-50 text-indigo-700 ring-indigo-600/10";
    }
    return "bg-blue-50 text-blue-700 ring-blue-600/10";
  };

  // Helper for region badge colors
  const getRegionBadgeClasses = (region: string | null) => {
    if (!region) return "bg-slate-50 text-slate-500 ring-slate-600/10";
    if (region === "Depok") {
      return "bg-amber-50 text-amber-700 ring-amber-600/10";
    }
    if (region === "Kalimalang") {
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";
    }
    return "bg-violet-50 text-violet-700 ring-violet-600/10";
  };

  // Drag-and-drop event handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
      }
    }
  };

  // Open modal in Create mode
  const openCreateModal = () => {
    setSelectedUser(null);
    setFormName("");
    setFormEmail("");
    setFormRegion("Depok");
    setFormRole("asisten_shift");
    setAvatarPreview(null);
    setIsFormOpen(true);
  };

  // Open modal in Edit mode
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRegion(user.region ?? "Depok");
    setFormRole(user.role);
    setAvatarPreview(null); // Clear previous preview
    setIsFormOpen(true);
  };

  // Open Delete confirmation
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  // Save changes (Mock Create/Edit)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    if (selectedUser) {
      // Edit User
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                name: formName,
                email: formEmail,
                region: formRegion === "None" ? null : formRegion,
                role: formRole,
              }
            : u
        )
      );
    } else {
      // Create User
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser: User = {
        id: newId,
        name: formName,
        email: formEmail,
        region: formRegion === "None" ? null : formRegion,
        role: formRole,
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [newUser, ...prev]);
    }
    setIsFormOpen(false);
  };

  // Confirm delete (Mock Delete)
  const handleDelete = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setIsDeleteOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Search & Filters Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm shadow-slate-100/40">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          {/* Search input */}
          <div className="relative flex-1 md:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <GoSearch className="size-4" />
            </span>
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <GoX className="size-4" />
              </button>
            )}
          </div>

          {/* Region filter */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all cursor-pointer"
          >
            <option value="all">Semua Region</option>
            {regions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all cursor-pointer"
          >
            <option value="all">Semua Jabatan</option>
            {roles.map((rl) => (
              <option key={rl} value={rl}>
                {roleLabel(rl)}
              </option>
            ))}
          </select>

          {/* Reset Filters Link */}
          {(search || regionFilter !== "all" || roleFilter !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-[#0066FF] px-2 py-1 transition-colors"
            >
              <GoX className="size-3.5" />
              Bersihkan Filter
            </button>
          )}
        </div>

        {/* Add User Button */}
        <div className="flex shrink-0">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex w-full md:w-auto items-center justify-center gap-1.5 rounded-lg bg-[#0066FF] px-4 py-2 text-[13.5px] font-semibold text-white shadow-sm shadow-[#0066FF]/10 hover:bg-[#0055DD] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
          >
            <GoPlus className="size-4" />
            Tambah User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-100/40">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-3 border border-slate-100">
              <GoSearch className="size-5" />
            </span>
            <h3 className="text-[14.5px] font-semibold text-slate-800">
              User Tidak Ditemukan
            </h3>
            <p className="mt-1 text-[13px] text-slate-500 max-w-[35ch]">
              Coba sesuaikan kata kunci pencarian atau ubah filter
              region/jabatan Anda.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13.5px] text-slate-600">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th scope="col" className="px-6 py-3.5">
                    Nama & Email
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Region
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Jabatan
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Tanggal Terdaftar
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Name & Email (Avatar included) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0066FF]/8 text-[12px] font-bold text-[#0066FF] ring-1 ring-[#0066FF]/10"
                        >
                          {initials(user.name)}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-slate-900 truncate">
                            {user.name}
                          </span>
                          <span className="text-[12.5px] text-slate-400 truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Region */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${getRegionBadgeClasses(user.region)}`}
                      >
                        <GoLocation className="size-3" />
                        {user.region ?? "Semua Region"}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium ring-1 ring-inset ${getRoleBadgeClasses(user.role)}`}
                      >
                        <GoShield className="size-3" />
                        {roleLabel(user.role)}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-[12.5px]">
                      <div className="flex items-center gap-1.5">
                        <GoCalendar className="size-3.5" />
                        {new Date(user.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-[13px] font-medium">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(user)}
                          className="text-[#0066FF] hover:text-[#0055DD] hover:underline"
                        >
                          Edit
                        </button>
                        <span className="text-slate-200" aria-hidden="true">|</span>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(user)}
                          className="text-rose-600 hover:text-rose-800 hover:underline"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODALS PORTAL (Rendered directly into document.body to bypass layout constraints) */}
      {mounted && typeof document !== "undefined"
        ? createPortal(
            <>
              {/* CREATE & EDIT MODAL */}
              {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-200">
                  <div 
                    className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                    role="dialog"
                    aria-modal="true"
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4.5">
                      <h2 className="text-[17px] font-bold text-slate-800 tracking-tight">
                        {selectedUser ? "Edit Detail User" : "Tambah User Baru"}
                      </h2>
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                      >
                        <GoX className="size-5" />
                      </button>
                    </div>

                    {/* Modal Form Content */}
                    <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
                      {/* Name Field */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-slate-700">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Masukkan nama lengkap..."
                          className="w-full px-3 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-slate-700">Alamat Email</label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="name@webacsl.com"
                          className="w-full px-3 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                        />
                      </div>

                      {/* Region & Role Fields (Side-by-side) */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] font-semibold text-slate-700">Region</label>
                          <select
                            value={formRegion}
                            onChange={(e) => setFormRegion(e.target.value)}
                            className="w-full px-3 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all cursor-pointer"
                          >
                            <option value="None">Semua Region (None)</option>
                            <option value="Depok">Depok</option>
                            <option value="Kalimalang">Kalimalang</option>
                            <option value="Karawaci">Karawaci</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] font-semibold text-slate-700">Jabatan</label>
                          <select
                            value={formRole}
                            onChange={(e) => setFormRole(e.target.value)}
                            className="w-full px-3 py-2 text-[13.5px] rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all cursor-pointer"
                          >
                            <option value="admin">Administrator</option>
                            <option value="asisten_shift">Asisten Shift</option>
                            <option value="ketua_jkd">Ketua JKD</option>
                            <option value="ketua_jkl">Ketua JKL</option>
                            <option value="ketua_mcs">Ketua MCS</option>
                            <option value="ketua_fpga">Ketua FPGA</option>
                          </select>
                        </div>
                      </div>

                      {/* Drag and Drop Image Upload Section */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-slate-700">Avatar Profil</label>
                        
                        <input
                          type="file"
                          id="avatar-upload"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />

                        {avatarPreview ? (
                          /* Image Preview Mode */
                          <div className="relative flex items-center justify-between border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                              <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="size-12 rounded-full object-cover border border-slate-200 ring-2 ring-white"
                              />
                              <div>
                                <span className="block text-[12.5px] font-semibold text-slate-800">Preview Berhasil</span>
                                <span className="block text-[11px] text-[#0066FF] font-medium">Gambar siap diunggah</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setAvatarPreview(null)}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 transition-colors"
                              title="Hapus gambar"
                            >
                              <GoTrash className="size-4.5" />
                            </button>
                          </div>
                        ) : (
                          /* Drag and Drop Area */
                          <div
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer ${
                              dragActive
                                ? "border-[#0066FF] bg-[#0066FF]/5"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                            }`}
                          >
                            <span className="flex size-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-2 border border-slate-100">
                              <GoUpload className="size-4.5" />
                            </span>
                            <p className="text-[12.5px] font-semibold text-slate-700">
                              Tarik & lepas avatar ke sini
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              atau klik untuk memilih file gambar
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Modal Footer Buttons */}
                      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-[13px] font-semibold text-white bg-[#0066FF] hover:bg-[#0055DD] rounded-lg transition-colors shadow-sm shadow-[#0066FF]/10"
                        >
                          {selectedUser ? "Simpan Perubahan" : "Simpan User"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* DELETE CONFIRMATION MODAL */}
              {isDeleteOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-200">
                  <div 
                    className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex size-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 border border-rose-100 shrink-0">
                        <GoAlert className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-800 tracking-tight">Hapus User</h3>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">
                          Apakah Anda yakin ingin menghapus user <span className="font-semibold text-slate-700">{selectedUser.name}</span> ({selectedUser.email})? Tindakan ini tidak dapat dibatalkan.
                        </p>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsDeleteOpen(false)}
                        className="px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 text-[13px] font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm shadow-rose-600/10"
                      >
                        Ya, Hapus
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>,
            document.body
          )
        : null}
    </div>
  );
}
