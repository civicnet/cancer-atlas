import { LayerProps, ServiceTypeColorMap } from ".";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { ScreenGridLayer } from "@deck.gl/aggregation-layers";
// import { GeoJsonLayer } from "@deck.gl/layers";

import chroma from "chroma-js";

import { LayerType } from "../LayerPicker/LayerPickerSlice";
import IconClusterLayer from "../IconClusterLayer";
import {
  ServiceType,
  MedicalServiceDataLayerMap,
  MedicalServiceData,
  ApiCode
} from "./ServiceMapSlice";
import { Left, Right, Either } from "../../lib/Either";

export interface LayerTypeError {
  msg: string;
  layerType: LayerType;
}

const WipLayerErrorMsg =
  "Tip de vizualizare in lucru, te rugam alege alt tip de vizualizare";
export const getAggregateColorRange = () => [
  chroma("#5A1846").rgb(),
  chroma("#900C3F").rgb(),
  chroma("#C70039").rgb(),
  chroma("#E3611C").rgb(),
  chroma("#F1920E").rgb(),
  chroma("#FFC300").rgb()
];

export const getLayers = (
  data: Partial<MedicalServiceDataLayerMap>,
  shownServices: ServiceType[],
  props: LayerProps
): Either<LayerTypeError, any[]> => {
  const flatData = () =>
    Object.values(data).reduce((acc, layer) => {
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
    case LayerType.ScatterPlot:
    default:
      return Right<any[]>(
        Object.keys(data)
          .map(key => {
            const serviceType = key as ServiceType;
            const layer = data[serviceType];
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
    onHover: (d: { object: MedicalServiceData }) => props.onHover(d.object),
    onClick: (d: { object: MedicalServiceData }) => props.onClick(d.object)
  });
};

const getIcon = (pointData: any, props: LayerProps) => {
  return new IconClusterLayer({
    id: "IconLayer",
    data: pointData,
    getPosition: (d: any) => [d.lng, d.lat],
    iconMapping: "data/location-icon-mapping.json",
    iconAtlas: "data/location-icon-atlas.png",
    sizeScale: 30,
    // getIcon: "marker",
    pickable: true
    // onHover: (d: any) => props.onHover(d.object),
    // onClick: (d: any) => props.onClick(d.object)
  });
};

const getHeatmap = (pointData: any, props: LayerProps) => {
  return new HeatmapLayer({
    id: "HeatmapLayer",
    data: pointData,
    colorRange: getAggregateColorRange(),
    opacity: 0.75,
    getPosition: (d: any) => [d.lng, d.lat],
    radiusPixels: 80,
    intensity: 1
  });
};

const getGrid = (pointData: any, props: LayerProps) => {
  return new ScreenGridLayer({
    id: "ScreenGridLayer",
    data: pointData,
    colorRange: getAggregateColorRange(),
    cellSizePixels: 15,
    aggregation: "SUM",
    coverage: 0.9,
    opacity: 0.7,
    colorScaleType: "quantile",
    getPosition: (d: any) => [d.lng, d.lat]
  });
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
