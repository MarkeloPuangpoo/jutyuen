<div align="center">
  <img src="public/logo.png" width="80" alt="Jutyuen Logo" />
  <h1>Jutyuen (จุดยืน)</h1>
  <p>A Modern Political & Social Values Survey Application</p>
  
  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React" /></a>
    <a href="https://supabase.com"><img src="https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat-square&logo=supabase" alt="Supabase" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwind-css" alt="TailwindCSS" /></a>
    <a href="https://ui.shadcn.com"><img src="https://img.shields.io/badge/shadcn%2Fui-Components-black?style=flat-square&logo=shadcn" alt="shadcn/ui" /></a>
  </p>
</div>

---

## 📌 About The Project

**Jutyuen** (จุดยืน) is an interactive, highly responsive survey application designed to map users' political, economic, and social values across multiple dimensions (Axes). Built with modern web technologies, it offers a seamless user experience, beautiful animations, and robust real-time data handling.

### 🎯 Key Features

- **Multi-Dimensional Analysis:** Questions categorized across Economic, Authority, Social, International, Centralization, and Religiosity axes.
- **Modern Tech Stack:** Powered by Next.js App Router, React 19, and Tailwind CSS v4.
- **Beautiful UI:** Polished interface utilizing `shadcn/ui`, `framer-motion` for fluid animations, and `@base-ui/react`.
- **Data Visualization:** Interactive charts and results using `recharts`.
- **Robust Backend:** Data storage and real-time syncing via Supabase.
- **State Management:** Blazing fast client state using `zustand`.

---

## 🛠 Tech Stack

| Category         | Technology                                      |
| ---------------- | ----------------------------------------------- |
| **Framework**    | Next.js 16.2 (App Router)                       |
| **Frontend**     | React 19, TypeScript                            |
| **Styling**      | Tailwind CSS v4, tw-animate-css                 |
| **Components**   | shadcn/ui, base-ui, Lucide React, Framer Motion |
| **Backend & DB** | Supabase (PostgreSQL)                           |
| **State**        | Zustand                                         |
| **Data Viz**     | Recharts                                        |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v20+ recommended)
- `npm`, `yarn`, `pnpm`, or `bun`
- A [Supabase](https://supabase.com/) account and project.

### 1. Clone the repository

```bash
git clone https://github.com/MarkeloPuangpoo/jutyuen.git
cd jutyuen
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup Environment Variables

Copy the example environment file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Add your Supabase details to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Database Setup & Seeding

Ensure your Supabase schema is initialized (check `supabase/migrations/`).
Seed the database with the initial survey questions:

```bash
npm run seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start exploring.

---

## 📂 Project Structure

```text
jutyuen/
├── src/
│   ├── app/         # Next.js App Router pages (Survey, Results, etc.)
│   ├── components/  # Reusable UI components (shadcn/ui, base-ui)
│   ├── lib/         # Utility functions and Supabase client
│   ├── store/       # Zustand state management
│   ├── types/       # TypeScript definitions
│   └── actions/     # Server actions
├── scripts/         # DB seeders and utility scripts
├── supabase/        # Supabase migrations and schema definitions
└── public/          # Static assets
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
