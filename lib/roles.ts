// Friendly labels for the role slugs stored in the database (see prisma/seed.ts).
export const ROLE_LABELS: Record<string, string> = {
  admin: "Administrator",
  asisten_shift: "Asisten Shift",
  ketua_jkl: "Ketua JKL",
  ketua_mcs: "Ketua MCS",
  ketua_jkd: "Ketua JKD",
  ketua_fpga: "Ketua FPGA",
};

export function roleLabel(slug: string): string {
  return ROLE_LABELS[slug] ?? slug;
}
