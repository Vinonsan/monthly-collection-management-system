import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LocationSliceState {
  selectedLocationId: string | null;
}

const initialState: LocationSliceState = {
  selectedLocationId: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedLocationId: (state, action: PayloadAction<string | null>) => {
      state.selectedLocationId = action.payload;
    },
  },
});

export const { setSelectedLocationId } = locationSlice.actions;
export default locationSlice.reducer;
