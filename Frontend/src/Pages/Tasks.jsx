import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, startTask, completeTask, setTasks } from "../redux/slices/tasksSlice";

const Tasks = () => {
    const [task, setTask] = useState("");
    const dispatch = useDispatch();
    const taskList = useSelector((state) => state.tasks.taskList || []);  // Default to empty array

    // Separate tasks based on their stage
    const todoTasks = taskList.filter((task) => task.stage === "todo");
    const inProgressTasks = taskList.filter((task) => task.stage === "in progress");
    const completedTasks = taskList.filter((task) => task.stage === "completed");

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
    
            if (!token) {
                console.error("No token found, please log in.");
                return;
            }
    
            try {
                const response = await fetch("http://localhost:5000/api/tasks", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Include token
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Unauthorized - Please log in again.`);
                }
    
                const data = await response.json();
                dispatch(setTasks(data)); // Update Redux store
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
    
        fetchTasks();
    }, [dispatch]);
    
    

    const handleAddTask = () => {
        if (task.trim() !== "") {
            const token = localStorage.getItem("token"); // Get the token
            if (!token) {
                alert("You are not logged in. Please log in again.");
                return;
            }
    
            const newTask = { title: task, stage: "todo" };
    
            fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include the token in the request
                },
                body: JSON.stringify(newTask),
            })
                .then((response) => {
                    if (response.status === 401) {
                        throw new Error("Unauthorized - Please log in again.");
                    }
                    return response.json();
                })
                .then((data) => {
                    dispatch(addTask(data));
                    setTask("");
                })
                .catch((error) => {
                    console.error("Error adding task:", error);
                    alert(error.message);
                });
        }
    };
    

    const handleStartTask = (taskId) => {
        fetch(`http://localhost:5000/api/tasks/${taskId}/stage`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
            },
            body: JSON.stringify({ stage: "in progress" }),
        })
            .then((response) => response.json())
            .then((updatedTask) => {
                dispatch(startTask(updatedTask._id));
            })
            .catch((error) => console.error("Error starting task:", error));
    };
    
    const handleCompleteTask = (taskId) => {
        fetch(`http://localhost:5000/api/tasks/${taskId}/stage`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
            },
            body: JSON.stringify({ stage: "completed" }),
        })
            .then((response) => response.json())
            .then((updatedTask) => {
                dispatch(completeTask(updatedTask._id));
            })
            .catch((error) => console.error("Error completing task:", error));
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

            {/* Todo Tasks */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Todo</h2>
                <ul className="mt-2">
                    {todoTasks.length === 0 ? (
                        <p>No tasks in Todo.</p>
                    ) : (
                        todoTasks.map((t) => (
                            <li key={t._id} className="border-b py-2 flex items-center justify-between">
                                <span>{t.title}</span>

                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleStartTask(t._id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Start
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* In Progress Tasks */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">In Progress</h2>
                <ul className="mt-2">
                    {inProgressTasks.length === 0 ? (
                        <p>No tasks in progress.</p>
                    ) : (
                        inProgressTasks.map((t) => (
                            <li key={t._id} className="border-b py-2 flex items-center justify-between">
                                <span className=" text-gray-500">{t.title}</span>

                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleCompleteTask(t._id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        Finish
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Completed Tasks (Optional) */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Completed</h2>
                <ul className="mt-2">
                    {completedTasks.length === 0 ? (
                        <p>No completed tasks.</p>
                    ) : (
                        completedTasks.map((t) => (
                            <li key={t._id} className="border-b py-2">
                                <span className="line-through text-gray-500">{t.title}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Tasks;
