const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    include: { items: true, seller: true, zone: true },
  });
  console.log("Total Orders found:", orders.length);
  if (orders.length > 0) {
    console.log("Sample Order:", JSON.stringify(orders[0], null, 2));
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
