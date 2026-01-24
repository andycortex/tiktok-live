import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const zones = await prisma.zone.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(zones);
  } catch (error) {
    console.error("Error fetching zones:", error);
    return NextResponse.json(
      { error: "Failed to fetch zones" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      region,
      price,
      deliveryTime,
      instructions,
      schedule,
      coverage,
    } = body;

    // Basic validation
    if (!name || !region || !price || !deliveryTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newZone = await prisma.zone.create({
      data: {
        name,
        region,
        price: parseFloat(price),
        deliveryTime,
        instructions,
        schedule,
        coverage,
        status: "active",
      },
    });

    return NextResponse.json(newZone, { status: 201 });
  } catch (error) {
    console.error("Error creating zone:", error);
    return NextResponse.json(
      { error: "Failed to create zone" },
      { status: 500 },
    );
  }
}
