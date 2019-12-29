import React from "react";

import clsx from "clsx";
import {
  makeStyles,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { toggleServiceType } from "./SwitchListItemSlice";

import {
  ServiceTypeColorMap,
  ServiceTypeIcons,
  ServiceTypeReadable
} from "../ServiceMap";

import { CustomSwitch } from "../CustomSwitch";
import { LayerType } from "../LayerPicker/LayerPickerSlice";
import { ServiceType, MedicalServiceData } from "../ServiceMap/ServiceMapSlice";

const useStyles = makeStyles(_ => ({
  serviceIcon: {
    width: 36,
    textAlign: "center"
  },
  listItemRoot: {
    paddingLeft: 0
  }
}));

interface Props {
  serviceType: ServiceType;
}

const SwitchListItem: React.FC<Props> = props => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { services } = useSelector(
    (state: RootState) => state.switchListItemReducer
  );
  const { medicalServices } = useSelector(
    (state: RootState) => state.serviceMapReducer
  );
  const { searchResults } = useSelector(
    (state: RootState) => state.searchGroupReducer
  );
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  const { serviceType } = props;

  const handleToggle = (value: ServiceType) => () => {
    dispatch(toggleServiceType(value));
  };

  const getCountFromDataArray = (
    data: MedicalServiceData[],
    service: ServiceType
  ) => {
    return data.reduce((acc, serviceData) => {
      if (serviceData.type !== service) {
        return acc;
      }

      return acc + 1;
    }, 0);
  };

  const getCountForServiceType = (service: ServiceType) => {
    const searchResultsCoerced = searchResults && searchResults[service];
    const data = searchResultsCoerced
      ? searchResultsCoerced.data
      : medicalServices[service].data;
    return getCountFromDataArray(data, service);
  };

  const ServiceSwitch =
    layerType === LayerType.ScatterPlot
      ? CustomSwitch(ServiceTypeColorMap[serviceType])
      : CustomSwitch();

  const isChecked =
    services.indexOf(serviceType) !== -1 && layerType !== LayerType.Extruded;

  return (
    <ListItem classes={{ root: classes.listItemRoot }}>
      <ListItemIcon>
        <Icon
          className={clsx(classes.serviceIcon, ServiceTypeIcons[serviceType])}
        />
      </ListItemIcon>
      <ListItemText
        id={ServiceTypeReadable[serviceType]}
        primary={ServiceTypeReadable[serviceType]}
        secondary={
          <>
            <Typography
              variant="caption"
              component="span"
              style={{ color: isChecked ? "inherit" : "#ccc" }}
            >
              {getCountForServiceType(serviceType)} /
            </Typography>
            <Typography component="span" variant="caption">
              {getCountFromDataArray(
                medicalServices[serviceType].data,
                serviceType
              )}
            </Typography>
          </>
        }
      />
      <ListItemSecondaryAction>
        <ServiceSwitch
          edge="end"
          disabled={layerType === LayerType.Extruded}
          onChange={handleToggle(serviceType)}
          checked={isChecked}
          inputProps={{
            "aria-labelledby": ServiceTypeReadable[serviceType]
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SwitchListItem;
