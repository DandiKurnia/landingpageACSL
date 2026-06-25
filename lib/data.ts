// Static content for the landing page. Mirrors the Prisma seed so the marketing
// surface renders without a database connection. When the DB is the source of
// truth (detail pages, admin), fetch from Prisma instead.

export type LabRegion = {
  name: string;
  campus: string;
  address: string;
  description: string;
  image: string;
  // Search query handed to the Google Maps embed so the pin lands on the
  // right campus without needing an API key.
  mapQuery: string;
};

export type GalleryItem = {
  title: string;
  imageUrl: string;
};

export type TeamMember = {
  name: string;
  role: string;
  region: string;
  avatar: string;
};

export const LAB_REGIONS: LabRegion[] = [
  {
    name: "Depok",
    campus: "Kampus D",
    address: "Jl. Margonda Raya, Pondok Cina, Depok",
    description:
      "Pusat kegiatan praktikum ACSL dengan jadwal terpadat dan perangkat jaringan terbaru.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
    mapQuery: "Universitas Gunadarma Kampus D, Jl. Margonda Raya, Depok",
  },
  {
    name: "Kalimalang",
    campus: "Kampus E",
    address: "Jl. KH. Noer Ali, Kalimalang, Bekasi",
    description:
      "Melayani praktikum wilayah Bekasi dengan fokus jaringan komputer dan komputasi bergerak.",
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1200&q=80",
    mapQuery:
      "Universitas Gunadarma Kampus E, Jl. KH. Noer Ali, Kalimalang, Bekasi",
  },
  {
    name: "Karawaci",
    campus: "Kampus K",
    address: "Jl. Imam Bonjol, Karawaci, Tangerang",
    description:
      "Simpul riset terapan untuk eksperimen FPGA dan pengembangan perangkat keras.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    mapQuery: "Universitas Gunadarma Kampus Karawaci, Jl. Imam Bonjol, Tangerang",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Workshop Pemrograman 2024",
    imageUrl: "https://picsum.photos/seed/gallery-1/800/600",
  },
  {
    title: "Seminar AI dan Machine Learning",
    imageUrl: "https://picsum.photos/seed/gallery-2/800/600",
  },
  {
    title: "Hackathon Universitas",
    imageUrl: "https://picsum.photos/seed/gallery-3/800/600",
  },
  {
    title: "Pelatihan Cybersecurity",
    imageUrl: "https://picsum.photos/seed/gallery-4/800/600",
  },
  {
    title: "Kegiatan Praktikum Mahasiswa",
    imageUrl: "https://picsum.photos/seed/gallery-5/800/600",
  },
  {
    title: "Kunjungan Industri",
    imageUrl: "https://picsum.photos/seed/gallery-6/800/600",
  },
  {
    title: "Penelitian Mahasiswa",
    imageUrl: "https://picsum.photos/seed/gallery-7/800/600",
  },
  {
    title: "Sharing Session Alumni",
    imageUrl: "https://picsum.photos/seed/gallery-8/800/600",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Rizky",
    role: "Asisten JKD",
    region: "Depok",
    avatar: "/images/asisten/rizky.jpg",
  },
  {
    name: "Siti Aminah",
    role: "Asisten JKD",
    region: "Depok",
    avatar: "/images/asisten/rizky.jpg",
  },
  {
    name: "Siti Aminah",
    role: "Asisten JKD",
    region: "Depok",
    avatar: "/images/asisten/rizky.jpg",
  },
  {
    name: "Siti Aminah",
    role: "Asisten JKD",
    region: "Depok",
    avatar: "/images/asisten/rizky.jpg",
  },
  {
    name: "Siti Aminah",
    role: "Asisten JKD",
    region: "Depok",
    avatar: "/images/asisten/rizky.jpg",
  },
  {
    name: "Andi Wijaya",
    role: "Asisten JKL",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=andi@webacsl.com",
  },
  {
    name: "Andi Wijaya",
    role: "Asisten JKL",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=andi@webacsl.com",
  },
  {
    name: "Andi Wijaya",
    role: "Asisten JKL",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=andi@webacsl.com",
  },
  {
    name: "Andi Wijaya",
    role: "Asisten JKL",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=andi@webacsl.com",
  },
  {
    name: "Andi Wijaya",
    role: "Asisten JKL",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=andi@webacsl.com",
  },
  {
    name: "Andi Wijaya",
    role: "Asisten JKL",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=andi@webacsl.com",
  },
  {
    name: "Andi Wijaya",
    role: "Asisten JKL",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=andi@webacsl.com",
  },
  {
    name: "Dewi Lestari",
    role: "Asisten FPGA",
    region: "Karawaci",
    avatar: "https://i.pravatar.cc/400?u=dewi@webacsl.com",
  },
  {
    name: "Rian Pratama",
    role: "Asisten KB",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=rian@webacsl.com",
  },
  {
    name: "Putri Maharani",
    role: "Asisten JKD",
    region: "Depok",
    avatar: "https://i.pravatar.cc/400?u=putri@webacsl.com",
  },
  {
    name: "Fajar Nugroho",
    role: "Asisten FPGA",
    region: "Karawaci",
    avatar: "https://i.pravatar.cc/400?u=fajar@webacsl.com",
  },
  {
    name: "Nurul Hidayah",
    role: "Asisten JKL",
    region: "Kalimalang",
    avatar: "https://i.pravatar.cc/400?u=nurul@webacsl.com",
  },
];
