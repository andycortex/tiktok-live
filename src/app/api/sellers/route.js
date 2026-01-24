import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sellers = await prisma.seller.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return NextResponse.json(
      { error: "Failed to fetch sellers" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, status, commission } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingSeller = await prisma.seller.findUnique({
      where: { email },
    });

    if (existingSeller) {
      return NextResponse.json(
        { error: "Seller with this email already exists" },
        { status: 400 },
      );
    }

    const newSeller = await prisma.seller.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        status: status || "active",
        commission: commission ? parseFloat(commission) : 0,
      },
    });

    return NextResponse.json(newSeller, { status: 201 });
  } catch (error) {
    console.error("Error creating seller:", error);
    return NextResponse.json(
      { error: "Failed to create seller" },
      { status: 500 },
    );
  }
}
