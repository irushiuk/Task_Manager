import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
        enum: ["todo", "in progress", "completed"],
        default: "todo",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;