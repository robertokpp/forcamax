import { prisma } from "../src/lib/prisma";
import { hash } from "bcrypt";

async function seed() {
  const email = "roberto@teste.com";
  const password = await hash("12345678", 10);
  await prisma.user.upsert({
    where: { email },
    create: { name: "roberto", email, password },
    update: {},
  });
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
