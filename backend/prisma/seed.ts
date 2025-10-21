import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password1 = await bcrypt.hash("securepass1", 10);
  const password2 = await bcrypt.hash("securepass2", 10);
  const password3 = await bcrypt.hash("securepass3", 10);

  // Avoid duplicate seeding
  const existing = await prisma.user.findMany();
  if (existing.length > 0) {
    console.log("Users already exist, skipping seed.");
    return;
  }

  await prisma.user.createMany({
    data: [
      {
        firstName: "Amine",
        lastName: "AHNICHE",
        email: "amine@ahniche.com",
        password: password1,
        birthDate: new Date("1990-03-10"),
      },
      {
        firstName: "Dev1",
        lastName: "OnePoint",
        email: "dev1@fakeonepoint.com",
        password: password2,
        birthDate: new Date("1988-07-22"),
      },
      {
        firstName: "Dev2",
        lastName: "OnePoint",
        email: "dev2@fakeonepoint.com",
        password: password3,
        birthDate: new Date("1995-11-01"),
      },
    ],
  });

  console.log("Seeded initial users successfully!");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
