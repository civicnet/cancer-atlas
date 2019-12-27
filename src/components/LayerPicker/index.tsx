import React from "react";

import { /* makeStyles, */ Icon } from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { setLayerType } from './LayerPickerSlice';

/* const useStyles = makeStyles(theme => ({
})); */

export enum LayerType {
  ScatterPlot,
  Heatmap,
  Grid,
  Extruded
}

const LayerPicker: React.FC = () => {
  /* const classes = useStyles(); */

  // const [layerType, setLayerType] = React.useState(LayerType.ScatterPlot);

  const dispatch = useDispatch();
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  const handleChangeLayerType = (_: any, newLayerType: LayerType) => {
    dispatch(setLayerType(newLayerType));
  };

  return (
    <div style={{ flex: 1, display: "flex" }}>
      <ToggleButtonGroup
        value={layerType}
        exclusive={true}
        onChange={handleChangeLayerType}
        size="small"
        aria-label="text alignment"
      >
        <ToggleButton
          value={LayerType.ScatterPlot}
          aria-label="left aligned"
          title="Vezi furnizorii de servicii medicale ca puncte pe hartă"
        >
          <Icon className="fad fa-braille" />
        </ToggleButton>
        <ToggleButton
          value={LayerType.Heatmap}
          aria-label="centered"
          title="Vezi distribuția furnizorilor de servicii medicale sub formă de heatmap"
        >
          <Icon className="fad fa-steak" style={{ width: 'unset' }} />
        </ToggleButton>
        <ToggleButton
          value={LayerType.Grid}
          aria-label="right aligned"
          title="Vezi distribuția furnizorilor de servicii medicale sub formă de grid"
        >
          <Icon className="fad fa-th" />
        </ToggleButton>
        <ToggleButton
          value={LayerType.Extruded}
          aria-label="justified"
          title="Vezi clădirile în care au puncte de lucru medicii de familie"
        >
          <Icon className="fad fa-cube" />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default LayerPicker;
