import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { 
        role: true, 
        photos: {
          where: { type: 'profile' },
          take: 1
        } 
      },
      orderBy: { createdAt: 'desc' },
    });
    
    const mapped = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      region: u.region,
      createdAt: u.createdAt.toISOString(),
      role: u.role.name,
      avatar: u.photos[0]?.url || null
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, region, role, avatar } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Name, email, and role are required' }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Find the role
    const dbRole = await prisma.role.findUnique({
      where: { name: role }
    });
    if (!dbRole) {
      return NextResponse.json({ error: `Role '${role}' not found` }, { status: 400 });
    }

    // Create user in DB
    const user = await prisma.user.create({
      data: {
        name,
        email,
        region: region === 'None' ? null : region,
        roleId: dbRole.id,
        // Since this is for management, password can be set to null or seeded password
        password: '', 
      }
    });

    // Create photo relation if avatar exists
    if (avatar) {
      await prisma.photo.create({
        data: {
          userId: user.id,
          url: avatar,
          type: 'profile'
        }
      });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      region: user.region,
      createdAt: user.createdAt.toISOString(),
      role: role,
      avatar: avatar || null
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: error.message || 'Failed to create user' }, { status: 500 });
  }
}
