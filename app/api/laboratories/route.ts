import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const laboratories = await prisma.laboratory.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(laboratories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch laboratories' }, { status: 500 });
  }
}
