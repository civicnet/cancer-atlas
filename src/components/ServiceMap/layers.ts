import { LayerProps, ServiceTypeColorMap, ServiceType } from ".";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { ScreenGridLayer } from "@deck.gl/aggregation-layers";
import { GeoJsonLayer } from "@deck.gl/layers";

import chroma from "chroma-js";
import { LayerType } from "../../App";

export const getAggregateColorRange = () => [
  chroma("#5A1846").rgb(),
  chroma("#900C3F").rgb(),
  chroma("#C70039").rgb(),
  chroma("#E3611C").rgb(),
  chroma("#F1920E").rgb(),
  chroma("#FFC300").rgb()
];

export const getLayer = (data: any, props: LayerProps) => {
  switch (props.layerType) {
    case LayerType.ScatterPlot:
      return getScatterplot(data, props);
    case LayerType.Heatmap:
      return getHeatmap(data, props);
    case LayerType.Grid:
      return getGrid(data, props);
    case LayerType.Extruded:
      return getExtruded(data, props);
    default:
      return getScatterplot(data, props);
  }
};

const getScatterplot = (pointData: any, props: LayerProps) => {
  return new ScatterplotLayer({
    id: "ScatterplotLayer",
    data: pointData,
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
    getFillColor: (d: any) =>
      chroma(ServiceTypeColorMap[d.type as ServiceType]).rgb(),
    getLineColor: [0, 0, 0],
    onHover: (d: any) => props.onHover(d.object),
    onClick: (d: any) => props.onClick(d.object)
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
    intensity: 1,
  });
};

const getGrid = (pointData: any, props: LayerProps) => {
  return new ScreenGridLayer({
    id: "ScreenGridLayer",
    data: pointData,
    // cellSize: 25,
    colorRange: getAggregateColorRange(),
    cellSizePixels: 15,
    // colorAggregation: "count",
    // sizeAggregation: "count",
    aggregation: "SUM",
    coverage: 0.9,
    opacity: 0.7,
    colorScaleType: "quantile",
    getPosition: (d: any) => [d.lng, d.lat]
  });
};

const getExtruded = (pointData: any, props: LayerProps) => {
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
    getLineWidth: 1,
    onHover: (d: any) =>
      d.object
        ? props.onHover(getTooltipData(d.object))
        : props.onHover(null as any),
    onClick: (d: any) =>
      d.object
        ? props.onClick(getTooltipData(d.object))
        : props.onClick(null as any)
  });
};
