import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        seller: true,
        zone: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      items, // Expecting array of { productId, quantity }
      sellerId,
      zoneId,
      shippingCost = 0,
    } = body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields or empty items" },
        { status: 400 },
      );
    }

    // 1. Fetch products to check stock and get current prices
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: "One or more products not found" },
        { status: 404 },
      );
    }

    // 2. Calculate totals and prepare order items
    let calculatedTotal = 0;
    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const price = product.price; // Use current DB price
      const subtotal = price * item.quantity;
      calculatedTotal += subtotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: price, // Store the price at time of purchase
      };
    });

    const finalTotal = calculatedTotal + parseFloat(shippingCost);

    // 3. Create Order and OrderItems in a transaction
    const newOrder = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        status: "pendiente",
        total: finalTotal,
        shippingCost: parseFloat(shippingCost),
        sellerId: sellerId ? parseInt(sellerId) : null,
        zoneId: zoneId ? parseInt(zoneId) : null,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true, // Return created items if needed
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
