"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export type LoginState = {
  error?: string;
  // Preserve the typed email across a failed round-trip so the field doesn't clear.
  email?: string;
};

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi.", email };
  }

  let user: { id: number; password: string | null; role: { name: string } } | null =
    null;
  try {
    user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true, role: { select: { name: true } } },
    });
  } catch {
    return {
      error: "Tidak dapat terhubung ke server. Coba lagi sebentar.",
      email,
    };
  }

  // Always run a bcrypt comparison, even when the user is missing, so the
  // response time doesn't reveal whether an email is registered.
  const hash =
    user?.password ?? "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinv";
  const valid = await bcrypt.compare(password, hash);

  if (!user || !user.password || !valid) {
    return { error: "Email atau kata sandi salah.", email };
  }

  // Only 'admin' role is allowed to access the dashboard.
  if (user.role.name !== "admin") {
    return { error: "Email atau kata sandi salah.", email };
  }

  await createSession({ userId: user.id, role: user.role.name });
  redirect("/dashboard");
}
