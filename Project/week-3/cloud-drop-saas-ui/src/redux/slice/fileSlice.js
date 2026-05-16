import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: {
    files: null,
    loading: false,
    currentPage: 1,
    totalPages: 0,
    limit: 8,
  },
  reducers: {
    updateFilesActionReducer: (state, action) => {
      const { files, currentPage, totalPages, limit } = action.payload;
      state.currentPage = currentPage;
      state.totalPages = totalPages;
      state.files = files;
      state.limit = limit;
    },
    deleteFilesActionReducer: (state, action) => {
      if (action.payload) {
        state.files = state.files.filter((file) => file._id !== action.payload);
      }
    },
    addFileActionReducer: (state, action) => {
      if (state.files?.length > 0) {
        const updatedFile = [action.payload, ...state.files];
        state.files = updatedFile.slice(0, state.limit);
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
