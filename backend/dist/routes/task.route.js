"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const authValidator_1 = __importDefault(require("../middleware/authValidator"));
const taskRouter = express_1.default.Router();
taskRouter.get("/", authValidator_1.default, task_controller_1.getTasks);
taskRouter.post("/create", authValidator_1.default, task_controller_1.createTask);
taskRouter.patch("/update/:id", authValidator_1.default, task_controller_1.updateTask);
taskRouter.delete("/delete/:id", authValidator_1.default, task_controller_1.deleteTask);
exports.default = taskRouter;
