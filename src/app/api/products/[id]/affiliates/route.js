import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const productId = parseInt(id);
    if (!productId) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 },
      );
    }

    // Find all ACTIVE affiliations for this product
    const affiliations = await prisma.affiliation.findMany({
      where: {
        productId: productId,
        status: "ACTIVE",
      },
      include: {
        user: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
            empresa: true,
          },
        },
      },
    });

    // Extract user details
    const affiliates = affiliations.map((a) => ({
      id: a.user.id,
      name: `${a.user.nombre} ${a.user.apellido}`,
      email: a.user.email,
      company: a.user.empresa,
    }));

    return NextResponse.json(affiliates);
  } catch (error) {
    console.error("Error fetching affiliates:", error);
    return NextResponse.json(
      { error: "Failed to fetch affiliates" },
      { status: 500 },
    );
  }
}
