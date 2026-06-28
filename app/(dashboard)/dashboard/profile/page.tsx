import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { ProfileClient } from "./ProfileClient";

export const metadata = {
  title: "Profil Saya · ACSL",
  description: "Kelola profil dan ubah kata sandi portal asisten ACSL.",
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Fetch the logged-in user details from database
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      region: true,
      role: {
        select: {
          name: true,
        },
      },
      photos: {
        where: { type: "profile" },
        select: { url: true },
        take: 1,
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Format the user object
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    region: user.region || "Semua Region",
    roleName: user.role.name,
    avatar: user.photos[0]?.url || null,
  };

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <ProfileClient user={userData} />
    </div>
  );
}
