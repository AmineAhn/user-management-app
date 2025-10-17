import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma } from "../plugins/db";
import { UserService } from "../services/user.service";

describe("UserService", () => {
  beforeAll(async () => await prisma.user.deleteMany());
  afterAll(async () => await prisma.$disconnect());

  it("should create a user", async () => {
    const user = await UserService.create({
        firstName: "Amine",
        lastName: "Ahniche",
        email: "amine@ahniche.com",
        password: "securepass",
        birthDate: new Date("1995-05-05"),
    });
    expect(user.email).toBe("amine@ahniche.com");
  });
});
