import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import {apiSlice} from "./slices/apiSlice";
import tasksReducer from "./slices/tasksSlice"; 

const Store = configureStore({
    reducer: {  
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true,
});

export default Store;