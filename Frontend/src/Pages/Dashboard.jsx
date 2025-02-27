import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTaskCompletion } from "../redux/slices/tasksSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const taskList = useSelector((state) => state.tasks.taskList);

    //Adding and completing tasks
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <h2 className="mt-4 text-xl font-semibold">Task List</h2>
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

export default Dashboard;
