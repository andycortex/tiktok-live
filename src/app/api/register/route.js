import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, apellido, email, password, whatsapp, ciudad, direccion, empresa, tiktok } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        whatsapp,
        ciudad,
        direccion,
        empresa,
        tiktok,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}