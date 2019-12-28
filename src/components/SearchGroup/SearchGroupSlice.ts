import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentDisplayState = {
  query: string;
};

let initialState: CurrentDisplayState = {
  query: ""
};

const searchGroupSlice = createSlice({
  name: "searchGroup",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    }
  }
});

export const { setQuery } = searchGroupSlice.actions;

export default searchGroupSlice.reducer;
