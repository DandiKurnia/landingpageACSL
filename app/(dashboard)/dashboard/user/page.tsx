import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { UserTable } from "@/components/dashboard/UserTable";

export const metadata: Metadata = {
  title: "Daftar User · Dasbor ACSL",
  description: "Kelola asisten dan administrator di sistem ACSL.",
};

export default async function UserDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Fetch all users including roles to display in the table
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      region: true,
      createdAt: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  // Map the fetched data to conform to the component's expected format
  const mappedUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    region: u.region,
    createdAt: u.createdAt.toISOString(),
    role: u.role.name,
  }));

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <header className="flex flex-col gap-1 mb-8">
        <h1 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0E1116]">
          Manajemen User
        </h1>
        <p className="text-[14.5px] leading-[1.55] text-[#4B5563]">
          Daftar asisten laboratorium dan administrator yang terdaftar di sistem ACSL.
        </p>
      </header>

      <UserTable initialUsers={mappedUsers} />
    </div>
  );
}
