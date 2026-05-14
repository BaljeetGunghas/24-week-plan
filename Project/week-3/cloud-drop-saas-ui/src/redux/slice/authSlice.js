import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token") || null,
    isAuthenticated: !!sessionStorage.getItem("token"),
    username: null,
  },
  reducers: {
    loginActionReducer: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    logoutActionReducer: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("token");
    },
  },
});

export const { loginActionReducer, logoutActionReducer } = authSlice.actions;
export default authSlice.reducer;
