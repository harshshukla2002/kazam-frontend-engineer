"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
});
const taskModel = mongoose_1.default.models.task || mongoose_1.default.model("task", taskSchema);
exports.default = taskModel;
