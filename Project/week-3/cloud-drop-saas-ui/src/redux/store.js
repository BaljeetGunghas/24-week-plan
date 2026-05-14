import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./slice/fileSlice";
import statsReducer from "./slice/statsSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    files: fileReducer,
    stats: statsReducer,
    auth: authReducer,
  },
});
