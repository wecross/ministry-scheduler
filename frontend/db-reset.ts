import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.person.deleteMany({});

  await prisma.ministryDayEntry.deleteMany({});
  await prisma.ministryDayPattern.deleteMany({});
  await prisma.importance.deleteMany({});
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
