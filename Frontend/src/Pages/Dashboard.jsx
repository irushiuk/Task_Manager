import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, startTask, completeTask } from "../redux/slices/tasksSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const taskList = useSelector((state) => state.tasks.taskList) || []; // Ensure it's an array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.error("No token found, please log in");
            alert("Session expired. Please log in again.");
            navigate("/login");
            return;
        }
    
        console.log("Token found:", token);
    }, [navigate]);
    

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    const todoTasks = Array.isArray(taskList) ? taskList.filter((task) => task.stage === "todo") : [];
    const inProgressTasks = Array.isArray(taskList) ? taskList.filter((task) => task.stage === "in progress") : [];

    const handleUpdateTask = (taskId, newStage) => {
        fetch(`http://localhost:5000/api/tasks/${taskId}/stage`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ stage: newStage }),
        })
            .then((response) => response.json())
            .then((updatedTask) => {
                if (newStage === "in progress") dispatch(startTask(updatedTask._id));
                if (newStage === "completed") dispatch(completeTask(updatedTask._id));
            })
            .catch((error) => console.error("Error updating task stage:", error));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <h2 className="mt-6 text-xl font-semibold">To-Do Tasks</h2>
            <ul className="mt-4">
                {todoTasks.length === 0 ? (
                    <p>No tasks in To-Do.</p>
                ) : (
                    todoTasks.map((task) => (
                        <li key={task._id} className="border-b py-2 flex justify-between items-center">
                            <span>{task.title} ({task.stage})</span>
                            <button 
                                onClick={() => handleUpdateTask(task._id, "in progress")}
                                className="bg-pink-700 text-white px-3 py-1 rounded">
                                Start Task
                            </button>
                        </li>
                    ))
                )}
            </ul>

            <h2 className="mt-6 text-xl font-semibold">In Progress Tasks</h2>
            <ul className="mt-4">
                {inProgressTasks.length === 0 ? (
                    <p>No tasks in Progress.</p>
                ) : (
                    inProgressTasks.map((task) => (
                        <li key={task._id} className="border-b py-2 flex justify-between items-center">
                            <span>{task.title} ({task.stage})</span>
                            <button 
                                onClick={() => handleUpdateTask(task._id, "completed")}
                                className="bg-green-500 text-white px-3 py-1 rounded">
                                Finish Task
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Dashboard;
