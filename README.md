# 🧭 User Management App (Full-Stack TypeScript Demo)

This project is a full-stack **User Management application** built with:

- **Backend:** Fastify + Prisma + SQLite + JWT Authentication
- **Frontend:** React 18 + Vite + TypeScript + Material UI + React Hook Form + Zod
- **Containerization:** Docker Compose
- **Testing:** Vitest + Supertest

It demonstrates **secure CRUD**, **RESTful API design**, **form validation**, **state management**, and **UI integration**.

---

## 🧱 Project Structure

```
user-management-app/
│
├── backend/             # Fastify + Prisma + JWT API
│   ├── src/
│   │   ├── routes/      # Auth & User routes
│   │   ├── services/    # Prisma service logic
│   │   ├── schemas/     # Zod validation
│   │   ├── plugins/     # DB
│   │   ├── tests/       # Unit Tests
│   │   └── utils7
│   ├── prisma/
│   │   ├── migrations
│   │   ├── dev.db
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── package.json
│   └── README.md
│
├── frontend/            # React + MUI + React Hook Form + Zod
│   ├── src/
│   │   ├── api/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── main.tsx
│   │   └── App.tsx
│   ├── index.html
│   ├── tsconfig.json
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── docker-compose.yml
└── README.md             # (this file)
```

---

## ⚙️ Setup Instructions

### 🐋 Option 1 — Using Docker Compose (recommended)

```bash
docker-compose up --build
```

Frontend → http://localhost:5173  
Backend → http://localhost:5000

---

### 💻 Option 2 — Manual setup

#### 1️⃣ Backend

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Runs Fastify on [http://localhost:5000](http://localhost:5000)

#### 2️⃣ Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Runs React on [http://localhost:5173](http://localhost:5173)

---

## 🔐 Default Credentials

After seeding, you can log in with:

| Email             | Password    |
| ----------------- | ----------- |
| admin@example.com | password123 |

---

## 🧩 Features

- ✅ **Authentication:** JWT-secured routes
- ✅ **CRUD:** Create / Read / Update / Delete users
- ✅ **Validation:** Zod + React Hook Form on frontend, Zod on backend
- ✅ **Pagination + Search + Sorting** (server-side)
- ✅ **UI:** MUI Dialogs, Tables, Alerts, Theming
- ✅ **Testing:** Vitest + Supertest for backend endpoints
- ✅ **Docs:** OpenAPI (Swagger UI at `/docs`)

---

## 🧠 Scripts

| Command        | Description        |
| -------------- | ------------------ |
| `npm run dev`  | Run dev server     |
| `npm run seed` | Seed database      |
| `npm run test` | Run tests (Vitest) |

---

## 🧰 Tech Stack

| Layer                | Stack                                               |
| -------------------- | --------------------------------------------------- |
| **Frontend**         | React 18 / TypeScript / MUI / React Hook Form / Zod |
| **Backend**          | Fastify / Prisma / JWT / Zod / SQLite               |
| **Testing**          | Vitest / Supertest                                  |
| **Containerization** | Docker Compose                                      |

---

## 📄 License

MIT © 2025 Amine Ahniche
