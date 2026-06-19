import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(galleries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch galleries' }, { status: 500 });
  }
}
