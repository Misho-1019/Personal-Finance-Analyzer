# 💰 Personal Finance Analyzer

### Full-Stack Personal Finance Tracking & Analytics Platform

A production-oriented full-stack web application designed to help users
**track income and expenses, categorize transactions, and analyze
financial behavior over time**.

This project focuses on **secure session management, financial data
modeling, analytics aggregation, and scalable architecture** --- not
just CRUD operations.

------------------------------------------------------------------------

## 🎯 Project Purpose

Managing personal finances often becomes fragmented across banking apps,
spreadsheets, and manual notes.

**Personal Finance Analyzer** centralizes this process by allowing users
to:

-   record income and expenses
-   automatically categorize transactions using keyword rules
-   analyze monthly trends
-   monitor spending distribution by category
-   understand financial performance over time

The system was built to simulate **real-world financial tracking
requirements**, with production-minded authentication, validation, and
database design.

------------------------------------------------------------------------

## 🚀 Core Features

### Transaction Management

-   Create, edit, and delete transactions
-   Income and expense separation
-   Category assignment
-   Optional notes and descriptions
-   Pagination and filtering (date range, type, category)

### Auto-Categorization

-   User-defined keyword rules
-   Longest-match detection logic
-   Automatic category assignment during transaction creation

### Financial Analytics

-   Monthly income vs expense aggregation
-   Net balance calculation per period
-   Category-based spending breakdown
-   Date-range filtering
-   Proper UTC boundary handling

### Authentication & Session Management

-   JWT access tokens (short-lived)
-   Refresh token rotation with database tracking
-   Hashed refresh tokens (never stored in raw form)
-   HTTP-only secure cookies
-   Rate limiting & CORS protection

------------------------------------------------------------------------

## 🌐 Live Demo

-   **Frontend:** Deployed on Vercel\  https://personal-finance-analyzer-bice.vercel.app
-   **Backend API:** Deployed on Render\  https://personal-finance-analyzer-scsr.onrender.com
-   **Database:** PostgreSQL hosted on Neon

> ⚠️ Note:\
> This is a portfolio deployment. Cold starts may occur on the backend
> (Render free tier behavior).

------------------------------------------------------------------------

## 🖥️ Screenshots (Recommended Order)

### 1️⃣ Analytics Dashboard

![Analytics Dashboard](views/Screenshot%202026-02-25%20042156.png)
![Analytics Dashboard](views/Screenshot%202026-02-25%20042038.png)

### 2️⃣ Transactions List

![Transactions List](views/Screenshot%202026-02-25%20042355.png)

### 3️⃣ Create / Edit Transaction

![Create Transaction](views/Screenshot%202026-02-25%20042438.png)
![Edit Transaction](views/Screenshot%202026-02-25%20042503.png)

### 4️⃣ Categories Management

![Categories Management](views/Screenshot%202026-02-25%20042533.png)

### 5️⃣ Keyword Rules (Auto-Categorization Setup)\*

![Keyword Rules](views/Screenshot%202026-02-25%20042542.png)

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React (Vite)
-   Tailwind CSS
-   React Router
-   Custom request layer with automatic token refresh handling

### Backend

-   Node.js
-   Express
-   PostgreSQL
-   Prisma ORM
-   Zod validation
-   JWT Authentication with refresh rotation
-   Docker (local development)

------------------------------------------------------------------------

## 🏗️ Architecture Overview

The application follows a clean client--server architecture:

-   The frontend handles UI, filtering logic, and user interaction.
-   The backend exposes a REST API responsible for:
    -   authentication
    -   transaction logic
    -   analytics aggregation
    -   auto-categorization
    -   validation and security
-   Business logic is centralized in service layers to maintain
    separation of concerns.
-   Prisma manages database access with indexed queries optimized for
    analytics performance.

The system is designed to scale per user (multi-tenant architecture with
user-scoped data).

------------------------------------------------------------------------

## 🗄️ Database Design Highlights

-   Financial values stored as `amountCents` (integer-based modeling to
    prevent floating-point errors)
-   Unique constraints per user (e.g., category names)
-   Indexed queries for:
    -   `(userId, date)` → analytics performance
    -   `(userId, categoryId)` → category aggregation
-   Refresh tokens stored hashed with expiry and rotation tracking

------------------------------------------------------------------------

## 🔒 Security Considerations

-   Access tokens expire after 15 minutes
-   Refresh token rotation with revocation tracking
-   Refresh tokens stored hashed in database
-   HTTP-only cookies to prevent XSS token theft
-   Rate limiting enabled on API
-   CORS restricted to trusted origins
-   Input validation via Zod schemas

------------------------------------------------------------------------

## ▶️ Running Locally

### 1️⃣ Backend

``` bash
cd server
npm install
npm run dev
```

### 2️⃣ Database (Docker)

``` bash
docker-compose up -d
npx prisma migrate dev
npx prisma db seed
```

### 3️⃣ Frontend

``` bash
cd client
npm install
npm run dev
```

Backend runs on:

    http://localhost:3030

Frontend runs on:

    http://localhost:5173

------------------------------------------------------------------------

## 🌱 Future Improvements

-   Charts integration (Recharts / Chart.js)
-   CSV import/export
-   Budget limits per category
-   Recurring transaction automation
-   Mobile-responsive UX enhancements

------------------------------------------------------------------------

## 👤 Author Note

Built with a production mindset, focusing on secure authentication,
financial accuracy, and scalable analytics logic.

This project demonstrates applied full-stack architecture with
real-world considerations beyond basic CRUD applications.
