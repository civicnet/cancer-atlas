import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store/store";
import { fetchJSON, fetchGeoJSON } from "../../api/API";
import { ServiceType } from ".";

interface ViewState {
  width: number;
  height: number;
  longitude: number;
  latitude: number;
  zoom: number;
  maxZoom: number;
  minZoom: number;
  bearing: number;
  pitch: number;
}

interface ApiUninitialized {
  code: "Uninitialized";
}

interface ApiOK {
  code: "OK";
}
interface ApiError {
  code: "Fail";
  msg: string;
}

type APIStatus = ApiOK | ApiError | ApiUninitialized;

export interface MedicalServiceData {
  address: string;
  contractNo: string;
  email: string;
  medicName: string;
  phone: string;
  supplierName: string;
  lat: number;
  lng: number;
  type: ServiceType;
}

interface JsonData {
  data: MedicalServiceData[];
  status: APIStatus;
}

interface GeoJsonData {
  data: any[];
  status: APIStatus;
}

type CurrentDisplayState = {
  viewState: ViewState;
  jsonData: JsonData;
  geoJsonData: GeoJsonData;
};

let initialState: CurrentDisplayState = {
  viewState: {
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: 23.5602928,
    latitude: 46.0291793,
    zoom: 6,
    maxZoom: 20,
    minZoom: 1,
    bearing: 0,
    pitch: 0
  },
  jsonData: {
    data: [],
    status: {
      code: "Uninitialized"
    }
  },
  geoJsonData: {
    data: [],
    status: {
      code: "Uninitialized"
    }
  }
};

const serviceMapSlice = createSlice({
  name: "layerPicker",
  initialState,
  reducers: {
    updateViewState(state, action: PayloadAction<Partial<ViewState>>) {
      state.viewState = {
        ...state.viewState,
        ...action.payload
      };
    },
    receiveMedicalServicesDataSuccess(state, action: PayloadAction<any[]>) {
      state.jsonData.data = action.payload;
      state.jsonData.status = {
        code: "OK"
      };
    },
    receiveMedicalServicesDataFailed(state, action: PayloadAction<string>) {
      state.jsonData.status = {
        code: "Fail",
        msg: action.payload
      };
    },
    receiveMedicalServicesGeoJsonDataSuccess(
      state,
      action: PayloadAction<any[]>
    ) {
      state.geoJsonData.data = action.payload;
      state.geoJsonData.status = {
        code: "OK"
      };
    },
    receiveMedicalServicesGeoJsonDataFailed(
      state,
      action: PayloadAction<string>
    ) {
      state.geoJsonData.status = {
        code: "Fail",
        msg: action.payload
      };
    }
  }
});

export const {
  updateViewState,
  receiveMedicalServicesDataSuccess,
  receiveMedicalServicesDataFailed,
  receiveMedicalServicesGeoJsonDataSuccess,
  receiveMedicalServicesGeoJsonDataFailed
} = serviceMapSlice.actions;

export default serviceMapSlice.reducer;

export const fetchMedicalServicesData = (
  services: ServiceType[]
): AppThunk => async dispatch => {
  try {
    await fetchJSON(services, data => {
      dispatch(receiveMedicalServicesDataSuccess(data));
    });
  } catch (err) {
    dispatch(receiveMedicalServicesDataFailed(err.toString()));
  }
};

export const fetchMedicalServicesBuildingData = (
  services: { file: string; type: ServiceType }[]
): AppThunk => async dispatch => {
  try {
    await fetchGeoJSON(services, data => {
      dispatch(receiveMedicalServicesGeoJsonDataSuccess(data));
    });
  } catch (err) {
    dispatch(receiveMedicalServicesGeoJsonDataFailed(err.toString()));
  }
};
