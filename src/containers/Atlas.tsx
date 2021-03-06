import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import ServiceMap from "../components/ServiceMap";
import Tooltip from "../components/Tooltip";
import LayerPicker from "../components/LayerPicker";
import Legend from "../components/Legend";
import { MedicalServiceData } from "../components/ServiceMap/ServiceMapSlice";
import { ScreenCoordinates } from "../types/interfaces/ScreenCoordinates";

const useStyles = makeStyles(theme => ({
  tooltipContainer: {
    zIndex: 10,
    position: "absolute",
    top: 74,
    right: 16,
    // minWidth: 345,
    maxWidth: 300
  },
  layerPicker: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginTop: 20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1
  }
}));

const Atlas: React.FC = () => {
  const classes = useStyles();

  const [tooltip, setTooltip] = React.useState();
  const [pinnedTooltip, setPinnedTooltip] = React.useState();

  const { services } = useSelector(
    (state: RootState) => state.switchListItemReducer
  );
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  const onServiceHover = (
    service: MedicalServiceData,
    pos: ScreenCoordinates
  ) => {
    setTooltip({ service, pos });
  };

  const onServiceClick = (obj: MedicalServiceData) => {
    setPinnedTooltip(obj);
  };

  const unpinTooltip = () => {
    setPinnedTooltip(null);
  };

  return (
    <>
      <LayerPicker className={classes.layerPicker} />
      <Legend
        style={{
          position: "absolute",
          left: 96,
          bottom: 20,
          zIndex: 1,
          width: 150
        }}
      />
      <div className={classes.tooltipContainer}>
        {<Tooltip service={pinnedTooltip} onClose={unpinTooltip} />}
      </div>
      {tooltip && (
        <Tooltip
          service={tooltip.service}
          pos={tooltip.pos}
          style={{ marginTop: 20 }}
        />
      )}
      <ServiceMap
        services={services}
        onHover={onServiceHover}
        onClick={onServiceClick}
        layerType={layerType}
      />
    </>
  );
};

export default Atlas;
