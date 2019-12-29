import React from "react";
import { Icon } from "@material-ui/core";
import About from "../containers/About";
import Changelog from "../containers/Changelog";

const routes = [
  {
    path: "/cancer-atlas",
    exact: true,
    main: () => null,
    icon: <Icon className="fas fa-map-marker-alt" />,
    text: "Atlas"
  },
  {
    path: "/cancer-atlas/despre",
    main: () => <About />,
    icon: <Icon className="fas fa-info-circle" />,
    text: "Despre"
  },
  {
    path: "/cancer-atlas/changelog",
    main: () => <Changelog />,
    icon: <Icon className="fas fa-clipboard-list" />,
    text: "Actualizari"
  }
];

export default routes;
