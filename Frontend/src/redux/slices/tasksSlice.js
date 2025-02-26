import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        taskList: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.taskList.push({ text: action.payload, completed: false });
        },
        toggleTaskCompletion: (state, action) => {
            const index = action.payload;
            state.taskList[index].completed = !state.taskList[index].completed;
        },
    },
});

export const { addTask, toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;
