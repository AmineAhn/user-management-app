import { FastifyInstance } from "fastify";
import { userSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { verifyJWT } from "../utils/jwt";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", verifyJWT);

  app.get("/", async () => {
    return UserService.findAll();
  });

  app.get("/:id", async (req) => {
    const id = Number((req.params as any).id);
    return UserService.findById(id);
  });

app.post("/", async (req, reply) => {
  try {
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send(parsed.error);
    }

    const user = await UserService.create(parsed.data);

    // TODO
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
    const parsed = userSchema.partial().safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);
    return UserService.update(id, parsed.data);
  });

  app.delete("/:id", async (req) => {
    const id = Number((req.params as any).id);
    return UserService.remove(id);
  });
}
