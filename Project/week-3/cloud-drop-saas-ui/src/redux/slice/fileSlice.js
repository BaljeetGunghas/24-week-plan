import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: {
    files: null,
    loading: false,
    currentPage: 1,
    totalPages: 0,
  },
  reducers: {
    updateFilesActionReducer: (state, action) => {
      const { files, currentPage, totalPages } = action.payload;
      state.currentPage = currentPage;
      state.totalPages = totalPages;
      state.files = files;
    },
    deleteFilesActionReducer: (state, action) => {
      if (action.payload) {
        state.files = state.files.filter((file) => file._id !== action.payload);
      }
    },
    addFileActionReducer: (state, action) => {
      if (state.files?.length > 0) {
        state.files = [action.payload, ...state.files];
      } else {
        state.files = [action.payload];
      }
    },
    updateFilesLoadingActionReducer: (state, action) => {
      state.loading = action.payload;
    },
    resetFilesSliceActionReducer: (state) => {
      state.files = null;
      state.loading = false;
      state.currentPage = 1;
      state.totalPages = 0;
    },
  },
});

export const {
  updateFilesActionReducer,
  deleteFilesActionReducer,
  addFileActionReducer,
  updateFilesLoadingActionReducer,
  resetFilesSliceActionReducer,
} = fileSlice.actions;

export default fileSlice.reducer;
