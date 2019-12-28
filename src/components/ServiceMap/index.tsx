import React, { useEffect } from "react";

import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { getLayer } from "./layers";
import { LayerType } from "../LayerPicker/LayerPickerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import {
  updateViewState,
  fetchMedicalServicesData,
  fetchMedicalServicesBuildingData
} from "./ServiceMapSlice";

export enum ServiceType {
  FamilyMedicine = "family_medicine",
  Laboratory = "laboratories",
  HomeCare = "home_care",
  Imaging = "imaging"
}

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

export interface ServiceObject {
  type: ServiceType;
  [key: string]: string;
}

export interface LayerProps {
  onHover: (obj: ServiceObject) => void;
  onClick: (obj: ServiceObject) => void;
  layerType: LayerType;
}

interface Props {
  services: ServiceType[];
}

const ServiceMap: React.FC<Props & LayerProps> = (
  props: Props & LayerProps
) => {
  const dispatch = useDispatch();
  const { viewState, jsonData, geoJsonData } = useSelector(
    (state: RootState) => state.serviceMapReducer
  );
  const { query } = useSelector((state: RootState) => state.searchGroupReducer);

  useEffect(() => {
    if (geoJsonData.status.code !== "Uninitialized") {
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
    dispatch(fetchMedicalServicesData(props.services));
  }, [props.services, dispatch]);

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

  if (!jsonData.data) {
    return null;
  }

  const layer = getLayer(
    props.layerType !== LayerType.Extruded ? jsonData.data : geoJsonData.data,
    props,
    {
      query
    }
  );

  /* const handleViewStateChange = ({
    viewState,
    interactionState,
    oldViewState
  }: any) => {
    dispatch(updateViewState(viewState));
  }; */

  return (
    <DeckGL
      initialViewState={viewState}
      // onViewStateChange={handleViewStateChange}
      controller={true}
      layers={[layer]}
    >
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
