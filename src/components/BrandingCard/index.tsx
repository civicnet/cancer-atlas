import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Icon,
  CardActions,
  Button,
  Popover,
  Box,
  IconButton,
  Collapse
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/rootReducer";

import clsx from "clsx";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { toggleBrandingCardExpansion } from "./BrandingCardSlice";

const useStyles = makeStyles(theme => ({
  gradientText: {
    background: "linear-gradient(135deg, #009fff 0%, #ec2f4b 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  branding: {
    fontWeight: 900,
    lineHeight: "32px",
    textTransform: "uppercase",
    marginBottom: 12
  },
  brandingSymbol: {
    marginRight: 12,
    width: "unset"
  },
  card: {
    width: "100%"
  },
  beta: {
    fontFamily: "Architects Daughter, cursive",
    fontSize: 14,
    textTransform: "lowercase"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto !important",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

const BrandingCard: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { expanded } = useSelector(
    (state: RootState) => state.brandingCardReducer
  );

  const handleExpandClick = () => {
    dispatch(toggleBrandingCardExpansion())
  };

  return (
    <Card className={classes.card}>
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography
          variant="h5"
          component="h2"
          className={clsx(classes.branding, classes.gradientText)}
        >
          <Icon
            className={clsx(
              classes.brandingSymbol,
              classes.gradientText,
              "fas fa-lungs"
            )}
          />
          Navigator
              <sup className={classes.beta}>α</sup>
        </Typography>
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
      </CardContent>
      <CardActions>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {popupState => (
            <div>
              <Button
                size="small"
                color="primary"
                {...bindTrigger(popupState)}
              >
                Despre proiect
                    <Icon
                  className="far fa-question-circle"
                  style={{ marginLeft: 4, fontSize: 13 }}
                />
              </Button>

              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <Box p={2} style={{ maxWidth: 320 }}>
                  <Typography variant="body1">
                    Un proiect{" "}
                    <a
                      href="https://civicnet.ro"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CivicNet
                        </a>{" "}
                    și{" "}
                    <a
                      href="https://www.facebook.com/SanatatepentruComunitate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Asociația Sănătate pentru Comunitate
                        </a>
                    .
                      </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ marginTop: 6 }}
                  >
                    Ne propunem să dezvoltăm{" "}
                    <strong>
                      prima aplicație dedicată pacienților de cancer
                      pulmonar din România
                        </strong>
                    , navigatorilor acestora, dar și personalului medical.
                      </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ marginTop: 6 }}
                  >
                    Aplicația va conține informații importante despre
                    traseul pacienților, de la diagnosticare până la
                        îngrijire paliativă, și informații sub formă de{" "}
                    <a
                      href="https://sanatateabuzoiana.ro/primul-ghid-al-supravietuitorului-de-cancer-localizat-la-nivelul-capului-si-gatului/#.XgDw6sYzZhE"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      ghiduri pentru pacienți.
                        </a>
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ marginTop: 6 }}
                  >
                    În momentul de față, aplicația se află în stadiul de
                    prototip interactiv. Ne puteți urmări pe Facebook pentru
                    a fi la curent cu ultimele noutăți.
                      </Typography>
                </Box>
              </Popover>
            </div>
          )}
        </PopupState>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body2"
            component="p"
            style={{ marginTop: 6 }}
          >
            Poți explora harta prin hover și click pe punctele afișate, și
            prin selecția categoriilor de furnizori medicali pe care dorești
                să îi afișezi. Datele sunt preluate pentru Municipiul București{" "}
            <a
              href="http://www.cnas.ro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              de pe site-ul CNAS
                </a>
            .
              </Typography>
          <Typography
            variant="body2"
            component="p"
            style={{ marginTop: 6 }}
          >
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
          <Typography
            variant="body2"
            component="p"
            style={{ marginTop: 6 }}
          >
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
      </Collapse>
    </Card>
  );
};

export default BrandingCard;
