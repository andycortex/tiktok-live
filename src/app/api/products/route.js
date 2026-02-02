import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");

  try {
    const where = ownerId ? { ownerId: parseInt(ownerId) } : {};

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { affiliations: true },
        },
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      code,
      category,
      price,
      stock,
      visibility,
      status,
      description,
      image,
      ownerId,
      images, // Expecting an array of URLs strings
    } = body;

    // Basic validation
    if (!name || !code || !price || !category || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields (including ownerId)" },
        { status: 400 },
      );
    }

    // Check if product code already exists
    const existingProduct = await prisma.product.findUnique({
      where: { code },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "Product with this code already exists" },
        { status: 400 },
      );
    }

    // Check if owner exists
    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(ownerId) },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Invalid ownerId: User does not exist" },
        { status: 400 },
      );
    }

    // Create product and images
    const newProduct = await prisma.product.create({
      data: {
        name,
        code,
        category,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        visibility: visibility || "public",
        status: status || "active",
        description,
        image: image || (images && images.length > 0 ? images[0] : null), // Use first image as main if not provided
        ownerId: parseInt(ownerId),
        commissionPercentage: parseFloat(body.commissionPercentage) || 0,
        images: {
          create:
            images && Array.isArray(images)
              ? images.map((url) => ({ url }))
              : [],
        },
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
