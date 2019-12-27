import React, { useEffect, useState } from "react";

import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { LayerType } from "../../App";
import { getLayer } from "./layers";

const INITIAL_VIEW_STATE = {
  width: window.innerWidth,
  height: window.innerHeight,
  longitude: 26.1,
  latitude: 44.4368449,
  zoom: 11,
  maxZoom: 20,
  minZoom: 1,
  bearing: 0,
  pitch: 0
};

const VERSION = '0.2.1';

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
  const [pointData, setPointData] = useState();
  const [buildingData, setBuildingData] = useState();
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const api = async (
    files: ServiceType[],
    cb: (data: any) => void,
    type: "json" | "geojson" = "json"
  ) => {
    const responses = files.map(file =>
      fetch(
        `https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@${VERSION}/data/${type}/national/${file}.${type}`
      )
        .then(response => response.json())
        .then(json => {
          return json.map((service: any) => {
            return {
              ...service,
              type: file
            };
          });
        })
    );

    Promise.all(responses).then(results => {
      const allServices = [].concat.apply([], results);
      cb(allServices);
    });
  };

  const geojsonApi = async (
    files: { file: string; type: ServiceType }[],
    cb: (data: any) => void,
    type: "json" | "geojson" = "geojson"
  ) => {
    const responses = files.map(({ file }) =>
      fetch(
        `https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@${VERSION}/data/${type}/${file}.${type}`
      )
        .then(response => response.json())
        .then(json => {
          return json.features.map((service: any) => {
            return {
              ...service,
              type: file
            };
          });
        })
    );

    Promise.all(responses).then(results => {
      const allServices = [].concat.apply([], results);
      cb(allServices);
    });
  };

  useEffect(() => {
    if (buildingData) {
      return;
    }

    if (props.layerType === LayerType.Extruded) {
      const files = [
        {
          file: ServiceTypeBuildings[ServiceType.FamilyMedicine],
          type: ServiceType.FamilyMedicine
        }
      ].filter(Boolean) as { file: string; type: ServiceType }[];

      geojsonApi(files, setBuildingData, "geojson");
    }
  }, [props.layerType, buildingData]);

  useEffect(() => {
    api(props.services, setPointData);
  }, [props.services]);

  useEffect(() => {
    if (props.layerType === LayerType.Extruded) {
      setViewState(v => ({
        ...v,
        pitch: 45
      }));
    } else {
      setViewState(v => ({
        ...v,
        pitch: 0
      }));
    }
  }, [props.layerType]);

  if (!pointData) {
    return null;
  }

  const layer = getLayer(
    props.layerType !== LayerType.Extruded ? pointData : buildingData,
    props
  );

  const handleViewStateChange = ({
    viewState,
    interactionState,
    oldViewState
  }: any) => {
    setViewState(viewState);
  };

  return (
    <DeckGL
      viewState={viewState}
      onViewStateChange={handleViewStateChange}
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
