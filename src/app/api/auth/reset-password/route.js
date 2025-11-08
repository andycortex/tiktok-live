import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: 'Invalid request. Token and password are required.' }, { status: 400 });
    }

    // Hash the token to find it in the database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find the user by the hashed token and check if it's still valid
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          gte: new Date(), // gte: greater than or equal to
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired password reset token.' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear the reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return NextResponse.json({ message: 'Password has been reset successfully.' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
