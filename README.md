# QuickHire — Job Board

A modern, full-stack job board application built with **Next.js 15** (App Router) on the frontend and **Node.js / Express / MongoDB** on the backend.

Live Demo: [job-board-frontend.vercel.app](https://job-board-frontend.vercel.app)
Backend API: [job-board-backend-zeta.vercel.app](https://job-board-backend-zeta.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React, TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Validation | Zod |
| Deployment | Vercel (frontend + backend) |
| DB Hosting | MongoDB Atlas |

---

## Project Structure

```
job-board/
├── frontend/                   # Next.js App
│   ├── public/images/          # Static assets (banner, logos)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Home page (orchestrator)
│   │   │   ├── jobs/           # Job listings + detail page
│   │   │   ├── admin/          # Admin dashboard
│   │   │   └── layout.tsx      # Root layout (Navbar + Footer)
│   │   └── components/
│   │       ├── JobCard.tsx     # Reusable job card (vertical + horizontal)
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       └── sections/       # Page section components
│   │           ├── HeroSection.tsx
│   │           ├── PartnersSection.tsx
│   │           ├── CategoriesSection.tsx
│   │           ├── PromoBanner.tsx
│   │           ├── FeaturedJobs.tsx
│   │           ├── LatestJobs.tsx
│   │           └── AdminJobTable.tsx
│   ├── .env.local              # Local env vars (not committed)
│   └── .env.example            # Env var template
│
└── backend/                    # Express API
    ├── models/
    │   ├── Job.js
    │   └── Application.js
    ├── controllers/
    │   ├── job.controller.js
    │   └── application.controller.js
    ├── routes/
    │   ├── job.routes.js
    │   └── application.routes.js
    ├── config/db.js
    ├── server.js
    ├── seed.js                 # Database seeder
    ├── vercel.json             # Vercel serverless config
    ├── .env                    # Local env vars (not committed)
    └── .env.example            # Env var template
```

---

## Local Development Setup

### Prerequisites
- Node.js v20+
- MongoDB (local instance or Atlas URI)

### 1. Clone the repo
```bash
git clone <repo-url>
cd job-board
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quickhire
```

Seed the database with sample jobs:
```bash
node seed.js
```

Start the development server:
```bash
npm run dev
```
API will be available at `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```
App will be available at `http://localhost:3000`

---

## API Reference

Base URL: `/api`

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/jobs` | Get all jobs (supports `?search=`, `?category=`, `?location=`) |
| `GET` | `/jobs/:id` | Get a single job by ID |
| `POST` | `/jobs` | Create a new job |
| `DELETE` | `/jobs/:id` | Delete a job |

**POST `/jobs` — Request Body:**
```json
{
  "title": "Senior Designer",
  "company": "Acme Corp",
  "location": "Remote",
  "category": "Design",
  "type": "Full Time",
  "description": "Job description here..."
}
```

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/applications` | Submit a job application |

---

## Features

- **Home Page** — Hero with search, company logos strip, category grid with live job counts, promo banner, featured and latest job listings
- **Job Listings Page** — Browse all jobs with search, location and category filters
- **Job Detail Page** — Full job description with sticky application form sidebar
- **Admin Dashboard** — Live table of all jobs from the API; create and delete jobs with real-time updates and loading/error states
- **Modular Architecture** — Each page section is an independent component in `src/components/sections/`
- **Fully Responsive** — Mobile, tablet and desktop layouts

---

## Deployment (Vercel)

Both the frontend and backend are deployed as separate Vercel projects.

### Backend

```bash
cd backend
vercel --prod
vercel env add MONGO_URI production   # enter Atlas connection string
vercel --prod                         # redeploy with env var
```

### Frontend

```bash
cd frontend
vercel --prod
vercel env add NEXT_PUBLIC_API_URL production   # enter https://<backend>.vercel.app/api
vercel --prod                                   # redeploy with env var
```

### Seed Production Database

```bash
MONGO_URI="mongodb+srv://..." node backend/seed.js
```

---

## Environment Variables

### Backend (`.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/quickhire` |

### Frontend (`.env.local`)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |
