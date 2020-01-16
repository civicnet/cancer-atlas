import { LayerProps, ServiceTypeColorMap } from ".";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { /* ScreenGridLayer, */ GridLayer } from "@deck.gl/aggregation-layers";
import { GeoJsonLayer /*, GridCellLayer */ } from "@deck.gl/layers";

import chroma from "chroma-js";

import { LayerType } from "../LayerPicker/LayerPickerSlice";
import IconClusterLayer from "../IconClusterLayer";
import {
  ServiceType,
  MedicalServiceDataLayerMap,
  MedicalServiceData,
  ApiCode,
  UatGeoJsonList,
  UatGeoJson,
  CountyGeoJsonList
} from "./ServiceMapSlice";
import { Left, Right, Either } from "../../lib/Either";

export interface LayerTypeError {
  msg: string;
  layerType: LayerType;
}

const WipLayerErrorMsg =
  "Tip de vizualizare in lucru, te rugam alege alt tip de vizualizare";

export const aggregateColorRange = [
  chroma("#5A1846").rgb(),
  chroma("#900C3F").rgb(),
  chroma("#C70039").rgb(),
  chroma("#E3611C").rgb(),
  chroma("#F1920E").rgb(),
  chroma("#FFC300").rgb()
];

const deckColorRange = aggregateColorRange.map(color => [
  color[0],
  color[1],
  color[2]
]);

export const choroplethColorRange = {
  populationAxis: [
    chroma("#f4cfd3").rgb(),
    chroma("#e48791").rgb(),
    chroma("#d44050").rgb()
  ],
  medicalServicesAxis: [
    chroma("#d2e8f9").rgb(),
    chroma("#8ec5f1").rgb(),
    chroma("#4ba3e9").rgb()
  ]
};

export const getLayers = (
  data: {
    medicalData: Partial<MedicalServiceDataLayerMap>;
    choroplethData: UatGeoJsonList;
    countyBorders: CountyGeoJsonList;
  },
  shownServices: ServiceType[],
  props: LayerProps
): Either<LayerTypeError, any[]> => {
  const medicalData = data.medicalData;
  const flatData = () =>
    Object.values(medicalData).reduce((acc, layer) => {
      if (layer === undefined) {
        return acc;
      }

      if (layer.status.code !== ApiCode.OK) {
        return acc;
      }

      return [...acc, ...layer.data];
    }, [] as MedicalServiceData[]);

  switch (props.layerType) {
    case LayerType.Heatmap:
      return Right<any[]>([getHeatmap(flatData(), props)]);
    case LayerType.Grid:
      return Right<any[]>([getGrid(flatData(), props)]);
    case LayerType.Extruded:
      return Left<LayerTypeError>({
        msg: WipLayerErrorMsg,
        layerType: LayerType.Extruded
      });
    // return getExtruded(data, props);
    case LayerType.Icon:
      return Right<any[]>([getIcon(flatData(), props)]);
    case LayerType.Choropleth:
      return Right<any[]>(
        getChoropleth(
          {
            medicalData: flatData(),
            choroplethData: data.choroplethData,
            countyBorders: data.countyBorders
          },
          props
        )
      );
    case LayerType.ScatterPlot:
    default: {
      const medicalData = data.medicalData;
      return Right<any[]>(
        Object.keys(medicalData)
          .map(key => {
            const serviceType = key as ServiceType;
            const layer = medicalData[serviceType];
            if (layer === undefined) {
              return null;
            }

            if (layer.status.code !== ApiCode.OK) {
              return null;
            }

            const isVisible = shownServices.includes(serviceType);
            return getScatterplot(layer.data, serviceType, isVisible, props);
          })
          .filter(layer => layer !== null)
      );
    }
  }
};

const getScatterplot = (
  pointData: MedicalServiceData[],
  serviceType: ServiceType,
  isVisible: boolean,
  props: LayerProps
) => {
  return new ScatterplotLayer({
    id: `ScatterplotLayer-${serviceType}`,
    data: pointData,
    visible: isVisible,
    pickable: true,
    opacity: 0.6,
    stroked: true,
    filled: true,
    radiusScale: 10,
    radiusMinPixels: 5,
    radiusMaxPixels: 20,
    lineWidthMinPixels: 1,
    getPosition: (d: MedicalServiceData) => [d.lng, d.lat],
    getRadius: 12,
    getFillColor: (d: MedicalServiceData) => {
      return chroma(ServiceTypeColorMap[d.type as ServiceType]).rgb();
    },
    getLineColor: [0, 0, 0, 100],
    onHover: (d: { object: MedicalServiceData; x: number; y: number }) =>
      props.onHover(d.object, { x: d.x, y: d.y }),
    onClick: (d: { object: MedicalServiceData }) => props.onClick(d.object)
  });
};

