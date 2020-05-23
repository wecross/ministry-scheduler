import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const persons = await prisma.person.findMany({});

  console.log(persons);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
