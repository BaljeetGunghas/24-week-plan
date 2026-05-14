import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    usedBytes: 0,
    maxBytes: 0,
    percentage: 0,
  },
  reducers: {
    updateStatesActionReducer: (state, action) => {
      const { usedBytes, maxBytes, percentage } = action.payload;
      state.usedBytes = usedBytes;
      state.maxBytes = maxBytes;
      state.percentage = percentage;
    },
    resetStatesActionReducer: (state) => {
      state.maxBytes = 0;
      state.usedBytes = 0;
      state.percentage = 0;
    },
  },
});

export const { updateStatesActionReducer, resetStatesActionReducer } =
  statsSlice.actions;

export default statsSlice.reducer;