const getIcon = (pointData: MedicalServiceData[], props: LayerProps) => {
  return new IconClusterLayer({
    id: "IconLayer",
    data: pointData,
    getPosition: (d: MedicalServiceData) => [d.lng, d.lat],
    iconMapping: "data/location-icon-mapping.json",
    iconAtlas: "data/location-icon-atlas.png",
    sizeScale: 30,
    // getIcon: "marker",
    pickable: true
    // onHover: (d: any) => props.onHover(d.object),
    // onClick: (d: any) => props.onClick(d.object)
  });
};

const getHeatmap = (pointData: MedicalServiceData[], props: LayerProps) => {
  return new HeatmapLayer({
    id: "HeatmapLayer",
    data: pointData,
    colorRange: deckColorRange,
    opacity: 0.75,
    getPosition: (d: MedicalServiceData) => [d.lng, d.lat],
    radiusPixels: 80,
    intensity: 1
  });
};

const getGrid = (pointData: MedicalServiceData[], props: LayerProps) => {
  console.log("here", pointData);
  return new GridLayer({
    id: "ScreenGridLayer",
    //pickable: false,
    data: pointData,
    colorRange: deckColorRange,
    cellSize: 5000,
    // extruded: true,
    // colorScaleType: "quantize",
    // upperPercentile: 95,
    //cellSizePixels: 50,
    // aggregation: "SUM",
    coverage: 0.7,
    opacity: 0.7,
    // colorScaleType: "quantile",
    getPosition: (d: MedicalServiceData) => [d.lng, d.lat]
    //getWeight: 1,
    //gpuAggregation: true,
  });
};

const getChoropleth = (
  data: {
    medicalData: MedicalServiceData[];
    choroplethData: UatGeoJsonList;
    countyBorders: CountyGeoJsonList;
  },
  props: LayerProps
) => {
  return [
    new GeoJsonLayer({
      id: "GeoJsonLayer-Bivariate",
      data: data.choroplethData,
      pickable: false,
      extruded: false,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 0.2,
      getLineColor: [255, 255, 255, 200],
      getPolygon: (d: any) => ({
        type: "FeatureCollection",
        features: [d]
      }),
      getFillColor: (d: UatGeoJson) => {
        /* if (d.properties.color === "#c9bcce") {
          return [...chroma(d.properties.color).rgb(), 200];
        } */

        return chroma(d.properties.color).rgb();
      },
      getLineWidth: 1
    }),
    new GeoJsonLayer({
      id: "GeoJsonLayer-CountyBorders",
      data: data.countyBorders,
      pickable: false,
      extruded: false,
      stroked: true,
      filled: false,
      lineWidthMinPixels: 1,
      getLineColor: [255, 255, 255],
      getPolygon: (d: any) => ({
        type: "FeatureCollection",
        features: [d]
      }),
      getLineWidth: 1
    })
  ];
};

/* const getExtruded = (pointData: any, props: LayerProps) => {
  const getTooltipData = (d: any) => ({
    address: d.properties.mf_address,
    email: d.properties.mf_email,
    medicName: d.properties.mf_medicName,
    phone: d.properties.mf_phone,
    supplierName: d.properties.mf_supplierName,
    type: ServiceType.FamilyMedicine
  });

  return new GeoJsonLayer({
    id: "GeoJsonLayer",
    data: pointData,
    pickable: true,
    extruded: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    opacity: 0.7,
    getPolygon: (d: any) => ({
      type: "FeatureCollection",
      features: [d]
    }),
    getElevation: (d: any) => 15,
    getFillColor: (d: any) =>
      chroma(ServiceTypeColorMap[ServiceType.FamilyMedicine]).rgb(),
    getLineColor: [80, 80, 80],
    getLineWidth: 1
    onHover: (d: { object: MedicalServiceData }) =>
      d.object
        ? props.onHover(getTooltipData(d.object))
        : props.onHover(null as any),
    onClick: (d: { object: MedicalServiceData }) =>
      d.object
        ? props.onClick(getTooltipData(d.object))
        : props.onClick(null as any)
  });
};
 */
