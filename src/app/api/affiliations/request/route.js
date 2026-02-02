import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { userId, productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    // Create affiliation (Auto-approve ACTIVE)
    const affiliation = await prisma.affiliation.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        status: "ACTIVE", // Auto-approve
      },
    });

    return NextResponse.json(affiliation, { status: 201 });
  } catch (error) {
    // Handle unique constraint violation (already affiliated)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Already affiliated" },
        { status: 400 },
      );
    }

    console.error("Error requesting affiliation:", error);
    return NextResponse.json(
      { error: "Failed to create affiliation" },
      { status: 500 },
    );
  }
}
