# Glas Suile - Full-Stack Authentication & Dashboard Platform

This project is a complete, full-stack application built from the ground up to provide a secure and robust platform for user authentication and data management. It serves as a foundational "engine" that can be connected to any number of frontend applications.

The repository contains two primary, independent packages in a monorepo structure: a backend API and a frontend dashboard.

---

## Core Components

### 1. `glas-suile-api` (Backend)

A secure REST API built with Node.js and Express. It is the core of the platform, responsible for:
-   **User Authentication:** Handling user registration with password hashing (bcrypt) and login via secure JWT (JSON Web Token) authentication.
-   **Protected Routes:** Utilizes custom middleware to protect endpoints, ensuring only authenticated users can access or modify their own data.
-   **Data Management:** Provides a full suite of CRUD (Create, Read, Update, Delete) endpoints for managing user-specific resources (in this case, "projects").
-   **Database:** Connects to a MongoDB Atlas database using Mongoose for data modeling and persistence.

### 2. `glas-suile-frontend` (Frontend Dashboard)

A modern, reactive Single-Page Application (SPA) built with Vue 3. It serves as a user-facing dashboard and control panel for the API, featuring:
-   **Dynamic UI:** The interface changes based on the user's authentication state, handled by a central Pinia store.
-   **Full CRUD Interface:** Allows logged-in users to create, view, update, and delete their projects with real-time UI updates.
-   **Secure Frontend Routing:** Uses Vue Router navigation guards to protect pages like the dashboard from unauthenticated access.
-   **Persistent State:** Leverages `localStorage` to maintain user login sessions across page reloads for a seamless user experience.

---

## Technology Stack

-   **Backend:** Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, Bcrypt.js
-   **Frontend:** Vue 3 (Composition API), Pinia (State Management), Vue Router, Tailwind CSS, Vite
-   **Deployment:** The backend API is hosted on Render, and the frontend application is hosted on Vercel.
