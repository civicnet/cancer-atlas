import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { ServiceTypeIcons, ServiceTypeReadable } from "../ServiceMap";
import {
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import clsx from "clsx";
import { ServiceType, MedicalServiceData } from "../ServiceMap/ServiceMapSlice";
import { ScreenCoordinates } from "../../types/interfaces/ScreenCoordinates";

const useStyles = makeStyles({
  card: {
    width: "100%"
  },
  title: {
    fontSize: 14
  },
  icon: {
    width: 36,
    textAlign: "center"
  }
});

interface Props {
  service?: MedicalServiceData;
  pos?: ScreenCoordinates;
  style?: React.CSSProperties;
  onClose?: () => void;
}

const Tooltip: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  if (!props.service) {
    return null;
  }

  const differentiator =
    props.service.type === ServiceType.FamilyMedicine ? (
      <ListItem disableGutters dense>
        <ListItemIcon>
          <Icon className={clsx(classes.icon, "fal fa-clinic-medical")} />
        </ListItemIcon>
        <ListItemText primary={props.service.supplierName} />
      </ListItem>
    ) : (
      <ListItem disableGutters dense>
        <ListItemIcon>
          <Icon className={clsx(classes.icon, "fal fa-bookmark")} />
        </ListItemIcon>
        <ListItemText primary={props.service.specialty} />
      </ListItem>
    );

  let transformX = "-50%";
  if (props.pos) {
    if (props.pos.x < 220) {
      transformX = "0%";
    }

    if (props.pos.x > window.innerWidth - 150) {
      transformX = "-100%";
    }
  }

  const transformY =
    props.pos && props.pos.y < 350 ? "20px" : "calc(-100% - 40px)";

  const posStyle = props.pos
    ? {
        position: "absolute" as any,
        top: props.pos.y,
        left: props.pos.x,
        zIndex: 10,
        width: 300,
        transform: `translate(${transformX}, ${transformY})`
      }
    : {};

  return (
    <Card className={classes.card} style={{ ...props.style, ...posStyle }}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {ServiceTypeReadable[props.service.type]}
        </Typography>
        <List dense={true} disablePadding={true}>
          <ListItem disableGutters divider dense>
            <ListItemIcon>
              <Icon
                className={clsx(
                  classes.icon,
                  ServiceTypeIcons[props.service.type]
                )}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                props.service.type === ServiceType.FamilyMedicine
                  ? props.service.medicName
                  : props.service.name
              }
            />
          </ListItem>
          {differentiator}
          <ListItem disableGutters dense>
            <ListItemIcon>
              <Icon className={clsx(classes.icon, "fal fa-map-marker-alt")} />
            </ListItemIcon>
            <ListItemText primary={props.service.address} />
          </ListItem>
          {props.service.email && (
            <ListItem disableGutters dense>
              <ListItemIcon>
                <Icon className={clsx(classes.icon, "fal fa-envelope")} />
              </ListItemIcon>
              <ListItemText primary={props.service.email} />
            </ListItem>
          )}
          <ListItem disableGutters dense>
            <ListItemIcon>
              <Icon className={clsx(classes.icon, "fal fa-phone")} />
            </ListItemIcon>
            <ListItemText primary={props.service.phone} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        {props.onClose && (
          <IconButton
            size="small"
            color="primary"
            onClick={props.onClose}
            style={{ marginLeft: "auto" }}
          >
            <Icon
              className="fal fa-eye-slash"
              style={{ fontSize: 16, width: "unset" }}
            />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Tooltip;
