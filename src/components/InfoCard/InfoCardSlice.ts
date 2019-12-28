import { createSlice } from "@reduxjs/toolkit";

type CurrentDisplayState = {
  expanded: boolean;
};

let initialState: CurrentDisplayState = {
  expanded: false
};

const infoCardSlice = createSlice({
  name: "infoCard",
  initialState,
  reducers: {
    toggleInfoCardExpansion(state) {
      state.expanded = !state.expanded;
    }
  }
});

export const { toggleInfoCardExpansion } = infoCardSlice.actions;

export default infoCardSlice.reducer;
