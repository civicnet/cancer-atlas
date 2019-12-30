import React, { useEffect } from "react";

import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { getLayers } from "./layers";
import { LayerType } from "../LayerPicker/LayerPickerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import {
  updateViewState,
  // fetchMedicalServicesBuildingData,
  ApiCode,
  receiveMedicalServiceDataLayer,
  setMedicalServiceDataLayerCode,
  MedicalServiceDataLayer,
  ServiceType,
  MedicalServiceData,
  receiveUatGeoJson,
  UatGeoJsonList,
  receiveCountiesGeoJson
} from "./ServiceMapSlice";
import { streamJSON, streamGeoJSON, streamCountyBorders } from "../../api/API";
import { noOpFunction } from "../../lib/defaults";
import { isLeft, isRight } from "../../lib/Either";
import {
  Snackbar,
  IconButton,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { amber } from "@material-ui/core/colors";
import clsx from "clsx";
import InfoIcon from "@material-ui/icons/Info";
import { ScreenCoordinates } from "../../types/interfaces/ScreenCoordinates";

export type ServiceTypeIndexed<T> = {
  [key in ServiceType]: T;
};

export type ServiceTypeColor = "#1abc9c" | "#3498db" | "#9b59b6" | "#e67e22";

export const ServiceTypeReadable: ServiceTypeIndexed<string> = {
  [ServiceType.FamilyMedicine]: "Medici de familie",
  [ServiceType.HomeCare]: "Îngrijire la domiciliu",
  [ServiceType.Imaging]: "Servicii de imagistică",
  [ServiceType.Laboratory]: "Laboratoare de analiză"
};

export const ServiceTypeBuildings: ServiceTypeIndexed<string | null> = {
  [ServiceType.FamilyMedicine]: "mf_buildings_with_attrs_epsg4326",
  [ServiceType.HomeCare]: null,
  [ServiceType.Imaging]: null,
  [ServiceType.Laboratory]: null
};

export const ServiceTypeIcons: ServiceTypeIndexed<string> = {
  [ServiceType.FamilyMedicine]: "fal fa-user-md",
  [ServiceType.HomeCare]: "fal fa-home-heart",
  [ServiceType.Imaging]: "fal fa-x-ray",
  [ServiceType.Laboratory]: "fal fa-flask"
};

export const ServiceTypeColorMap: ServiceTypeIndexed<ServiceTypeColor> = {
  [ServiceType.FamilyMedicine]: "#1abc9c",
  [ServiceType.HomeCare]: "#3498db",
  [ServiceType.Imaging]: "#9b59b6",
  [ServiceType.Laboratory]: "#e67e22"
};

export interface LayerProps {
  onHover: (service: MedicalServiceData, pos: ScreenCoordinates) => void;
  onClick: (obj: MedicalServiceData) => void;
  layerType: LayerType;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  })
);

interface Props {
  services: ServiceType[];
}

const ServiceMap: React.FC<Props & LayerProps> = (
  props: Props & LayerProps
) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    _: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const dispatch = useDispatch();
  const {
    viewState,
    medicalServices,
    /* geoJsonData, */ uatGeoJson,
    countyGeoJson
  } = useSelector((state: RootState) => state.serviceMapReducer);
  const { searchResults } = useSelector(
    (state: RootState) => state.searchGroupReducer
  );
  const { services } = useSelector(
    (state: RootState) => state.switchListItemReducer
  );

  // Load uats geojson
  useEffect(() => {
    const onDone = (data: UatGeoJsonList) => dispatch(receiveUatGeoJson(data));
    streamGeoJSON("uats", onDone, msg => console.log(msg));
  }, [dispatch]);

  // Load counties geojson
  useEffect(() => {
    const onDone = (data: any) => dispatch(receiveCountiesGeoJson(data));
    streamCountyBorders(onDone, msg => console.log(msg));
  }, [dispatch]);

  useEffect(() => {
    setOpen(true);
  }, [props.layerType]);

  // Load buildings
  /* useEffect(() => {
    if (geoJsonData.status.code !== ApiCode.Uninitialized) {
      return;
    }

    if (props.layerType === LayerType.Extruded) {
      const files = [
        {
          file: ServiceTypeBuildings[ServiceType.FamilyMedicine],
          type: ServiceType.FamilyMedicine
        }
      ].filter(Boolean) as { file: string; type: ServiceType }[];

      dispatch(fetchMedicalServicesBuildingData(files));
    }
  }, [props.layerType, geoJsonData.status.code, dispatch]); */

  // Load medical services
  useEffect(() => {
    const onDone = (service: ServiceType, layer: MedicalServiceDataLayer) =>
      dispatch(receiveMedicalServiceDataLayer({ service, layer }));
    const onFail = (service: ServiceType, msg: string) =>
      dispatch(
        setMedicalServiceDataLayerCode({
          service,
          status: { code: ApiCode.Fail, msg: msg }
        })
      );

    streamJSON(Object.values(ServiceType), onDone, noOpFunction, onFail);
  }, [dispatch]);

  // Custom pitch for 3D layers
  useEffect(() => {
    if (props.layerType === LayerType.Extruded) {
      dispatch(
        updateViewState({
          pitch: 45
        })
      );
    } else {
      dispatch(
        updateViewState({
          pitch: 0
        })
      );
    }
  }, [props.layerType, dispatch]);

  if (!medicalServices[ServiceType.FamilyMedicine].data) {
    return null;
  }

  const displayedData =
    searchResults !== undefined ? searchResults : medicalServices;

  const layers = getLayers(
    {
      medicalData: props.layerType !== LayerType.Extruded ? displayedData : {},
      choroplethData: uatGeoJson,
      countyBorders: countyGeoJson
    },
    services,
    props
  );

  let toast = null;
  if (isLeft(layers)) {
    toast = (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
          style: { background: amber[700] }
        }}
        message={
          <span id="message-id" className={classes.message}>
            <InfoIcon className={clsx(classes.icon, classes.iconVariant)} />
            {layers.value.msg}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    );
  }

  return (
    <>
      {toast}
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={isRight(layers) ? layers.value : []}
      >
        <StaticMap
          key="static_map"
          width="100%"
          height="100%"
          mapStyle={
            props.layerType !== LayerType.Choropleth
              ? "mapbox://styles/claudiuc/ck4j3z14e09hg1dmkpijn2kma"
              : "mapbox://styles/claudiuc/ck4rj1g758emo1do5slyr0i09"
          }
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </>
  );
};

export default ServiceMap;
