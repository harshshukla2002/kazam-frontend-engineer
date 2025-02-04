import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);

export default taskModel;
