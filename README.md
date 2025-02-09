# Task Management Application

## Introduction

The **Task Management Application** is a full-stack web application that allows users to manage their tasks efficiently. Users can create, edit, delete, and track tasks. The application supports authentication and provides a seamless user experience.

## Project Type

Fullstack

## Deployed App

- **Frontend:** [Frontend Deployment Link](https://kazam-assignment.netlify.app/)
- **Backend:** [Backend Deployment Link](https://kazam-backend-li3i.onrender.com/)

## Directory Structure

```
my-app/
├─ backend/src/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ config/
│  ├─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ App.tsx
│  │  ├─ index.tsx
```

## Video Walkthrough of the Project

[Project Walkthrough Video](https://video-link.com)

## Video Walkthrough of the Codebase

[Codebase Walkthrough Video](https://video-link.com)

## Features

- User Authentication (Signup/Login)
- Task Creation, Editing, and Deletion
- Task Filtering and Searching
- Task Completion Status Tracking
- Responsive UI with Tailwind CSS
- Secure API with JWT Authentication

## Design Decisions or Assumptions

- Tasks are user-specific and require authentication.
- MongoDB is used as the primary database.
- JWT is used for secure authentication.
- Redux is used for state management.
- Tailwind CSS is used for styling.

## Installation & Getting Started

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/harshshukla2002/kazam-frontend-engineer.git

# Backend Setup
cd backend
npm install
npm start

# Frontend Setup
cd frontend
npm install --force
npm start
```

#### **Environment Variables (.env)**

Create a `.env` file in the `backend` folder and add:

```env
PORT=4001
MONGO_URI=mongodb+srv://harshshukla:harsh12@cluster0.ob6lhlw.mongodb.net/kazam-assignment
JWT_SECRET=kazam-assignment
```

Create a `.env` file in the `frontend` folder and add:

```env
REACT_APP_API_URL = https://kazam-backend-li3i.onrender.com
```

## Usage

Once the application is running, navigate to the frontend URL and sign up or log in to start managing tasks.

```bash
# Example: Create a Task
POST /api/tasks
Headers: { "Authorization": "Bearer token" }
Body: { "title": "New Task", "description": "Task details" }
```

## Credentials

Use the following credentials for testing:

```bash
Email: test@example.com
Password: password123
```

## APIs Used

- **Backend API**: Custom-built REST API
- **External APIs**: None

## API Endpoints

### Authentication

- **POST /api/user/register** - Register a new user
- **POST /api/user/login** - Authenticate user

### Tasks

- **GET /api/tasks/** - Get all tasks for the logged-in user
- **POST /api/tasks/create** - Create a new task
- **PUT /api/tasks/update/:id** - Update a task
- **DELETE /api/tasks/delete/:id** - Delete a task

## Technology Stack

- **Frontend:** React, TypeScript, ChakraUI, Redux
- **Backend:** Node.js, Express.js, MongoDB, JWT Authentication
- **Database:** MongoDB
- **State Management:** Redux
