import { createSlice } from '@reduxjs/toolkit'

type CurrentDisplayState = {
  expanded: boolean;
}

let initialState: CurrentDisplayState = {
  expanded: false,
}

const brandingCardSlice = createSlice({
  name: 'brandingCard',
  initialState,
  reducers: {
    toggleBrandingCardExpansion(state) {
      state.expanded = !state.expanded;
    },
  }
});

export const {
  toggleBrandingCardExpansion,
} = brandingCardSlice.actions;

export default brandingCardSlice.reducer;
