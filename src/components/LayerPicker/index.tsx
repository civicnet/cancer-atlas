import React from "react";

import { /* makeStyles, */ Icon } from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { setLayerType, LayerType } from './LayerPickerSlice';
import ScatterPlotTwoToneIcon from '@material-ui/icons/ScatterPlotTwoTone';

interface LayerTypeData {
  title: string,
  icon: string | JSX.Element,
}

type LayerTypeList = {
  [key in LayerType]: LayerTypeData;
}

const LayerPicker: React.FC = () => {
  const dispatch = useDispatch();
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  const handleChangeLayerType = (_: any, newLayerType: LayerType) => {
    dispatch(setLayerType(newLayerType));
  };

  const layerTypePickerData: LayerTypeList = {
    [LayerType.ScatterPlot]: {
      icon: <ScatterPlotTwoToneIcon />,
      title: "Vezi furnizorii de servicii medicale ca puncte pe hartă",
    },
    [LayerType.Icon]: {
      icon: "fad fa-map-marker-alt",
      title: "Vezi furnizorii de servicii medicale agregati dupa densitate",
    },
    [LayerType.Heatmap]: {
      icon: "fad fa-steak",
      title: "Vezi distribuția furnizorilor de servicii medicale sub formă de heatmap",
    },
    [LayerType.Grid]: {
      icon: "fad fa-th",
      title: "Vezi distribuția furnizorilor de servicii medicale sub formă de grid",
    },
    [LayerType.Extruded]: {
      icon: "fad fa-cube",
      title: "Vezi clădirile în care au puncte de lucru medicii de familie",
    }
  }

  return (
    <div style={{ flex: 1, display: "flex" }}>
      <ToggleButtonGroup
        value={layerType}
        exclusive={true}
        onChange={handleChangeLayerType}
        size="small"
        aria-label="text alignment"
      >
        {Object.entries(layerTypePickerData).map(([key, data]) => (
          <ToggleButton
            key={key}
            value={key}
            aria-label={key}
            title={data.title}
          >
            {
              typeof data.icon === "string"
                ? <Icon className={data.icon} style={{ width: 'unset' }} />
                : data.icon
            }

          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default LayerPicker;
