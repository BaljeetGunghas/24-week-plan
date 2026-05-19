import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fileReducer from "./slice/fileSlice";
import statsReducer from "./slice/statsSlice";
import authReducer from "./slice/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage"; // ✅ FIX

console.log("storage:", storage);

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  files: fileReducer,
  stats: statsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);