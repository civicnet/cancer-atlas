import { combineReducers } from "@reduxjs/toolkit";

import switchListItemReducer from "../components/SwitchListItem/SwitchListItemSlice";
import layerPickerReducer from "../components/LayerPicker/LayerPickerSlice";
import brandingCardReducer from "../components/BrandingCard/BrandingCardSlice";
import serviceMapReducer from "../components/ServiceMap/ServiceMapSlice";
import searchGroupReducer from "../components/SearchGroup/SearchGroupSlice";

const rootReducer = combineReducers({
  switchListItemReducer,
  layerPickerReducer,
  brandingCardReducer,
  serviceMapReducer,
  searchGroupReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
