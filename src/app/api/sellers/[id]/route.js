import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const seller = await prisma.seller.findUnique({
      where: { id: parseInt(id) },
    });

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json(seller);
  } catch (error) {
    console.error("Error fetching seller:", error);
    return NextResponse.json(
      { error: "Failed to fetch seller" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, status, commission } = body;

    const updatedSeller = await prisma.seller.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        phone,
        status,
        commission: commission ? parseFloat(commission) : 0,
      },
    });

    return NextResponse.json(updatedSeller);
  } catch (error) {
    console.error("Error updating seller:", error);
    return NextResponse.json(
      { error: "Failed to update seller" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await prisma.seller.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Seller deleted successfully" });
  } catch (error) {
    console.error("Error deleting seller:", error);
    return NextResponse.json(
      { error: "Failed to delete seller" },
      { status: 500 },
    );
  }
}
