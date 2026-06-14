import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserSliceState {
  selectedUserId: string | null;
}

const initialState: UserSliceState = {
  selectedUserId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const { setSelectedUserId } = userSlice.actions;
export default userSlice.reducer;
