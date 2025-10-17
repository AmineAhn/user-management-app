import { FastifyRequest } from "fastify";

export const verifyJWT = async (req: FastifyRequest) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    throw new Error("Unauthorized");
  }
};
