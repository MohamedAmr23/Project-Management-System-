<div align="center">

<img src="./src/assets/PMS3.png" alt="PMS Logo" width="180" />

# Project Management System

**A full-featured, role-based project management web application**  
built with React, TypeScript, and Tailwind CSS.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-EF9B28?style=for-the-badge)](https://project-management-system-lake-nine.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/MohamedAmr23/Project-Management-System-)
[![TypeScript](https://img.shields.io/badge/TypeScript-97.7%25-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Role System](#-role-system)
- [Screenshots](#-screenshots)
- [API Reference](#-api-reference)

---

## 🧭 Overview

**PMS (Project Management System)** is a collaborative web application that enables teams to create projects, assign tasks, and track progress — all in one place. The app supports two user roles with different access levels: **Managers** who oversee the full system, and **Employees** who focus on their own assigned work.

It features a polished UI with dark mode, smooth Framer Motion animations, protected routes, JWT-based authentication, and a fully responsive layout that works seamlessly on mobile, tablet, and desktop.

---

## ✨ Features

### 🔐 Authentication
- User registration with profile image upload and multi-step form progress indicator
- Login with JWT token stored in `localStorage`
- Email verification flow after registration
- Forgot password and reset password via email OTP
- Change password from within the dashboard
- Auto-logout on 401 Unauthorized responses

### 👤 Role-Based Access Control
- **Manager** — full access to Users, Projects, and Tasks management
- **Employee** — restricted to viewing assigned Projects and their personal Task Board
- Route guards redirect unauthorized users automatically

### 📊 Dashboard
- Animated welcome banner
- Live task statistics (To Do / In Progress / Done) from the API
- User activity stats (Active / Inactive employees) — Manager only
- Recharts donut charts with percentage display and legend
- Skeleton loaders during data fetch

### 📁 Projects
- Create, edit, and delete projects
- Search and filter projects by name or status
- Paginated project list
- Confirmation modal before destructive actions

### ✅ Tasks
- Create tasks and assign them to employees
- Drag-and-drop Kanban-style task board (Employee view)
- Filter tasks by title, status, and project
- Task status workflow: `To Do → In Progress → Done`

### 👥 Users (Manager only)
- View all registered employees
- Toggle user activation / deactivation
- Search by name or email

### 🎨 UI / UX
- **Dark mode** — persistent theme toggle (light / dark) via `ThemeContext`
- **Collapsible sidebar** — icon-only when collapsed, labeled when expanded
- **Mobile responsive** — animated slide-in drawer sidebar on small screens
- **Framer Motion** animations throughout: page transitions, staggered cards, modals, dropdowns
- **Toast notifications** for all actions via `react-toastify`
- **Password generator** on the register page with configurable length and character sets

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS v3](https://tailwindcss.com/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Notifications | [React Toastify](https://fkhadra.github.io/react-toastify/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
src/
├── assets/               # Images, logos, static files
├── context/
│   ├── userContext.tsx   # Auth state & token management
│   └── ThemeContext.tsx  # Dark / light mode state
├── schema/
│   └── auth.schema.ts    # Zod validation schemas
├── services/
│   └── api/
│       └── axiosClient.ts # Axios instance with auth interceptors
├── shared/
│   ├── AuthHeader/       # Reusable auth form header
│   └── InputField/       # Controlled input with error display
├── components/
│   ├── Navbar/           # Top navigation bar
│   ├── SideBar/          # Collapsible sidebar with role-based nav
│   ├── ProfileModal/     # View & edit profile modal
│   └── ProtectedRoute/   # Route guard component
└── pages/
    ├── Auth/
    │   ├── Login/
    │   ├── Register/     # Multi-step progress + password generator
    │   ├── ForgetPassword/
    │   ├── ResetPassword/
    │   └── VerifyAccount/
    ├── Dashboard/        # Stats + charts landing page
    ├── Projects/         # CRUD projects list + delete modal
    ├── Tasks/
    │   ├── TasksList/    # Filterable task table (Manager)
    │   └── TaskBoard/    # Kanban board (Employee)
    └── Users/            # Employee management (Manager only)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MohamedAmr23/Project-Management-System-.git

# 2. Navigate into the project
cd Project-Management-System-

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔑 Environment Variables

No `.env` file is required for the default setup. The API base URL is configured directly in `src/services/api/axiosClient.ts`:

```
Base URL: https://upskilling-egypt.com:3003/api/v1
```

If you need to override it, create a `.env` file at the project root:

```env
VITE_API_BASE_URL=https://upskilling-egypt.com:3003/api/v1
```

Then update `axiosClient.ts` to use `import.meta.env.VITE_API_BASE_URL`.

---

## 📜 Available Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check and build for production
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 🧑‍💼 Role System

The application has two roles returned by the API in `userData.group.name`:

| Role | Dashboard | Users | Projects | Tasks | Task Board |
|---|:---:|:---:|:---:|:---:|:---:|
| **Manager** | ✅ Full stats | ✅ | ✅ CRUD | ✅ CRUD | ❌ |
| **Employee** | ✅ Task stats | ❌ | ✅ View | ❌ | ✅ |

Routes are protected by a `ProtectedRoute` wrapper that reads the user context and redirects unauthorized access.

---

## 📸 Screenshots
<img width="1920" height="893" alt="Capture" src="https://github.com/user-attachments/assets/d5a343c2-1fd8-4487-90ea-639214acb0ee" />
<img width="1903" height="963" alt="image" src="https://github.com/user-attachments/assets/f57118a5-cdd1-4998-a06f-e569002b96cd" />


| Page | Description |
|---|---|
| **Login** | Clean auth form with logo and toast feedback |
| **Register** | Multi-step progress stepper + built-in password generator |
| **Dashboard (Manager)** | Task + User stats with animated donut charts |
| **Dashboard (Employee)** | Personal task overview only |
| **Projects** | Searchable, paginated project cards |
| **Task Board** | Kanban columns: To Do / In Progress / Done |
| **Dark Mode** | Full dark theme across all pages |

> 📍 Live preview: [project-management-system-lake-nine.vercel.app](https://project-management-system-indol-eight.vercel.app/)

---

## 🔌 API Reference

All requests go to `https://upskilling-egypt.com:3003/api/v1` with a `Bearer` token in the `Authorization` header (auto-injected by the Axios interceptor).

| Method | Endpoint | Description | Role |
|---|---|---|---|
| `POST` | `/Users/signUp` | Register a new user | Public |
| `POST` | `/Users/signIn` | Login and get token | Public |
| `POST` | `/Users/forgot-password` | Send reset OTP | Public |
| `POST` | `/Users/reset-password` | Reset with OTP | Public |
| `GET` | `/Users/count` | Active / inactive counts | Manager |
| `PUT` | `/Users/{id}` | Toggle user activation | Manager |
| `GET` | `/Task/count` | Task status counts | Both |
| `GET` | `/Task` | List all tasks | Both |
| `POST` | `/Task` | Create a task | Manager |
| `PUT` | `/Task/{id}` | Update task | Manager |
| `DELETE` | `/Task/{id}` | Delete task | Manager |
| `GET` | `/Project` | List projects | Both |
| `POST` | `/Project` | Create project | Manager |
| `PUT` | `/Project/{id}` | Update project | Manager |
| `DELETE` | `/Project/{id}` | Delete project | Manager |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [Mohamed Amr](https://github.com/MohamedAmr23)

⭐ If you found this project useful, please consider giving it a star!

</div>
