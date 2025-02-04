import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import protect from "../middleware/authValidator";

const taskRouter = express.Router();

taskRouter.get("/", protect, getTasks);
taskRouter.post("/create", protect, createTask);
taskRouter.patch("/update/:id", protect, updateTask);
taskRouter.delete("/delete/:id", protect, deleteTask);

export default taskRouter;
