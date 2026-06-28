import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { roleLabel } from "@/lib/roles";
import { DashboardLayoutClient } from "@/components/dashboard/DashboardLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Guard: the whole (dashboard) group requires a valid session.
  const session = await getSession();
  if (!session) redirect("/login");

  // Identity for the sidebar footer. If the DB is unreachable we still render
  // the shell using whatever the session carries, rather than 500-ing.
  let identity = { name: "Aslab", role: session.role };
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { name: true, role: { select: { name: true } } },
    });
    if (user) identity = { name: user.name, role: user.role.name };
  } catch {
    // Keep the session-derived fallback.
  }

  return (
    <DashboardLayoutClient name={identity.name} role={roleLabel(identity.role)}>
      {children}
    </DashboardLayoutClient>
  );
}
