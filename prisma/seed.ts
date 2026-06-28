import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ----- Seed Data -----
const ROLES = [
  { name: 'admin' },
  { name: 'asisten_shift' },
  { name: 'ketua_jkl' },
  { name: 'ketua_mcs' },
  { name: 'ketua_jkd' },
  { name: 'ketua_fpga' },
];

const ADMIN_USER = {
  name: 'Admin Webacsl',
  email: 'admin@webacsl.com',
  password: 'admin123',
};

const ASLAB_USERS = [
  { name: 'Budi Santoso', email: 'budi@webacsl.com', role: 'ketua_jkd', region: 'Depok' },
  { name: 'Siti Aminah', email: 'siti@webacsl.com', role: 'asisten_shift', region: 'Depok' },
  { name: 'Andi Wijaya', email: 'andi@webacsl.com', role: 'ketua_jkl', region: 'Kalimalang' },
  { name: 'Dewi Lestari', email: 'dewi@webacsl.com', role: 'ketua_fpga', region: 'Karawaci' },
  { name: 'Rian Pratama', email: 'rian@webacsl.com', role: 'ketua_mcs', region: 'Kalimalang' },
  { name: 'Putri Maharani', email: 'putri@webacsl.com', role: 'asisten_shift', region: 'Depok' },
  { name: 'Fajar Nugroho', email: 'fajar@webacsl.com', role: 'asisten_shift', region: 'Karawaci' },
  { name: 'Nurul Hidayah', email: 'nurul@webacsl.com', role: 'asisten_shift', region: 'Kalimalang' },
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

  // Seed Roles
  console.log('👥 Creating roles...');
  const roles = await Promise.all(
    ROLES.map((role) => prisma.role.create({ data: role })),
  );
  const rolesByName = new Map(roles.map((r) => [r.name, r]));
  const adminRole = rolesByName.get('admin')!;

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
    const role = rolesByName.get(aslab.role)!;
    const user = await prisma.user.create({
      data: {
        name: aslab.name,
        email: aslab.email,
        password,
        roleId: role.id,
        region: aslab.region,
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
