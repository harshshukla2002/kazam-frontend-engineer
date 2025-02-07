import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task.reducer";
import userReducer from "./user.reducer";

export const store = configureStore({
  reducer: {
    taskReducer,
    userReducer,
  },
});
