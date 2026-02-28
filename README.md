# QuickHire Job Board

QuickHire is a modern, premium job board application built with a Next.js frontend and an Express/MongoDB backend. This repository is structured as a monorepo.

## Project Structure

- `frontend/` - Next.js 15 App Router, Tailwind CSS V4, Lucide Icons.
- `backend/` - Node.js, Express, Mongoose (MVC Architecture), Zod Validation.

## Prerequisites

- Node.js (v18+)
- MongoDB (Local instance or Atlas URI)

## Setup & Run Instructions

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quickhire
```

Start the backend development server:
```bash
npm run start
# Or if you have nodemon: npx nodemon server.js
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory (optional, for connecting to the real backend later):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the Next.js development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`.

## Features Implemented

### Frontend (UI/UX)
- High-fidelity implementation of the Figma design.
- Fully responsive layouts (Mobile, Tablet, Desktop).
- **Home Page**: Hero section, Partner Logos, Category Grid, Job Grids, Promo Banner.
- **Job Detail Page**: Comprehensive job view with sticky "Apply Now" form.
- **Admin Dashboard**: Basic interface to view active listings, post new jobs, and delete jobs.
- **Components**: Reusable Navbar, Footer, and JobCard components.
- **State**: Currently using React State to simulate seamless user interactions (application submission, job posting).

### Backend (API)
- Clean MVC (Model-View-Controller) architecture.
- Full Job CRUD endpoints (`GET /api/jobs`, `POST /api/jobs`, `DELETE /api/jobs/:id`).
- Application submission endpoint (`POST /api/applications`).
- Input validation using `zod`.
- Centralized error handling.

## Next Steps for Production
- Connect the simulated frontend states directly to the backend Axios/Fetch calls.
- Add real authentication for the Admin panel.
- Implement file uploads (e.g., AWS S3 or Cloudinary) for resumes instead of URL links.
- Deploy (Vercel for frontend, Render/Railway for backend).
