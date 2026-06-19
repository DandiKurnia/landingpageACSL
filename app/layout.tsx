import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import NavbarClient from '@/components/layout/NavbarClient';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WebACSL',
  description: 'Laboratory Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.className} bg-gray-50`}>
        <NavbarClient />
        {children}
      </body>
    </html>
  );
}
