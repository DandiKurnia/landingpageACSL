# ACSL Portal — Advanced Computing and Systems Laboratory

ACSL (Advanced Computing and Systems Laboratory) adalah website portal riset dan manajemen praktikum untuk asisten laboratorium Universitas Gunadarma di tiga region: Depok, Kalimalang, dan Karawaci.

Website ini dibangun menggunakan Next.js App Router, React, Tailwind CSS, Prisma ORM, dan custom GSAP/IntersectionObserver animation engine untuk menghadirkan visual interaktif yang modern, responsif, dan aksesibel.

---

## 🛠️ Tech Stack & Spesifikasi

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Animasi & Interaksi**: [GSAP](https://gsap.com/) & Native IntersectionObserver
- **Database ORM**: [Prisma ORM](https://www.prisma.io/) dengan PostgreSQL
- **Penyimpanan Media**: AWS S3
- **Bahasa**: TypeScript

---

## 📁 Struktur Folder Utama

```bash
├── app/                       # Next.js App Router routing & pages
│   ├── (auth)/login/          # Halaman portal login administrator
│   ├── (dashboard)/dashboard/ # Panel manajemen asisten (Profile & User Admin)
│   ├── (public)/team/         # Halaman roster struktur organisasi asisten
│   ├── api/                   # API endpoint (auth, upload, profile, users)
│   ├── globals.css            # Konfigurasi Tailwind, CSS Keyframes & Utility kelas
│   ├── layout.tsx             # Root layout global
│   └── page.tsx               # Landing page utama
├── components/                # Komponen modular yang dapat digunakan kembali
│   ├── dashboard/             # Komponen untuk panel dashboard
│   ├── layout/                # Komponen layout (NavbarClient, CardNav, dll)
│   ├── sections/              # Section landing page (Hero, About, Maps, Footer)
│   ├── team/                  # Komponen halaman tim (RegionRoster, MemberCard)
│   └── ScrollReveal.tsx       # Core component pendeteksi scroll reveal (IntersectionObserver)
├── lib/                       # Utility functions, prisma client, database queries
├── prisma/                    # Schema database PostgreSQL dan file seeding data
└── public/                    # Aset statis (Logo, Gambar, Ikon, Background Pattern)
```

---

## ⚡ Sistem Animasi & Aksesibilitas

Website ACSL menerapkan standar motion design premium yang halus, berkinerja tinggi, dan ramah aksesibilitas:

### 1. `ScrollReveal` Component

Menggunakan `IntersectionObserver` untuk memicu animasi CSS ketika elemen masuk ke viewport. Mendukung tipe animasi `up` (geser ke atas), `in` (zoom-in), dan `fade` (transisi opacity biasa) dengan custom delay dan durasi.

### 2. Carousel Roster Horizontal

Menampilkan daftar asisten lab per region dalam format horisontal dengan tombol navigasi elastis (`scale` pada hover, `shrink` pada click) serta mekanisme loop visual asisten yang tidak terputus.

### 3. Dukungan Reduced Motion

Semua animasi menghormati preferensi sistem operasi user (`prefers-reduced-motion: reduce`). Jika fitur ini aktif:

- Elemen reveal akan langsung ditampilkan tanpa transisi gerak.
- Easing scroll carousel beralih dari transisi smooth menjadi instan.

---

## 🚀 Panduan Memulai

### 1. Prasyarat

Pastikan Anda memiliki Node.js dan PostgreSQL terinstal.

### 2. Pemasangan & Setup

Pasang seluruh dependency proyek:

```bash
npm install
```

Salin file lingkungan `.env` dan konfigurasikan database URL:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/webacsl?schema=public"
```

Jalankan migrasi database dan seed data awal asisten:

```bash
npx prisma migrate dev
npx prisma db seed
```

### 3. Perintah Pengembangan

Jalankan server pengembangan lokal:

```bash
npm run dev
```

Aplikasi akan aktif di [http://localhost:3080](http://localhost:3080).

### 4. Build Produksi

Kompilasi proyek untuk rilis produksi:

```bash
npm run build
```

### 5. Linting Kode

Periksa kualitas penulisan kode dengan ESLint:

```bash
npm run lint
```

docker exec -it webacsl_db psql -U postgres -d webacsl -c "UPDATE photos SET url = REPLACE(url, 'http://10.254.200.211:9000', 'https://acsl.danbildad.web.id') WHERE url LIKE 'http://10.254.200.211:9000%';"
