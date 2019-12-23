import React, { useEffect, useState } from "react";

import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import chroma from "chroma-js";

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

export enum ServiceType {
  FamilyMedicine = "mf_bucuresti_with_loc_min_flat",
  Laboratory = "laboratoare_bucuresti_with_loc_min_flat",
  HomeCare = "ingrijiri_domiciliu_bucuresti_with_loc_min_flat",
  Imaging = "imagistica_bucuresti_with_loc_min_flat"
}

export type ServiceTypeIndexed<T> = {
  [key in ServiceType]: T;
}

export type ServiceTypeColor = "#1abc9c" | "#3498db" | "#9b59b6" | "#e67e22";

export const ServiceTypeReadable: ServiceTypeIndexed<string> = {
  [ServiceType.FamilyMedicine]: "Medici de familie",
  [ServiceType.HomeCare]: "Îngrijire la domiciliu",
  [ServiceType.Imaging]: "Servicii de imagistică",
  [ServiceType.Laboratory]: "Laboratoare de analiză"
}

export const ServiceTypeIcons: ServiceTypeIndexed<string> = {
  [ServiceType.FamilyMedicine]: "fal fa-user-md",
  [ServiceType.HomeCare]: "fal fa-home-heart",
  [ServiceType.Imaging]: "fal fa-lungs",
  [ServiceType.Laboratory]: "fal fa-flask"
}

export const ServiceTypeColorMap: ServiceTypeIndexed<ServiceTypeColor> = {
  [ServiceType.FamilyMedicine]: "#1abc9c",
  [ServiceType.HomeCare]: "#3498db",
  [ServiceType.Imaging]: "#9b59b6",
  [ServiceType.Laboratory]: "#e67e22"
}
 
export interface ServiceObject {
  type: ServiceType,
  [key: string]: string,
}

interface Props {
  services: ServiceType[];
  onHover: (obj: ServiceObject) => void,
  onClick: (obj: ServiceObject) => void,
}
 
const ServiceMap: React.FC<Props> = (props: Props) => {
  const [data, setData] = useState();

  const api = async (files: ServiceType[]) => {
    const responses = files.map(file =>
      fetch(
        `https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@0.1.0/data/json/${file}.json`
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
      setData(allServices);
    });
  };

  useEffect(() => {
    api(props.services);
  }, [props]);

  if (!data) {
    return null;
  }

  const scatterplot = new ScatterplotLayer({
    id: "ScatterplotLayer",
    data,
    pickable: true,
    opacity: 0.6,
    stroked: true,
    filled: true,
    radiusScale: 10,
    radiusMinPixels: 5,
    radiusMaxPixels: 20,
    lineWidthMinPixels: 1,
    getPosition: (d: any) => [d.lng, d.lat],
    getRadius: 12,
    getFillColor: (d: any) => chroma(ServiceTypeColorMap[d.type as ServiceType]).rgb(),
    getLineColor: [0, 0, 0],
    onHover: (d: any) => props.onHover(d.object),
    onClick: (d: any) => props.onClick(d.object),
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[scatterplot]}
    >
      <StaticMap
        width="100%"
        height="100%"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  );
};

export default ServiceMap;
