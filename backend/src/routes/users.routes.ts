import { FastifyInstance } from "fastify";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { verifyJWT } from "../utils/jwt";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", verifyJWT);

  // TODO
  app.get("/all", async (req, reply) => {
    const users = await UserService.getAllUsers();
    reply.send(users);
  });

  app.get("/", async (req, reply) => {
  const { search, sortBy, order, page, limit } = req.query as {
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    page?: string;
    limit?: string;
  };

  // TODO
  const users = await UserService.getUsers({
    search,
    sortBy: sortBy as any,
    order,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
  });

  reply.send(users);
});

  app.get("/:id", async (req, reply) => {
    const id = Number((req.params as any).id);
    const user = await UserService.getUserById(id);
    if (!user) return reply.status(404).send({ message: "User not found" });
    reply.send(user);
  });

  app.post("/", async (req, reply) => {
    try {
      const parsed = createUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return reply.status(400).send(parsed.error);
      }

      const user = await UserService.createUser(parsed.data);
      return reply.status(201).send(user);
    } catch (err: any) {
      console.error(err);
      return reply
        .status(400)
        .send({ message: err.message || "Failed to create user" });
    }
  });

  app.put("/:id", async (req, reply) => {
    const id = Number((req.params as any).id);
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    try {
      const updated = await UserService.updateUser(id, parsed.data);
      reply.send(updated);
    } catch (err: any) {
      reply.status(400).send({ message: "Failed to update user" });
    }
  });

  app.delete("/:id", async (req, reply) => {
    const id = Number((req.params as any).id);
    await UserService.deleteUser(id);
    reply.status(204).send();
  });
}
