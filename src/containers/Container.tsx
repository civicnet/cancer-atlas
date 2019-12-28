import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    top: 90,
    left: 100,
    position: "absolute",
    zIndex: 2
  }
}));

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Container: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, props.className)} style={props.style}>
      {props.children}
    </div>
  );
};

export default Container;
