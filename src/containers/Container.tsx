import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 90,
    paddingLeft: 100,
    paddingRight: theme.spacing(3)
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
