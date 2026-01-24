const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding orders...");

  // Ensure there is at least one product, seller, and zone
  let product = await prisma.product.findFirst();
  if (!product) {
    product = await prisma.product.create({
      data: {
        name: "Producto de Prueba",
        code: "TEST-001",
        category: "General",
        price: 100,
        stock: 10,
      },
    });
  }

  let seller = await prisma.seller.findFirst();
  if (!seller) {
    seller = await prisma.seller.create({
      data: {
        firstName: "Vendedor",
        lastName: "Prueba",
        email: "vendedor@test.com",
        phone: "70000000",
      },
    });
  }

  let zone = await prisma.zone.findFirst();
  if (!zone) {
    zone = await prisma.zone.create({
      data: {
        name: "Zona Central",
        region: "Centro",
        price: 15,
        deliveryTime: "24h",
      },
    });
  }

  // Create an order
  await prisma.order.create({
    data: {
      customerName: "Cliente Ejemplo",
      customerPhone: "77777777",
      status: "pendiente",
      total: 100,
      shippingCost: 15,
      sellerId: seller.id,
      zoneId: zone.id,
      items: {
        create: [
          {
            productId: product.id,
            quantity: 1,
            price: 100,
          },
        ],
      },
    },
  });

  console.log("Order created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
