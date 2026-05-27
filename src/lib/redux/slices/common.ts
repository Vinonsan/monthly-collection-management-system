import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

interface CommonState {
  globalError: string | null;
  isGlobalLoading: boolean;
  pagination: PaginationState;
}

const initialState: CommonState = {
  globalError: null,
  isGlobalLoading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    clearGlobalError: (state) => {
      state.globalError = null;
    },
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.globalError = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalLoading = action.payload;
    },
    setPagination: (state, action: PayloadAction<Partial<PaginationState>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
});

export const {
  clearGlobalError,
  setGlobalError,
  setGlobalLoading,
  setPagination,
} = commonSlice.actions;
export default commonSlice.reducer;
