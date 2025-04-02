// routes/task.js
import express from "express";
import Task from "../models/task.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

// ✅ Create a new task (protected route)
router.post("/", protect, async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Task title is required." });
    }

    try {
        const newTask = new Task({
            title,
            stage: "todo",
            user: req.user._id // Add user reference
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});

// ✅ Get all tasks for current user (protected route)
router.get('/', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }); // Only get tasks for this user
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Update task stage (protected route)
router.put("/:id/stage", protect, async (req, res) => {
    const taskId = req.params.id;
    const { stage } = req.body;

    if (!["todo", "in progress", "completed"].includes(stage)) {
        return res.status(400).json({ message: "Invalid stage." });
    }

    try {
        // Ensure task belongs to user
        const task = await Task.findOneAndUpdate(
            { _id: taskId, user: req.user._id },
            { stage },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task stage", error });
    }
});

// ✅ Delete a task (protected route)
router.delete("/:id", protect, async (req, res) => {
    const taskId = req.params.id;

    try {
        // Ensure task belongs to user
        const task = await Task.findOneAndDelete({ 
            _id: taskId, 
            user: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});

export default router;