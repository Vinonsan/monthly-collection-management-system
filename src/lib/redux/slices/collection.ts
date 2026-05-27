import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CollectionSliceState {
  selectedCollectionId: string | null;
}

const initialState: CollectionSliceState = {
  selectedCollectionId: null,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSelectedCollectionId: (state, action: PayloadAction<string | null>) => {
      state.selectedCollectionId = action.payload;
    },
  },
});

export const { setSelectedCollectionId } = collectionSlice.actions;
export default collectionSlice.reducer;
