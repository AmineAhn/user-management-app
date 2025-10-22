# 🧠 Backend – Fastify + Prisma + JWT

This folder contains the **API** for the User Management App.

---

## 🚀 Quick Start

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Server runs at http://localhost:5000  
Swagger UI: http://localhost:5000/docs

---

## 🧩 API Overview

### 🔐 Auth Routes

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Create new user             |
| POST   | `/auth/login`    | Authenticate and return JWT |

### 👥 User Routes (protected)

| Method | Endpoint     | Description                                                    |
| ------ | ------------ | -------------------------------------------------------------- |
| GET    | `/users`     | List users (with `search`, `sortBy`, `order`, `page`, `limit`) |
| GET    | `/users/:id` | Get single user                                                |
| POST   | `/users`     | Create user                                                    |
| PUT    | `/users/:id` | Update user                                                    |
| DELETE | `/users/:id` | Delete user                                                    |

---

## 🧱 Schema

**User model (`prisma/schema.prisma`):**

```prisma
model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  password  String
  birthDate DateTime
}
```

---

## 🔐 JWT Authentication

All `/users` routes require a valid token in the header:

```
Authorization: Bearer <token>
```

---

## 🧪 Testing

Run backend unit / integration tests:

```bash
npm run test
```

Uses **Vitest** + **Supertest** to hit the Fastify endpoints.

---

## ⚙️ Environment Variables (`.env`)

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="supersecret"
PORT=5000
```

---

## 🧠 Tech Summary

| Layer      | Stack              |
| ---------- | ------------------ |
| Framework  | Fastify            |
| ORM        | Prisma             |
| Validation | Zod                |
| Auth       | JWT                |
| DB         | SQLite             |
| Docs       | Fastify Swagger    |
| Tests      | Vitest / Supertest |
