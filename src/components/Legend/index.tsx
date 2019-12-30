import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

import { LayerType } from "../LayerPicker/LayerPickerSlice";
import {
  aggregateColorRange,
  choroplethColorRange
} from "../ServiceMap/layers";
import chroma from "chroma-js";
import { Icon, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const UnivariateLegend: React.FC<Props> = props => {
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  if (![LayerType.Heatmap, LayerType.Grid].includes(layerType)) {
    return null;
  }

  return (
    <div className={props.className} style={props.style}>
      <div style={{ flex: 1, display: "flex", border: "2px solid #FFF" }}>
        {aggregateColorRange.map((color, idx) => (
          <div
            key={`legend-${color}-${idx}`}
            style={{
              flex: 1,
              backgroundColor: chroma(color).hex(),
              display: "flex",
              textAlign: "center"
            }}
          >
            {idx === 0 && (
              <Icon
                title="Zone cu număr mai mic de furnizori de servicii medicale"
                className="fal fa-long-arrow-alt-down"
                style={{ color: "#fff", alignSelf: "center" }}
              />
            )}
            {idx === 5 && (
              <Icon
                title="Zone cu număr mai mare de furnizori de servicii medicale"
                className="fal fa-long-arrow-alt-up"
                style={{ color: "#333", alignSelf: "center" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const BIVARIATE_SIZE = 90;
const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    transform: "translate(50%, -50%)",
    width: "unset !important",
    left: "0px !important",
    bottom: "-70px !important",
    padding: "50px",
    borderRadius: "5px",
    background: "rgba(255,255,255,.5)"
  },
  legendContainer: {
    // border: "2px solid #FFF",
    height: BIVARIATE_SIZE,
    width: BIVARIATE_SIZE,
    position: "relative",
    transform: "rotate(45deg)"
  },
  legendLayer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    display: "flex"
    // transform: "rotate(45deg)"
  },
  horizontalLayer: {
    flexDirection: "column"
  },
  verticalLayer: {
    flexDirection: "row",
    mixBlendMode: "multiply"
  },
  legendRow: {
    display: "flex",
    height: BIVARIATE_SIZE / 3,
    flex: 1
  },
  legendColumn: {
    display: "flex",
    width: BIVARIATE_SIZE / 3,
    flex: 1
  },
  legendLabel: {
    fontSize: 16,
    position: "absolute",
    fontWeight: 400,
    display: "flex",
    color: "#333"
  },
  labelBottom: {
    bottom: 0,
    transform: "translate(0%, 120%)"
  },
  labelLeft: {
    transform: "rotate(-90deg) translate(-30%, -285%)"
  }
}));

export const BivariateLegend: React.FC<Props> = props => {
  const classes = useStyles();

  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  if (layerType !== LayerType.Choropleth) {
    return null;
  }

  return (
    <div className={clsx(classes.root, props.className)} style={props.style}>
      <div className={classes.legendContainer}>
        <Typography className={clsx(classes.labelBottom, classes.legendLabel)}>
          Medici
          <Icon
            title="Zone cu număr mai mic de furnizori de servicii medicale"
            className="fal fa-long-arrow-alt-right"
            style={{ color: "#333", alignSelf: "center", marginLeft: 12 }}
          />
        </Typography>
        <Typography className={clsx(classes.labelLeft, classes.legendLabel)}>
          Populatie
          <Icon
            title="Zone cu număr mai mic de furnizori de servicii medicale"
            className="fal fa-long-arrow-alt-right"
            style={{ color: "#333", alignSelf: "center", marginLeft: 12 }}
          />
        </Typography>
        <div className={clsx(classes.horizontalLayer, classes.legendLayer)}>
          {choroplethColorRange.populationAxis.reverse().map(color => (
            <div
              className={classes.legendRow}
              style={{
                backgroundColor: chroma(color).hex()
              }}
            />
          ))}
        </div>
        <div className={clsx(classes.verticalLayer, classes.legendLayer)}>
          {choroplethColorRange.medicalServicesAxis.map(color => (
            <div
              className={classes.legendColumn}
              style={{
                backgroundColor: chroma(color).hex()
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Legend: React.FC<Props> = props => {
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  switch (layerType) {
    case LayerType.Grid:
    case LayerType.Heatmap:
      return <UnivariateLegend {...props} />;
    case LayerType.Choropleth:
      return <BivariateLegend {...props} />;
  }

  return null;
};

export default Legend;
