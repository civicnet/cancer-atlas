import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceType } from "../ServiceMap/ServiceMapSlice";

type SelectedServiceTypes = ServiceType[];
type CurrentDisplayState = {
  services: SelectedServiceTypes;
};

let initialState: CurrentDisplayState = {
  services: [
    ServiceType.FamilyMedicine,
    ServiceType.HomeCare,
    ServiceType.Imaging,
    ServiceType.Laboratory
  ]
};

const switchListItemSlice = createSlice({
  name: "switchListItem",
  initialState,
  reducers: {
    toggleServiceType(state, action: PayloadAction<ServiceType>) {
      const currentIndex = state.services.indexOf(action.payload);
      const newChecked = [...state.services];

      if (currentIndex === -1) {
        newChecked.push(action.payload);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      state.services = newChecked;
    }
  }
});

export const { toggleServiceType } = switchListItemSlice.actions;

export default switchListItemSlice.reducer;
