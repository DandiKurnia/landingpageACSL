import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const body = await request.json();
    const { name, email, region, role, avatar } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Name, email, and role are required' }, { status: 400 });
    }

    // Verify user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check email uniqueness if email is changing
    if (email !== existingUser.email) {
      const emailDup = await prisma.user.findUnique({
        where: { email }
      });
      if (emailDup) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }
    }

    // Find the role
    const dbRole = await prisma.role.findUnique({
      where: { name: role }
    });
    if (!dbRole) {
      return NextResponse.json({ error: `Role '${role}' not found` }, { status: 400 });
    }

    // Update user in DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        region: region === 'None' ? null : region,
        roleId: dbRole.id,
      }
    });

    // Handle avatar photo update/creation
    if (avatar) {
      const existingPhoto = await prisma.photo.findFirst({
        where: { userId: userId, type: 'profile' }
      });
      if (existingPhoto) {
        await prisma.photo.update({
          where: { id: existingPhoto.id },
          data: { url: avatar }
        });
      } else {
        await prisma.photo.create({
          data: {
            userId: userId,
            url: avatar,
            type: 'profile'
          }
        });
      }
    } else {
      // If avatar is removed, delete the profile photo record
      await prisma.photo.deleteMany({
        where: { userId: userId, type: 'profile' }
      });
    }

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      region: updatedUser.region,
      role: role,
      avatar: avatar || null
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message || 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Verify user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete photos first to ensure foreign key constraint integrity
    await prisma.photo.deleteMany({
      where: { userId: userId }
    });

    // Delete user
    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete user' }, { status: 500 });
  }
}
