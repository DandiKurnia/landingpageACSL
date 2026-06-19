import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ----- Seed Data -----
const ROLES = [
  { name: 'admin' },
  { name: 'aslab' },
];

const ADMIN_USER = {
  name: 'Admin Webacsl',
  email: 'admin@webacsl.com',
  password: 'admin123',
};

const ASLAB_USERS = [
  { name: 'Budi Santoso', email: 'budi@webacsl.com' },
  { name: 'Siti Aminah', email: 'siti@webacsl.com' },
  { name: 'Andi Wijaya', email: 'andi@webacsl.com' },
  { name: 'Dewi Lestari', email: 'dewi@webacsl.com' },
  { name: 'Rian Pratama', email: 'rian@webacsl.com' },
  { name: 'Putri Maharani', email: 'putri@webacsl.com' },
  { name: 'Fajar Nugroho', email: 'fajar@webacsl.com' },
  { name: 'Nurul Hidayah', email: 'nurul@webacsl.com' },
];

const LABORATORIES = [
  {
    name: 'Depok',
    description: 'Laboratorium Kampus D Universitas Gunadarma di Depok. Dilengkapi dengan fasilitas modern untuk mendukung kegiatan praktikum dan penelitian.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800',
  },
  {
    name: 'Kalimalang',
    description: 'Laboratorium Kampus E di Kalimalang, melayani praktikum mahasiswa dan riset teknologi.',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
  },
  {
    name: 'Karawaci',
    description: 'Laboratorium Kampus Karawaci dengan fokus pada penelitian terapan dan pengembangan inovasi.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
  },
  {
    name: 'Salemba',
    description: 'Laboratorium Kampus Salemba yang menyediakan lingkungan belajar berbasis teknologi terkini.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800',
  },
  {
    name: 'Cengkareng',
    description: 'Laboratorium Kampus Cengkareng dengan fasilitas lengkap untuk eksplorasi ilmu komputer.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800',
  },
];

const GALLERY_TITLES = [
  'Workshop Pemrograman 2024',
  'Seminar AI dan Machine Learning',
  'Hackathon Universitas',
  'Pelatihan Cybersecurity',
  'Kegiatan Praktikum Mahasiswa',
  'Kunjungan Industri',
  'Penelitian Mahasiswa',
  'Sharing Session Alumni',
  'Open House Laboratorium',
  'Pelatihan IoT dan Robotics',
  'Kegiatan Bakti Sosial',
  'Kompetisi Programming',
];

function randomPhoto(seed: string, type: 'profile' | 'gallery' = 'profile'): string {
  return `https://i.pravatar.cc/400?u=${encodeURIComponent(seed)}`;
}

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.gallery.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.laboratory.deleteMany();

  // Seed Roles
  console.log('👥 Creating roles...');
  const roles = await Promise.all(
    ROLES.map((role) => prisma.role.create({ data: role })),
  );
  const adminRole = roles.find((r) => r.name === 'admin')!;
  const aslabRole = roles.find((r) => r.name === 'aslab')!;

  // Seed Admin User
  console.log('👤 Creating admin user...');
  const adminPassword = await bcrypt.hash(ADMIN_USER.password, 10);
  const adminUser = await prisma.user.create({
    data: {
      name: ADMIN_USER.name,
      email: ADMIN_USER.email,
      password: adminPassword,
      roleId: adminRole.id,
    },
  });

  // Admin Profile Photo
  await prisma.photo.create({
    data: {
      userId: adminUser.id,
      url: randomPhoto(ADMIN_USER.email, 'profile'),
      type: 'profile',
    },
  });

  // Seed Aslab Users
  console.log('👥 Creating aslab users...');
  const aslabUsers = [];
  for (const aslab of ASLAB_USERS) {
    const password = await bcrypt.hash('aslab123', 10);
    const user = await prisma.user.create({
      data: {
        name: aslab.name,
        email: aslab.email,
        password,
        roleId: aslabRole.id,
      },
    });
    aslabUsers.push(user);

    // Profile photo
    await prisma.photo.create({
      data: {
        userId: user.id,
        url: randomPhoto(aslab.email, 'profile'),
        type: 'profile',
      },
    });
  }

  // Seed Laboratories
  console.log('🏢 Creating laboratories...');
  for (const lab of LABORATORIES) {
    await prisma.laboratory.create({ data: lab });
  }

  // Seed Gallery
  console.log('🖼️ Creating gallery items...');
  for (let i = 0; i < GALLERY_TITLES.length; i++) {
    const title = GALLERY_TITLES[i];
    await prisma.gallery.create({
      data: {
        title,
        imageUrl: `https://picsum.photos/seed/gallery-${i + 1}/800/600`,
      },
    });
  }

  console.log('✅ Seed completed!');
  console.log(`   - ${ROLES.length} roles`);
  console.log(`   - ${1 + ASLAB_USERS.length} users (1 admin + ${ASLAB_USERS.length} aslab)`);
  console.log(`   - ${LABORATORIES.length} laboratories`);
  console.log(`   - ${1 + ASLAB_USERS.length} profile photos`);
  console.log(`   - ${GALLERY_TITLES.length} gallery items`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
