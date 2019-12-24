import React from "react";

import clsx from "clsx";
import { loadCSS } from "fg-loadcss";

import ServiceMap, {
  ServiceType,
  ServiceTypeIcons,
  ServiceTypeReadable,
  ServiceTypeColorMap,
  ServiceObject
} from "./components/ServiceMap";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Popover,
  Box,
  IconButton,
  Collapse
} from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { CustomSwitch } from "./components/CustomSwitch";
import Tooltip from "./components/Tooltip";
import { getAggregateColorRange } from "./components/ServiceMap/layers";
import chroma from "chroma-js";

const useStyles = makeStyles(theme => ({
  aside: {
    zIndex: 10,
    position: "absolute",
    top: 20,
    left: 20,
    minWidth: 345,
    maxWidth: 345
  },
  tooltipContainer: {
    zIndex: 10,
    position: "absolute",
    top: 20,
    right: 20,
    minWidth: 345,
    maxWidth: 345
  },
  filterList: {},
  gradientText: {
    background: "linear-gradient(135deg, #009fff 0%, #ec2f4b 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  branding: {
    fontWeight: 900,
    lineHeight: "32px",
    textTransform: "uppercase",
    marginBottom: 12
  },
  brandingSymbol: {
    marginRight: 12,
    width: "unset"
  },
  card: {
    width: "100%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  serviceIcon: {
    width: 36,
    textAlign: "center"
  },
  beta: {
    fontFamily: "Architects Daughter, cursive",
    fontSize: 14,
    textTransform: "lowercase"
  },
  listItemRoot: {
    paddingLeft: 0
  },
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto !important",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export enum LayerType {
  ScatterPlot,
  Heatmap,
  Grid,
  Extruded
}

const App: React.FC = () => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState([
    ServiceType.FamilyMedicine,
    ServiceType.HomeCare,
    ServiceType.Imaging,
    ServiceType.Laboratory
  ]);
  const [tooltip, setTooltip] = React.useState();
  const [pinnedTooltip, setPinnedTooltip] = React.useState();
  const [layerType, setLayerType] = React.useState(LayerType.ScatterPlot);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    loadCSS(
      "https://pro.fontawesome.com/releases/v5.10.1/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onServiceHover = (obj: ServiceObject) => {
    setTooltip(obj);
  };

  const onServiceClick = (obj: ServiceObject) => {
    setPinnedTooltip(obj);
  };

  const unpinTooltip = () => {
    setPinnedTooltip(null);
  };

  const handleChangeLayerType = (_: any, newLayerType: LayerType) => {
    if (newLayerType === layerType) {
      return;
    }

    setLayerType(newLayerType);
  };

  return (
    <div>
      <aside className={classes.aside}>
        <Card className={classes.card}>
          <CardContent style={{ paddingBottom: 0 }}>
            <Typography
              variant="h5"
              component="h2"
              className={clsx(classes.branding, classes.gradientText)}
            >
              <Icon
                className={clsx(
                  classes.brandingSymbol,
                  classes.gradientText,
                  "fas fa-lungs"
                )}
              />
              Navigator
              <sup className={classes.beta}>α</sup>
            </Typography>
            <Typography variant="body1" component="p">
              Aplicația GPS a{" "}
              <a
                href="https://www.csid.ro/health/noutati-sanatate/navigatorul-de-pacienti-specialistul-cu-rol-important-in-relatia-dintre-pacient-si-medic-16034421/"
                target="_blank"
                rel="noopener noreferrer"
              >
                navigatorilor de pacienți oncologici
              </a>{" "}
              din România.
            </Typography>
          </CardContent>
          <CardActions>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {popupState => (
                <div>
                  <Button
                    size="small"
                    color="primary"
                    {...bindTrigger(popupState)}
                  >
                    Despre proiect
                    <Icon
                      className="far fa-question-circle"
                      style={{ marginLeft: 4, fontSize: 13 }}
                    />
                  </Button>

                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                  >
                    <Box p={2} style={{ maxWidth: 320 }}>
                      <Typography variant="body1">
                        Un proiect{" "}
                        <a
                          href="https://civicnet.ro"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          CivicNet
                        </a>{" "}
                        și{" "}
                        <a
                          href="https://www.facebook.com/SanatatepentruComunitate"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Asociația Sănătate pentru Comunitate
                        </a>
                        .
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        style={{ marginTop: 6 }}
                      >
                        Ne propunem să dezvoltăm{" "}
                        <strong>
                          prima aplicație dedicată pacienților de cancer
                          pulmonar din România
                        </strong>
                        , navigatorilor acestora, dar și personalului medical.
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        style={{ marginTop: 6 }}
                      >
                        Aplicația va conține informații importante despre
                        traseul pacienților, de la diagnosticare până la
                        îngrijire paliativă, și informații sub formă de{" "}
                        <a
                          href="https://sanatateabuzoiana.ro/primul-ghid-al-supravietuitorului-de-cancer-localizat-la-nivelul-capului-si-gatului/#.XgDw6sYzZhE"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          ghiduri pentru pacienți.
                        </a>
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        style={{ marginTop: 6 }}
                      >
                        În momentul de față, aplicația se află în stadiul de
                        prototip interactiv. Ne puteți urmări pe Facebook pentru
                        a fi la curent cu ultimele noutăți.
                      </Typography>
                    </Box>
                  </Popover>
                </div>
              )}
            </PopupState>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography
                variant="body2"
                component="p"
                style={{ marginTop: 6 }}
              >
                Poți explora harta prin hover și click pe punctele afișate, și
                prin selecția categoriilor de furnizori medicali pe care dorești
                să îi afișezi. Datele sunt preluate pentru Municipiul București{" "}
                <a
                  href="http://www.cnas.ro/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  de pe site-ul CNAS
                </a>
                .
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ marginTop: 6 }}
              >
                Adițional, pentru fiecare furnizor afișat,{" "}
                <a
                  href="https://github.com/civicnet/cancer-atlas-scripts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  am generat coordonatele GPS
                </a>{" "}
                pentru afișarea pe hartă.
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ marginTop: 6 }}
              >
                Codul sursă complet este disponibil pe{" "}
                <a
                  href="https://github.com/civicnet/cancer-atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                .
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Card
          className={classes.card}
          style={{ marginTop: 20, paddingBottom: 0 }}
        >
          <CardContent>
            <List className={classes.filterList}>
              {Object.values(ServiceType).map(file => {
                const ServiceSwitch =
                  layerType === LayerType.ScatterPlot
                    ? CustomSwitch(ServiceTypeColorMap[file])
                    : CustomSwitch();

                return (
                  <ListItem key={file} classes={{ root: classes.listItemRoot }}>
                    <ListItemIcon>
                      <Icon
                        className={clsx(
                          classes.serviceIcon,
                          ServiceTypeIcons[file]
                        )}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary={ServiceTypeReadable[file]}
                    />
                    <ListItemSecondaryAction>
                      <ServiceSwitch
                        edge="end"
                        disabled={layerType === LayerType.Extruded}
                        onChange={handleToggle(file)}
                        checked={
                          checked.indexOf(file) !== -1 &&
                          layerType !== LayerType.Extruded
                        }
                        inputProps={{
                          "aria-labelledby": "switch-list-label-wifi"
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
        <div
          style={{
            display: "flex",
            flex: 1,
            marginTop: 20,
            backgroundColor: "transparent"
          }}
        >
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
                <Icon className="far fa-braille" />
              </ToggleButton>
              <ToggleButton
                value={LayerType.Heatmap}
                aria-label="centered"
                title="Vezi distribuția furnizorilor de servicii medicale sub formă de heatmap"
              >
                <Icon className="fal fa-flame" />
              </ToggleButton>
              <ToggleButton
                value={LayerType.Grid}
                aria-label="right aligned"
                title="Vezi distribuția furnizorilor de servicii medicale sub formă de grid"
              >
                <Icon className="fal fa-th" />
              </ToggleButton>
              <ToggleButton
                value={LayerType.Extruded}
                aria-label="justified"
                title="Vezi clădirile în care au puncte de lucru medicii de familie"
              >
                <Icon className="fal fa-cube" />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {(layerType === LayerType.Heatmap ||
            layerType === LayerType.Grid) && (
            <div style={{ flex: 1, display: "flex", border: "2px solid #FFF" }}>
              {getAggregateColorRange().map((color, idx) => (
                <div
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
          )}
        </div>
      </aside>
      <div className={classes.tooltipContainer}>
        {<Tooltip service={pinnedTooltip} onClose={unpinTooltip} />}
        {<Tooltip service={tooltip} style={{ marginTop: 20 }} />}
      </div>
      <main>
        <ServiceMap
          services={checked}
          onHover={onServiceHover}
          onClick={onServiceClick}
          layerType={layerType}
        />
      </main>
    </div>
  );
};

export default App;
