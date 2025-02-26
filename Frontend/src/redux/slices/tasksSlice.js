import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        taskList: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.taskList.push(action.payload);
        },
    },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
