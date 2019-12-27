import React from "react";

import { loadCSS } from "fg-loadcss";

import ServiceMap, {
  ServiceType,
  ServiceObject
} from "./components/ServiceMap";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  List,
} from "@material-ui/core";

import { useSelector } from 'react-redux'
import { RootState } from './store/rootReducer'

import Tooltip from "./components/Tooltip";
import SwitchListItem from "./components/SwitchListItem";
import LayerPicker from "./components/LayerPicker";
import Legend from "./components/Legend";
import BrandingCard from "./components/BrandingCard";

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
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  const [tooltip, setTooltip] = React.useState();
  const [pinnedTooltip, setPinnedTooltip] = React.useState();

  const { services } = useSelector(
    (state: RootState) => state.switchListItemReducer,
  );
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer,
  );

  React.useEffect(() => {
    loadCSS(
      "https://pro.fontawesome.com/releases/v5.10.1/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  const onServiceHover = (obj: ServiceObject) => {
    setTooltip(obj);
  };

  const onServiceClick = (obj: ServiceObject) => {
    setPinnedTooltip(obj);
  };

  const unpinTooltip = () => {
    setPinnedTooltip(null);
  };

  return (
    <div>
      <aside className={classes.aside}>
        <BrandingCard />
        <Card
          className={classes.card}
          style={{ marginTop: 20, paddingBottom: 0 }}
        >
          <CardContent>
            <List className={classes.filterList}>
              {Object.values(ServiceType).map(type => (
                <SwitchListItem key={type} serviceType={type} layerType={layerType} />
              ))}
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
          <LayerPicker />
          <Legend />
        </div>
      </aside>
      <div className={classes.tooltipContainer}>
        {<Tooltip service={pinnedTooltip} onClose={unpinTooltip} />}
        {<Tooltip service={tooltip} style={{ marginTop: 20 }} />}
      </div>
      <main>
        <ServiceMap
          services={services}
          onHover={onServiceHover}
          onClick={onServiceClick}
          layerType={layerType}
        />
      </main>
    </div>
  );
};

export default App;
