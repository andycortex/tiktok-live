import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Get products that are PUBLIC, ACTIVE, and NOT owned by current user
    const products = await prisma.product.findMany({
      where: {
        visibility: "public",
        status: "active",
        ownerId: {
          not: parseInt(userId),
        },
      },
      include: {
        owner: {
          select: {
            nombre: true,
            empresa: true,
          },
        },
        affiliations: {
          where: {
            userId: parseInt(userId),
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform to indicate affiliation status
    const marketplaceProducts = products.map((product) => ({
      ...product,
      isAffiliated: product.affiliations.length > 0,
      affiliationStatus:
        product.affiliations.length > 0 ? product.affiliations[0].status : null,
    }));

    return NextResponse.json(marketplaceProducts);
  } catch (error) {
    console.error("Error fetching marketplace:", error);
    return NextResponse.json(
      { error: "Failed to fetch marketplace products" },
      { status: 500 },
    );
  }
}
