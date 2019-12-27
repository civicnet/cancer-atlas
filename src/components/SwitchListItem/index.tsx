import React from "react";

import clsx from "clsx";
import {
  makeStyles,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { toggleServiceType } from './SwitchListItemSlice';

import {
  ServiceType,
  ServiceTypeColorMap,
  ServiceTypeIcons,
  ServiceTypeReadable
} from "../ServiceMap";

import { CustomSwitch } from "../CustomSwitch";
import { LayerType } from "../LayerPicker/LayerPickerSlice";

const useStyles = makeStyles(_ => ({
  serviceIcon: {
    width: 36,
    textAlign: "center"
  },
  listItemRoot: {
    paddingLeft: 0
  },
}));

interface Props {
  serviceType: ServiceType;
  layerType: LayerType;
}

const SwitchListItem: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { services } = useSelector(
    (state: RootState) => state.switchListItemReducer
  );
  const { jsonData } = useSelector(
    (state: RootState) => state.serviceMapReducer
  );

  const { layerType, serviceType } = props;

  const handleToggle = (value: ServiceType) => () => {
    dispatch(toggleServiceType(value));
  };

  const getCountForServiceType = (service: ServiceType) => {
    return jsonData.data.reduce((acc, serviceData) => {
      if (serviceData.type !== service) {
        return acc;
      }

      return acc+1;
    }, 0)
  }

  const ServiceSwitch =
    layerType === LayerType.ScatterPlot
      ? CustomSwitch(ServiceTypeColorMap[serviceType])
      : CustomSwitch();

  return (
    <ListItem classes={{ root: classes.listItemRoot }}>
      <ListItemIcon>
        <Icon
          className={clsx(
            classes.serviceIcon,
            ServiceTypeIcons[serviceType]
          )}
        />
      </ListItemIcon>
      <ListItemText
        id="switch-list-label-wifi"
        primary={ServiceTypeReadable[serviceType]}
        secondary={getCountForServiceType(serviceType)}
      />
      <ListItemSecondaryAction>
        <ServiceSwitch
          edge="end"
          disabled={layerType === LayerType.Extruded}
          onChange={handleToggle(serviceType)}
          checked={
            services.indexOf(serviceType) !== -1 &&
            layerType !== LayerType.Extruded
          }
          inputProps={{
            "aria-labelledby": "switch-list-label-wifi"
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );

};

export default SwitchListItem;
