import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum LayerType {
  ScatterPlot = "ScatterPlot",
  Icon = "Icon",
  Heatmap = "Heatmap",
  Grid = "Grid",
  Choropleth = "Choropleth",
  Extruded = "Extruded"
}

type CurrentDisplayState = {
  layerType: LayerType;
};

let initialState: CurrentDisplayState = {
  layerType: LayerType.Choropleth
};

const layerPickerSlice = createSlice({
  name: "layerPicker",
  initialState,
  reducers: {
    setLayerType(state, action: PayloadAction<LayerType>) {
      if (state.layerType !== action.payload) {
        state.layerType = action.payload;
      }
    }
  }
});

export const { setLayerType } = layerPickerSlice.actions;

export default layerPickerSlice.reducer;
