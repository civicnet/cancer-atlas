import React from "react";
import { makeStyles } from "@material-ui/core";
import Container from "./Container";
import BrandingCard from "../components/InfoCard";

const useStyles = makeStyles(theme => ({
  infoCard: {
    width: 350
  }
}));

const About: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <BrandingCard className={classes.infoCard} />
    </Container>
  );
};

export default About;
