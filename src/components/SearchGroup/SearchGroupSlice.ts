import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

type CurrentDisplayState = {
  query: string;
  searchResults: any[];
};

let initialState: CurrentDisplayState = {
  query: "",
  searchResults: []
};

const filteredFields = [
  "address",
  "contractNo",
  "email",
  "medicName",
  "phone",
  "supplierName",
  "specialty"
];

const searchGroupSlice = createSlice({
  name: "searchGroup",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    // TODO: This needs to be typed
    performQuery(state, action: PayloadAction<any[]>) {
      if (state.query.length < 3) {
        state.searchResults = [];
        return;
      }

      const searchOptions = {
        threshold: 0.1,
        location: 0,
        distance: 100,
        tokenize: true,
        maxPatternLength: 16,
        keys: filteredFields
      };
      const fuse = new Fuse(action.payload, searchOptions);
      state.searchResults = fuse.search(state.query);
    }
  }
});

export const { setQuery, performQuery } = searchGroupSlice.actions;

export default searchGroupSlice.reducer;
