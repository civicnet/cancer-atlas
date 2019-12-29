import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Fuse from "fuse.js";
import {
  MedicalServiceDataLayerMap,
  ServiceType,
  ApiCode
} from "../ServiceMap/ServiceMapSlice";

const filteredFields = [
  "address",
  "contractNo",
  "email",
  "medicName",
  "phone",
  "supplierName",
  "specialty"
];

const initialSearchOptions = {
  threshold: 0.2,
  location: 0,
  distance: 100,
  tokenize: true,
  maxPatternLength: 16,
  keys: filteredFields
};

type CurrentDisplayState = {
  query: string;
  searchOptions: typeof initialSearchOptions;
  searchResults?: Partial<MedicalServiceDataLayerMap>;
};

let initialState: CurrentDisplayState = {
  query: "",
  searchOptions: initialSearchOptions
};

const searchGroupSlice = createSlice({
  name: "searchGroup",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    performQuery(state, action: PayloadAction<MedicalServiceDataLayerMap>) {
      if (state.query.length < 3) {
        state.searchResults = undefined;
        return;
      }

      state.searchResults = Object.keys(action.payload).reduce(
        (acc: Partial<MedicalServiceDataLayerMap>, serviceType) => {
          const currentLayer = action.payload[serviceType as ServiceType];
          const fuse = new Fuse(currentLayer.data, state.searchOptions);
          const results = fuse.search(state.query);

          return {
            ...acc,
            [serviceType]: {
              data: results,
              status: { code: ApiCode.OK }
            }
          };
        },
        {}
      );
    }
  }
});

export const { setQuery, performQuery } = searchGroupSlice.actions;

export default searchGroupSlice.reducer;
