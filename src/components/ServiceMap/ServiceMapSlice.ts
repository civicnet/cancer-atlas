import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store/store";
import { fetchGeoJSON } from "../../api/API";

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

export enum ServiceType {
  FamilyMedicine = "family_medicine",
  Laboratory = "laboratories",
  HomeCare = "home_care",
  Imaging = "imaging"
}

export enum ApiCode {
  Uninitialized,
  OK,
  Fail
}

type ApiUninitialized = {
  code: ApiCode.Uninitialized;
};

type ApiOK = {
  code: ApiCode.OK;
};

type ApiError = {
  code: ApiCode.Fail;
  msg: string;
};

type ApiStatus = ApiOK | ApiError | ApiUninitialized;

type LatLngPair = [number, number];

export interface Geometry {
  type: string;
  coordinates: LatLngPair[];
}

export interface UatProperties {
  natcode: string;
  name: string;
  countyCode: number;
  county: string;
  pop2015: number;
  color: string;
}

export interface CountyProperties {
  name: string;
}

export interface UatGeoJson {
  type: string;
  geometry: Geometry;
  properties: UatProperties;
}

export interface CountyGeoJson {
  type: string;
  geometry: Geometry;
  properties: CountyProperties;
}

export type UatGeoJsonList = UatGeoJson[];
export type CountyGeoJsonList = CountyGeoJson[];

export interface MedicalServiceData {
  address: string;
  contractNo: string;
  email: string;
  medicName?: string;
  name?: string;
  specialty?: string;
  phone: string;
  supplierName: string;
  lat: number;
  lng: number;
  type: ServiceType;
}

export interface MedicalServiceDataLayer {
  data: MedicalServiceData[];
  status: ApiStatus;
}

export type MedicalServiceDataLayerMap = {
  [key in ServiceType]: MedicalServiceDataLayer;
};

interface GeoJsonData {
  data: any[];
  status: ApiStatus;
}

type CurrentDisplayState = {
  viewState: ViewState;
  medicalServices: MedicalServiceDataLayerMap;
  geoJsonData: GeoJsonData;
  uatGeoJson: UatGeoJsonList;
  countyGeoJson: CountyGeoJsonList;
};

const initialDataStatus: ApiStatus = {
  code: ApiCode.Uninitialized
};

const initialMedicalServices = Object.values(ServiceType).reduce(
  (acc: Partial<MedicalServiceDataLayerMap>, type: ServiceType) => {
    return {
      ...acc,
      [type]: {
        data: [],
        status: initialDataStatus
      }
    };
  },
  {}
);

const initialViewState = {
  width: window.innerWidth,
  height: window.innerHeight,
  longitude: 23.5602928,
  latitude: 46.0291793,
  zoom: 6,
  maxZoom: 20,
  minZoom: 1,
  bearing: 0,
  pitch: 0
};

let initialState: CurrentDisplayState = {
  viewState: initialViewState,
  medicalServices: initialMedicalServices as MedicalServiceDataLayerMap,
  geoJsonData: {
    data: [],
    status: initialDataStatus
  },
  uatGeoJson: [],
  countyGeoJson: []
};

const serviceMapSlice = createSlice({
  name: "serviceMap",
  initialState,
  reducers: {
    updateViewState(state, action: PayloadAction<Partial<ViewState>>) {
      state.viewState = {
        ...state.viewState,
        ...action.payload
      };
    },
    receiveMedicalServiceDataLayer(
      state,
      action: PayloadAction<{
        service: ServiceType;
        layer: MedicalServiceDataLayer;
      }>
    ) {
      state.medicalServices = {
        ...state.medicalServices,
        [action.payload.service]: action.payload.layer
      };
    },
    setMedicalServiceDataLayerCode(
      state,
      action: PayloadAction<{ service: ServiceType; status: ApiStatus }>
    ) {
      state.medicalServices = {
        ...state.medicalServices,
        [action.payload.service]: {
          data: state.medicalServices[action.payload.service].data,
          status: action.payload.status
        }
      };
    },
    receiveUatGeoJson(state, action: PayloadAction<UatGeoJsonList>) {
      state.uatGeoJson = action.payload;
    },
    receiveCountiesGeoJson(state, action: PayloadAction<CountyGeoJsonList>) {
      state.countyGeoJson = action.payload;
    },
    receiveMedicalServicesGeoJsonDataSuccess(
      state,
      action: PayloadAction<any[]>
    ) {
      state.geoJsonData.data = action.payload;
      state.geoJsonData.status = {
        code: ApiCode.OK
      };
    },
    receiveMedicalServicesGeoJsonDataFailed(
      state,
      action: PayloadAction<string>
    ) {
      state.geoJsonData.status = {
        code: ApiCode.Fail,
        msg: action.payload
      };
    }
  }
});

export const {
  updateViewState,
  receiveMedicalServicesGeoJsonDataSuccess,
  receiveMedicalServicesGeoJsonDataFailed,
  receiveMedicalServiceDataLayer,
  setMedicalServiceDataLayerCode,
  receiveUatGeoJson,
  receiveCountiesGeoJson
} = serviceMapSlice.actions;

export default serviceMapSlice.reducer;

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
