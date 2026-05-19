import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    user: null,
    theme: "dark",
  },
  reducers: {
    loginActionReducer: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    updateUserProfileReducer: (state, action) => {
      state.user = {
        ...(state.user || {}),
        ...action.payload,
      };
    },
    logoutActionReducer: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      sessionStorage.removeItem("token");
    },
    updateThemeReducer: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const {
  loginActionReducer,
  updateUserProfileReducer,
  logoutActionReducer,
  updateThemeReducer
} = authSlice.actions;
export default authSlice.reducer;
