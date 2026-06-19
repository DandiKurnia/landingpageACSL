'use client';

import CardNav, { type CardNavItem } from './CardNav';

const items: CardNavItem[] = [
  {
    label: 'About',
    bgColor: '#0E1116',
    textColor: '#FFFFFF',
    links: [
      { label: 'Visi & Misi', href: '/about#visi-misi', ariaLabel: 'Visi dan Misi' },
      { label: 'Struktur', href: '/about#struktur', ariaLabel: 'Struktur organisasi' },
      { label: 'Fasilitas', href: '/about#fasilitas', ariaLabel: 'Fasilitas laboratorium' },
    ],
  },
  {
    label: 'Laboratories',
    bgColor: '#1A1F2A',
    textColor: '#FFFFFF',
    links: [
      { label: 'Daftar Lab', href: '/laboratories', ariaLabel: 'Daftar laboratorium' },
      { label: 'Penelitian', href: '/laboratories#penelitian', ariaLabel: 'Riset aktif' },
    ],
  },
  {
    label: 'Gallery',
    bgColor: '#2A2F3A',
    textColor: '#FFFFFF',
    links: [
      { label: 'Foto Kegiatan', href: '/gallery', ariaLabel: 'Galeri foto' },
      { label: 'Dokumentasi', href: '/gallery#dokumentasi', ariaLabel: 'Dokumentasi kegiatan' },
    ],
  },
  {
    label: 'Team',
    bgColor: '#3A2A1F',
    textColor: '#F5C24A',
    links: [
      { label: 'Aslab Aktif', href: '/team', ariaLabel: 'Asisten laboratorium aktif' },
      { label: 'Alumni', href: '/team#alumni', ariaLabel: 'Alumni aslab' },
    ],
  },
];

export default function NavbarClient() {
  return (
    <CardNav
      items={items}
      ease="power3.out"
      baseColor="#FAFAFA"
      buttonBgColor="#0066FF"
      buttonTextColor="#FFFFFF"
      ctaLabel="Lihat Lab"
      ctaHref="/laboratories"
    />
  );
}