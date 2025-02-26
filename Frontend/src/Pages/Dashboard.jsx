import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const taskList = useSelector((state) => state.tasks.taskList); // ✅ Get tasks from Redux

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <h2 className="mt-4 text-xl font-semibold">Task List</h2>
            <ul className="mt-4">
                {taskList.length === 0 ? (
                    <p>No tasks added yet.</p>
                ) : (
                    taskList.map((t, index) => (
                        <li key={index} className="border-b py-2">{t}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Dashboard;
