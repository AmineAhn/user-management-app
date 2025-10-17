import Fastify from "fastify";
import jwt from "@fastify/jwt";
import supertest from "supertest";
import { authRoutes } from "../routes/auth.routes";
import { prisma } from "../plugins/db";

describe("Auth routes", () => {
  const app = Fastify();

  beforeAll(async () => {
    await prisma.user.deleteMany();

    app.register(jwt, { secret: "supersecret" }); // fix bug : error 500
    app.register(authRoutes);
    await app.ready(); // fix bug : error timeout
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it("should register and login", async () => {
    const register = await supertest(app.server)
      .post("/register")
      .send({
        firstName: "Amine",
        lastName: "Ahniche",
        email: "ahniche@amine.com",
        password: "securepass",
        birthDate: "1995-05-05",
      });

    expect(register.statusCode).toBe(200);

    const login = await supertest(app.server)
      .post("/login")
      .send({
        email: "ahniche@amine.com",
        password: "securepass",
      });

    expect(login.statusCode).toBe(200);
    expect(login.body).toHaveProperty("token");
  });
});
