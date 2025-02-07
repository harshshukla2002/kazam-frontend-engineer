# Task Management Application

## Description

This is a **full-stack task management application** built with **TypeScript**, featuring **user authentication, task management, real-time updates, and search functionality**. It allows users to create, update, delete, and filter tasks efficiently.

## Deploymennt URLs

- Frontend - [Frontend](https://kazam-assignment.netlify.app/)
- Backend - [Backend](https://kazam-backend-li3i.onrender.com/)

## Tech Stack

### **Frontend:**

- React
- TypeScript
- Tailwind CSS
- React Router
- Redux Toolkit

### **Backend:**

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- bcrypt (for password hashing)
- Joi (for validation)

### **Database:**

- MongoDB (Mongoose for schema management)

## Features

- **User Authentication:** Register/Login users with JWT authentication.
- **Task Management:** CRUD operations for tasks.
- **Search & Filtering:** Search tasks by title.
- **Real-time Updates:** Dynamic UI updates.
- **Responsive Design:** Works across all devices.

## Installation & Setup

### **1. Clone the Repository**

```bash
git clone https://github.com/harshshukla2002/kazam-frontend-engineer.git
cd kazam-frontend-engineer
```

### **2. Backend Setup**

```bash
cd backend
npm install
```

#### **Environment Variables (.env)**

Create a `.env` file in the `backend` folder and add:

```env
PORT=4001
MONGO_URI=mongodb+srv://harshshukla:harsh12@cluster0.ob6lhlw.mongodb.net/kazam-assignment
JWT_SECRET=kazam-assignment
```

#### **Run Backend Server**

```bash
npm run server
```

### **3. Frontend Setup**

```bash
cd ../frontend
npm install --force
```

#### **Start Frontend Server**

```bash
npm start
```

## API Endpoints

### **Auth Routes**

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | User login          |

### **Task Routes**

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| GET    | `/api/tasks/`           | Get all tasks     |
| POST   | `/api/tasks/create`     | Create a new task |
| PUT    | `/api/tasks/update/:id` | Update a task     |
| DELETE | `/api/tasks/delete/:id` | Delete a task     |

## API Testing with Postman

1. Install [Postman](https://www.postman.com/)..
2. Use the following JSON format for testing authentication:

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

1. For creating a task:

```json
{
  "title": "Learn Redux",
  "description": "Understand state management",
  "isCompleted": false,
  "userId": "67a45e4245b1d1cc88513100"
}
```
