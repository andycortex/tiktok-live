import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
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
      code,
      category,
      price,
      stock,
      visibility,
      status,
      description,
      image,
    } = body;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        code,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        visibility,
        status,
        description,
        image,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
