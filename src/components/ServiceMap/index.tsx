import React, { useEffect } from "react";

import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { getLayers } from "./layers";
import { LayerType } from "../LayerPicker/LayerPickerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import {
  updateViewState,
  fetchMedicalServicesBuildingData,
  ApiCode,
  receiveMedicalServiceDataLayer,
  setMedicalServiceDataLayerCode,
  MedicalServiceDataLayer,
  ServiceType,
  MedicalServiceData
} from "./ServiceMapSlice";
import { streamJSON } from "../../api/API";
import { noOpFunction } from "../../lib/defaults";

export type ServiceTypeIndexed<T> = {
  [key in ServiceType]: T;
};

export type ServiceTypeColor = "#1abc9c" | "#3498db" | "#9b59b6" | "#e67e22";

export const ServiceTypeReadable: ServiceTypeIndexed<string> = {
  [ServiceType.FamilyMedicine]: "Medici de familie",
  [ServiceType.HomeCare]: "Îngrijire la domiciliu",
  [ServiceType.Imaging]: "Servicii de imagistică",
  [ServiceType.Laboratory]: "Laboratoare de analiză"
};

export const ServiceTypeBuildings: ServiceTypeIndexed<string | null> = {
  [ServiceType.FamilyMedicine]: "mf_buildings_with_attrs_epsg4326",
  [ServiceType.HomeCare]: null,
  [ServiceType.Imaging]: null,
  [ServiceType.Laboratory]: null
};

export const ServiceTypeIcons: ServiceTypeIndexed<string> = {
  [ServiceType.FamilyMedicine]: "fal fa-user-md",
  [ServiceType.HomeCare]: "fal fa-home-heart",
  [ServiceType.Imaging]: "fal fa-x-ray",
  [ServiceType.Laboratory]: "fal fa-flask"
};

export const ServiceTypeColorMap: ServiceTypeIndexed<ServiceTypeColor> = {
  [ServiceType.FamilyMedicine]: "#1abc9c",
  [ServiceType.HomeCare]: "#3498db",
  [ServiceType.Imaging]: "#9b59b6",
  [ServiceType.Laboratory]: "#e67e22"
};

export interface LayerProps {
  onHover: (obj: MedicalServiceData) => void;
  onClick: (obj: MedicalServiceData) => void;
  layerType: LayerType;
}

interface Props {
  services: ServiceType[];
}

const ServiceMap: React.FC<Props & LayerProps> = (
  props: Props & LayerProps
) => {
  const dispatch = useDispatch();
  const { viewState, medicalServices, geoJsonData } = useSelector(
    (state: RootState) => state.serviceMapReducer
  );
  const { searchResults } = useSelector(
    (state: RootState) => state.searchGroupReducer
  );
  const { services } = useSelector(
    (state: RootState) => state.switchListItemReducer
  );

  useEffect(() => {
    if (geoJsonData.status.code !== ApiCode.Uninitialized) {
      return;
    }

    if (props.layerType === LayerType.Extruded) {
      const files = [
        {
          file: ServiceTypeBuildings[ServiceType.FamilyMedicine],
          type: ServiceType.FamilyMedicine
        }
      ].filter(Boolean) as { file: string; type: ServiceType }[];

      dispatch(fetchMedicalServicesBuildingData(files));
    }
  }, [props.layerType, geoJsonData.status.code, dispatch]);

  useEffect(() => {
    const onDone = (service: ServiceType, layer: MedicalServiceDataLayer) =>
      dispatch(receiveMedicalServiceDataLayer({ service, layer }));
    const onFail = (service: ServiceType, msg: string) =>
      dispatch(
        setMedicalServiceDataLayerCode({
          service,
          status: { code: ApiCode.Fail, msg: msg }
        })
      );

    streamJSON(Object.values(ServiceType), onDone, noOpFunction, onFail);
  }, [dispatch]);

  useEffect(() => {
    if (props.layerType === LayerType.Extruded) {
      dispatch(
        updateViewState({
          pitch: 45
        })
      );
    } else {
      dispatch(
        updateViewState({
          pitch: 0
        })
      );
    }
  }, [props.layerType, dispatch]);

  if (!medicalServices[ServiceType.FamilyMedicine].data) {
    return null;
  }

  const displayedData =
    searchResults !== undefined ? searchResults : medicalServices;

  /* displayedData = displayedData.filter(data => {
    if (services.includes(data.type)) {
      return true;
    }
    return false;
  }); */

  const layers = getLayers(
    props.layerType !== LayerType.Extruded ? displayedData : {}, // : geoJsonData.data,
    services,
    props
  );

  return (
    <DeckGL initialViewState={viewState} controller={true} layers={layers}>
      <StaticMap
        key="static_map"
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/claudiuc/ck4j3z14e09hg1dmkpijn2kma"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  );
};

export default ServiceMap;
