import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If no user, send a generic success message to prevent email enumeration
    if (!user) {
      return NextResponse.json({ message: 'If an account with this email exists, a password reset link has been sent.' });
    }

    // --- Create Reset Token ---
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken,
        passwordResetExpires,
      },
    });

    // --- Send Email (log to console for development) ---
    const resetUrl = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    console.log('--- PASSWORD RESET ---');
    console.log('To: ', email);
    console.log('URL: ', resetUrl);
    console.log('----------------------');
    
    // This is a mock email sender. In production, you would configure a real email service.
    // For example, using Nodemailer with an SMTP transport or a service like SendGrid/Resend.
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ethereal-user', // Replace with real credentials in production
            pass: 'ethereal-password'
        }
    });

    // In a real app, you would await transporter.sendMail(...) here.
    // We are just logging to the console for this implementation.

    return NextResponse.json({ message: 'If an account with this email exists, a password reset link has been sent.' });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
