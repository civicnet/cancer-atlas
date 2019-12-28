import React from "react";
import { Icon } from "@material-ui/core";
import Atlas from "../containers/Atlas";
import About from "../containers/About";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Atlas />,
    icon: <Icon className="fas fa-map-marker-alt" />,
    text: "Atlas"
  },
  {
    path: "/despre",
    main: () => <About />,
    icon: <Icon className="fas fa-question-circle" />,
    text: "Despre"
  }
];

export default routes;
