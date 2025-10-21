import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import jwt from "@fastify/jwt";
import { userRoutes } from "./routes/users.routes";
import { authRoutes } from "./routes/auth.routes";


const app = Fastify({ logger: true });

// Plugins
app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

app.register(swagger, {
  openapi: {
    info: {
      title: "User Management API",
      version: "1.0.0",
    },
  },
});
app.register(swaggerUI, { routePrefix: "/docs" });

app.register(jwt, {
  secret: process.env.JWT_SECRET || "supersecret",
});

// Routes
app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/users" });

// Run
const start = async () => {
  try {
    await app.listen({ port: 5000, host: "0.0.0.0" });
    console.log("Server ready on http://localhost:5000");
    console.log("Swagger Docs on http://localhost:5000/docs");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
