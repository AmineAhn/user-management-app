# 🎨 Frontend – React + TypeScript + MUI

This folder contains the **frontend** of the User Management App, built with:

- **React 18 + Vite**
- **TypeScript**
- **Material UI (MUI)** for UI components
- **React Hook Form + Zod** for validation
- **Axios** for API communication
- **JWT authentication** via React Context

---

## 🚀 Quick Start

```bash
cd frontend
npm install
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173).

Make sure the backend is running on [http://localhost:5000](http://localhost:5000).

---

## ⚙️ Environment Variables

If you use a `.env` file, include:

```
VITE_API_URL=http://localhost:5000
```

---

## 🧩 Features

- 🔐 **Login** with JWT
- 👥 **User Management Dashboard**
  - Create / Edit / Delete users (MUI Dialogs)
  - Sort, search, and paginate users (server-side)
  - Rows-per-page selector
- ✅ **Form validation** with React Hook Form + Zod
- 🎨 **Responsive MUI UI**
- 🔁 **Auth persistence** via localStorage

---

## 🧱 Project Structure

```
frontend/
│
├── src/
│   ├── api/            # Axios client & user API helpers
│   ├── components/     # Dialogs, tables, forms
│   ├── context/        # Auth context (JWT handling)
│   ├── pages/          # LoginPage, UsersPage
│   ├── routes/         # ProtectedRoute, AppRoutes
│   └── main.tsx        # Entry point (MUI ThemeProvider)
│
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 🧠 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Build production app     |
| `npm run preview` | Preview production build |

---

## 🧰 Tech Stack

| Purpose    | Library              |
| ---------- | -------------------- |
| UI         | Material UI          |
| Forms      | React Hook Form      |
| Validation | Zod                  |
| Routing    | React Router DOM     |
| HTTP       | Axios                |
| State      | React Context (Auth) |
| Tooling    | Vite + TypeScript    |

---

## 📄 License

MIT © 2025 Amine Ahniche
