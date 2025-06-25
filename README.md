# Glas Suile Project

This repository contains the full-stack infrastructure for the Glas Suile application, including a backend API and a frontend dashboard.

## Project Structure

This project is a monorepo containing two primary packages:

- `glas-suile-api/`: The backend API built with Express.js, TypeScript, and MongoDB. It handles user authentication and data management.
- `glas-suile-frontend/`: The frontend dashboard built with Vue.js and TypeScript. It provides the user interface for interacting with the API.

---

## Getting Started

To run this project locally, you will need to set up and run both the backend and frontend services.

### Backend Setup (glas-suile-api)

The backend server handles all API logic.

1.  **Navigate to the API directory:**

    ```bash
    cd glas-suile-api
    ```

2.  **Create Environment File:**
    Create a `.env` file in the `glas-suile-api` root. This file is required to store your database connection string and JWT secret. Add the following variables:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

4.  **Run the Server:**
    ```bash
    npm start
    ```
    The API will be running on `http://localhost:5000`.

### Frontend Setup (glas-suile-frontend)

The frontend application provides the user interface.

1.  **Navigate to the frontend directory (from the root):**

    ```bash
    cd glas-suile-frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The Vue application will be running on `http://localhost:5173` (or the next available port).
