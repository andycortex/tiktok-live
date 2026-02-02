import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true, // Include gallery
        owner: {
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
      images, // Array of URLs
      commissionPercentage,
    } = body;

    // Transaction to update product and replace images
    const updatedProduct = await prisma.$transaction(async (tx) => {
      // 1. Update basic fields
      const prod = await tx.product.update({
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
          image: image || (images && images.length > 0 ? images[0] : null),
          commissionPercentage: parseFloat(commissionPercentage) || 0,
        },
      });

      // 2. Handle images if provided
      if (images && Array.isArray(images)) {
        // Delete existing
        await tx.productImage.deleteMany({
          where: { productId: prod.id },
        });

        // Create new
        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map((url) => ({
              productId: prod.id,
              url,
            })),
          });
        }
      }

      return prod;
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
