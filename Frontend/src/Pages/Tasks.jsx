import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/slices/tasksSlice"; // ✅ Import Redux action

const Tasks = () => {
    const [task, setTask] = useState("");
    const dispatch = useDispatch();
    const taskList = useSelector((state) => state.tasks.taskList); // ✅ Get tasks from Redux

    const handleAddTask = () => {
        if (task.trim() !== "") {
            dispatch(addTask(task)); // ✅ Dispatch task to Redux
            setTask("");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Enter task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="border px-4 py-2 rounded"
                />
                <button 
                    onClick={handleAddTask} 
                    className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
                >
                    Add Task
                </button>
            </div>
            <ul className="mt-4">
                {taskList.map((t, index) => (
                    <li key={index} className="border-b py-2">{t}</li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
