import taskModel from "../models/task.model";

// get tasks
export const getTasks = async (req: any, res: any) => {
  try {
    const tasks = await taskModel.find({ userId: req.user?.id });
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching tasks" });
  }
};

// Create a new task
export const createTask = async (req: any, res: any) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;

    const newTask = new taskModel({ userId, title, description });
    const savedTask = await newTask.save();

    return res
      .status(201)
      .json({ success: true, task: savedTask, message: "new task created" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating task" });
  }
};

// Update a task
export const updateTask = async (req: any, res: any) => {
  try {
    const task = await taskModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      { $set: req.body },
      { new: true }
    );

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    return res
      .status(200)
      .json({ success: true, task, message: "Task Updated" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating task" });
  }
};

// Delete a task
export const deleteTask = async (req: any, res: any) => {
  try {
    const task = await taskModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting task" });
  }
};
