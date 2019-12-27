import React from "react";

import { loadCSS } from "fg-loadcss";

import ServiceMap, {
  ServiceType,
  ServiceObject
} from "./components/ServiceMap";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
  fade,
  InputBase,
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
import SearchIcon from "@material-ui/icons/Search";

import { useSelector } from "react-redux";
import { RootState } from "./store/rootReducer";

import Tooltip from "./components/Tooltip";
import SwitchListItem from "./components/SwitchListItem";
import LayerPicker from "./components/LayerPicker";
import Legend from "./components/Legend";
import clsx from "clsx";
import Logo from "./components/Logo";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

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
  filterList: {},
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 325
    }
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
  },
  filterOpen: {
    transition: theme.transitions.create("max-height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    maxHeight: 345
  },
  filterClose: {
    maxHeight: 0,
    overflowY: "hidden",
    transition: theme.transitions.create("max-height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  filterCard: {
    width: 350,
    right: 0,
    position: "absolute",
    paddingBottom: 0
  },
  filterCardContent: {
    paddingBottom: 0
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Cauta servicii medicale (ex: pneumolog)"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              aria-label="filtreaza"
              color="inherit"
              onClick={toggleFilters}
            >
              <Badge badgeContent={0} color="secondary">
                <Icon className="far fa-filter" style={{ fontSize: 16 }} />
              </Badge>
            </IconButton>
            <Card
              className={clsx(classes.filterCard, {
                [classes.filterOpen]: isFilterOpen,
                [classes.filterClose]: !isFilterOpen
              })}
            >
              <CardContent
                classes={{ root: classes.filterCardContent }}
                style={{ paddingBottom: 0 }}
              >
                <List className={classes.filterList} dense={true}>
                  {Object.values(ServiceType).map(type => (
                    <SwitchListItem
                      key={type}
                      serviceType={type}
                      layerType={layerType}
                    />
                  ))}
                </List>
              </CardContent>
            </Card>
          </div>
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
