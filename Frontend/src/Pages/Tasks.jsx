import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleTaskCompletion } from "../redux/slices/tasksSlice"; 

const Tasks = () => {

    const [task, setTask] = useState("");
    const dispatch = useDispatch();
    const taskList = useSelector((state) => state.tasks.taskList);

    const handleAddTask = () => {
        if (task.trim() !== "") {
            dispatch(addTask(task)); // ✅ Dispatch action to add task
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
                {taskList.length === 0 ? (
                    <p>No tasks added yet.</p>
                ) : (
                    taskList.map((t, index) => (
                        <li key={index} className="border-b py-2 flex items-center">
                            <input 
                                type="checkbox" 
                                checked={t.completed}
                                onChange={() => dispatch(toggleTaskCompletion(index))}
                                className="mr-2"
                            />
                            <span className={t.completed ? "line-through text-gray-500" : ""}>
                                {t.text}
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Tasks;
