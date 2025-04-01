import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        taskList: [],
    },
    reducers: {
        setTasks: (state, action) => {
            state.taskList = action.payload;
        },
        addTask: (state, action) => {
            state.taskList.push(action.payload);
        },
        startTask: (state, action) => {
            const task = state.taskList.find((t) => t._id === action.payload);
            if (task) {
                task.stage = "in progress";
            }
        },
        completeTask: (state, action) => {
            const task = state.taskList.find((t) => t._id === action.payload);
            if (task) {
                task.stage = "completed";
            }
        },
    },
});

export const { setTasks, addTask, startTask, completeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
