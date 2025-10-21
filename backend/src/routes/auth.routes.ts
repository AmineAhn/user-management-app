import { FastifyInstance } from "fastify";
import { loginSchema } from "../schemas/auth.schema";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";
import { createUserSchema } from "../schemas/user.schema";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (req, reply) => {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    const existing = await UserService.getUserByEmail(parsed.data.email);
    if (existing) return reply.status(400).send({ message: "Email already exists" });

    const user = await UserService.createUser(parsed.data);
    reply.send(user);
  });

  app.post("/login", async (req, reply) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    const user = await UserService.getUserByEmail(parsed.data.email);
    if (!user) return reply.status(401).send({ message: "Invalid credentials" });

    const match = await bcrypt.compare(parsed.data.password, user.password);
    if (!match) return reply.status(401).send({ message: "Invalid credentials" });

    const token = app.jwt.sign({ id: user.id, email: user.email });
    reply.send({ token });
  });
}
