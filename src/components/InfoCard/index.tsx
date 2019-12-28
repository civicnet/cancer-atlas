import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

import clsx from "clsx";
import { ComponentWithInheritedProps } from "../../types/CommonComponentProps";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%"
  }
}));

const InfoCard: React.FC<ComponentWithInheritedProps> = props => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, props.className)} style={props.style}>
      <CardContent>
        <Typography variant="body1" component="p">
          Aplicația GPS a{" "}
          <a
            href="https://www.csid.ro/health/noutati-sanatate/navigatorul-de-pacienti-specialistul-cu-rol-important-in-relatia-dintre-pacient-si-medic-16034421/"
            target="_blank"
            rel="noopener noreferrer"
          >
            navigatorilor de pacienți oncologici
          </a>{" "}
          din România.
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: 6 }}>
          Poți explora harta prin hover și click pe punctele afișate, și prin
          selecția categoriilor de furnizori medicali pe care dorești să îi
          afișezi. Datele sunt preluate pentru Municipiul București{" "}
          <a
            href="http://www.cnas.ro/"
            target="_blank"
            rel="noopener noreferrer"
          >
            de pe site-ul CNAS
          </a>
          .
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: 6 }}>
          Adițional, pentru fiecare furnizor afișat,{" "}
          <a
            href="https://github.com/civicnet/cancer-atlas-scripts"
            target="_blank"
            rel="noopener noreferrer"
          >
            am generat coordonatele GPS
          </a>{" "}
          pentru afișarea pe hartă.
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: 6 }}>
          Codul sursă complet este disponibil pe{" "}
          <a
            href="https://github.com/civicnet/cancer-atlas"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
