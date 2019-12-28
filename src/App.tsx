import React from "react";

import { loadCSS } from "fg-loadcss";

import ServiceMap, { ServiceObject } from "./components/ServiceMap";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Badge,
  Icon,
  Popover,
  Box,
  Typography
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { useSelector } from "react-redux";
import { RootState } from "./store/rootReducer";

import Tooltip from "./components/Tooltip";
import LayerPicker from "./components/LayerPicker";
import Legend from "./components/Legend";
import clsx from "clsx";
import Logo from "./components/Logo";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import SearchGroup from "./components/SearchGroup";

const drawerWidth = 240;
export const APP_BAR_COLOR = "#222f3e";

const useStyles = makeStyles(theme => ({
  tooltipContainer: {
    zIndex: 10,
    position: "absolute",
    top: 20,
    right: 20,
    minWidth: 345,
    maxWidth: 345
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: APP_BAR_COLOR
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  toolbarIcons: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  layerPicker: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginTop: 20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const [tooltip, setTooltip] = React.useState();
  const [pinnedTooltip, setPinnedTooltip] = React.useState();

  const { services } = useSelector(
    (state: RootState) => state.switchListItemReducer
  );
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  React.useEffect(() => {
    loadCSS(
      "https://pro.fontawesome.com/releases/v5.10.1/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  const onServiceHover = (obj: ServiceObject) => {
    setTooltip(obj);
  };

  const onServiceClick = (obj: ServiceObject) => {
    setPinnedTooltip(obj);
  };

  const unpinTooltip = () => {
    setPinnedTooltip(null);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isDrawerOpen
            })}
          >
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Logo />
          <SearchGroup />
          <div className={classes.grow} />
          <div className={classes.toolbarIcons}>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {popupState => (
                <>
                  <IconButton
                    aria-label="despre proiect"
                    color="inherit"
                    {...bindTrigger(popupState)}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <Icon className="fas fa-question-circle" />
                    </Badge>
                  </IconButton>
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
                </>
              )}
            </PopupState>
            <IconButton
              aria-label="GitHub"
              color="inherit"
              href="https://github.com/civicnet/cancer-atlas/"
            >
              <Badge badgeContent={0} color="secondary">
                <Icon className="fab fa-github" />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <LayerPicker className={classes.layerPicker} />
      <Legend
        style={{
          position: "absolute",
          left: 96,
          bottom: 20,
          zIndex: 1,
          width: 150
        }}
      />
      <div className={classes.tooltipContainer}>
        {<Tooltip service={pinnedTooltip} onClose={unpinTooltip} />}
        {<Tooltip service={tooltip} style={{ marginTop: 20 }} />}
      </div>
      <main>
        <ServiceMap
          services={services}
          onHover={onServiceHover}
          onClick={onServiceClick}
          layerType={layerType}
        />
      </main>
    </div>
  );
};

export default App;
