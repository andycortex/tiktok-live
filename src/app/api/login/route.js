import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    // Set JWT as an HTTP-only cookie
    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });

    const userDataToReturn = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      tiktok: user.tiktok, // Include tiktok username
    };

    return new NextResponse(
      JSON.stringify({
        message: "Login successful",
        user: userDataToReturn,
      }),
      {
        status: 200,
        headers: { "Set-Cookie": serialized },
      }
    );
  } catch (error) {
    console.error("Login API: Error in try block:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
