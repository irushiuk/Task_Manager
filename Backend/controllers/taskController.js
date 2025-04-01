import Task from "../models/task.js";

// Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, priority, stage = "todo" } = req.body; // Default stage set to 'todo'
        const newTask = new Task({ title, priority, stage });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
};

// Get all tasks or filter by stage
export const getTasks = async (req, res) => {
    try {
        const { stage } = req.query; // Retrieve the stage from query parameters
        const filter = stage ? { stage } : {}; // If a stage is provided, filter by it
        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};

// Update task stage (To-Do → In Progress → Completed)
export const updateTaskStage = async (req, res) => {
    try {
        const { stage } = req.body;
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!["todo", "in progress", "completed"].includes(stage)) {
            return res.status(400).json({ message: "Invalid stage" });
        }

        if (task.stage === stage) {
            return res.status(400).json({ message: `Task is already in the ${stage} stage` });
        }

        task.stage = stage;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task stage", error: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};
