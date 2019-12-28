import React from "react";
import { Icon } from "@material-ui/core";
import About from "../containers/About";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => null,
    icon: <Icon className="fas fa-map-marker-alt" />,
    text: "Atlas"
  },
  {
    path: "/despre",
    main: () => <About />,
    icon: <Icon className="fas fa-info-circle" />,
    text: "Despre"
  }
];

export default routes;
