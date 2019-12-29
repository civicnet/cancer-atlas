import React from "react";
import { makeStyles, IconButton, Icon } from "@material-ui/core";
import Container from "./Container";
import InfoCard from "../components/InfoCard";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  infoCard: {
    width: 350,
    paddingTop: 20
  }
}));

const About: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <IconButton
        component={Link}
        to="/cancer-atlas"
        style={{ position: "absolute", top: 4, right: 4, zIndex: 150 }}
      >
        <Icon className="far fa-times" style={{ fontSize: 16 }} />
      </IconButton>
      <InfoCard className={classes.infoCard} style={{ paddingRight: 28 }} />
    </Container>
  );
};

export default About;
