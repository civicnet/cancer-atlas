import React from "react";
import { makeStyles } from "@material-ui/core";
import Container from "./Container";
import BrandingCard from "../components/BrandingCard";

const useStyles = makeStyles(theme => ({
  brandingCard: {
    width: 350
  }
}));

const About: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <BrandingCard className={classes.brandingCard} />
    </Container>
  );
};

export default About;
