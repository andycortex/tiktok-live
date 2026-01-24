import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET single order (good practice to have)
export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        seller: true,
        zone: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}

// PUT to update status
export async function PUT(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 },
    );
  }
}
