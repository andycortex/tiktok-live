import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
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
    } = body;

    // Basic validation
    if (!name || !code || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
        image,
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
