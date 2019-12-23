import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {
  ServiceObject,
  ServiceType,
  ServiceTypeIcons,
  ServiceTypeReadable
} from "../ServiceMap";
import {
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import clsx from "clsx";

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
  service?: ServiceObject;
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
      <ListItem>
        <ListItemIcon>
          <Icon className={clsx(classes.icon, "fal fa-clinic-medical")} />
        </ListItemIcon>
        <ListItemText primary={props.service.supplierName} />
      </ListItem>
    ) : (
      <ListItem>
        <ListItemIcon>
          <Icon className={clsx(classes.icon, "fal fa-bookmark")} />
        </ListItemIcon>
        <ListItemText primary={props.service.specialty} />
      </ListItem>
    );

  return (
    <Card className={classes.card} style={props.style}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {ServiceTypeReadable[props.service.type]}
        </Typography>
        <List dense={true}>
          <ListItem>
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
          <ListItem>
            <ListItemIcon>
              <Icon className={clsx(classes.icon, "fal fa-map-marker-alt")} />
            </ListItemIcon>
            <ListItemText primary={props.service.address} />
          </ListItem>
          {props.service.email && (
            <ListItem>
              <ListItemIcon>
                <Icon className={clsx(classes.icon, "fal fa-envelope")} />
              </ListItemIcon>
              <ListItemText primary={props.service.email} />
            </ListItem>
          )}
          <ListItem>
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
