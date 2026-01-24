import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const zone = await prisma.zone.findUnique({
      where: { id: parseInt(id) },
    });

    if (!zone) {
      return NextResponse.json({ error: "Zone not found" }, { status: 404 });
    }

    return NextResponse.json(zone);
  } catch (error) {
    console.error("Error fetching zone:", error);
    return NextResponse.json(
      { error: "Failed to fetch zone" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;

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

    const updatedZone = await prisma.zone.update({
      where: { id: parseInt(id) },
      data: {
        name,
        region,
        price: parseFloat(price),
        deliveryTime,
        instructions,
        schedule,
        coverage,
      },
    });

    return NextResponse.json(updatedZone);
  } catch (error) {
    console.error("Error updating zone:", error);
    return NextResponse.json(
      { error: "Failed to update zone" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await prisma.zone.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Zone deleted successfully" });
  } catch (error) {
    console.error("Error deleting zone:", error);
    return NextResponse.json(
      { error: "Failed to delete zone" },
      { status: 500 },
    );
  }
}
