import React, { CSSProperties } from "react";
import { makeStyles, Typography, Icon } from "@material-ui/core";
import clsx from "clsx";
import { APP_BAR_COLOR } from "../../App";

const useStyles = makeStyles(theme => ({
  gradientText: {
    background: "linear-gradient(103deg, #31dccf, #244fe7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  branding: {
    fontWeight: 900,
    fontSize: 14,
    lineHeight: "32px",
    textTransform: "uppercase",
    position: "relative",
    paddingRight: 28,
    paddingLeft: 14,
    zIndex: 2,
    textShadow: [1, 2, 3, 4]
      .reduce(
        (acc, id) => `${acc},
      -${id}px ${id}px 0 ${APP_BAR_COLOR},
			${id}px ${id}px 0 ${APP_BAR_COLOR},
			${id}px -${id}px 0 ${APP_BAR_COLOR},
      -${id}px -${id}px 0 ${APP_BAR_COLOR}
    `,
        ""
      )
      .substr(1)
  },
  brandingSymbol: {
    marginRight: 12,
    fontSize: "19px",
    position: "absolute",
    display: "block",
    right: 0,
    top: "-14%",
    border: "2px solid transparent",
    width: "50px",
    paddingLeft: 16,
    height: "120%",
    background: APP_BAR_COLOR,
    backgroundClip: "padding-box",
    textShadow: "none",
    "&::before": {
      content: "' '",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      margin: "-2px",
      background: `linear-gradient(
        103deg,
        #31dccf,
        #244fe7)
      `
    }
  },
  beta: {
    fontFamily: "Architects Daughter, cursive",
    fontSize: 14,
    textTransform: "lowercase",
    textShadow: "none",
    position: "absolute",
    left: 0,
    zIndex: 100,
    lineHeight: 1
  }
}));

interface Props {
  className?: string;
  style?: CSSProperties;
}

const Logo: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <div
      style={props.style}
      className={clsx(classes.branding, props.className)}
    >
      <div className={classes.brandingSymbol}>
        <Icon
          className={clsx(classes.gradientText, "far fa-lungs")}
          style={{ width: "unset", verticalAlign: "sub", fontSize: 19 }}
        />
      </div>
      <Typography
        variant="h5"
        component="h1"
        style={props.style}
        className={clsx(classes.branding, props.className)}
      >
        <sup className={classes.beta}>β</sup>
        Atlas
      </Typography>
    </div>
  );
};

export default Logo;
