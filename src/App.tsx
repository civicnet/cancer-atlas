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
  List, CssBaseline, AppBar, Toolbar, IconButton, Drawer, Divider, ListItem, ListItemIcon, ListItemText, useTheme, fade, InputBase, Badge,
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useSelector } from 'react-redux'
import { RootState } from './store/rootReducer'

import Tooltip from "./components/Tooltip";
import SwitchListItem from "./components/SwitchListItem";
import LayerPicker from "./components/LayerPicker";
import Legend from "./components/Legend";
import BrandingCard from "./components/BrandingCard";
import clsx from "clsx";
import Logo from "./components/Logo";

const drawerWidth = 240;
export const APP_BAR_COLOR = '#222f3e';

const useStyles = makeStyles(theme => ({
  aside: {
    zIndex: 10,
    position: "absolute",
    top: 90,
    left: 96,
    minWidth: 345,
    maxWidth: 345
  },
  tooltipContainer: {
    zIndex: 10,
    position: "absolute",
    top: 20,
    right: 20,
    minWidth: 345,
    maxWidth: 345
  },
  filterList: {},
  card: {
    width: "100%"
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
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: APP_BAR_COLOR,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 325,
    },
  },
  toolbarIcons: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [tooltip, setTooltip] = React.useState();
  const [pinnedTooltip, setPinnedTooltip] = React.useState();

  const { services } = useSelector(
    (state: RootState) => state.switchListItemReducer,
  );
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer,
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

  const menuId = 'primary-search-account-menu';
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{ color: '#fff' }} />
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
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.toolbarIcons}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <aside className={classes.aside}>
        <BrandingCard />
        <Card
          className={classes.card}
          style={{ marginTop: 20, paddingBottom: 0 }}
        >
          <CardContent>
            <List className={classes.filterList}>
              {Object.values(ServiceType).map(type => (
                <SwitchListItem key={type} serviceType={type} layerType={layerType} />
              ))}
            </List>
          </CardContent>
        </Card>
        <div
          style={{
            display: "flex",
            flex: 1,
            marginTop: 20,
            backgroundColor: "transparent"
          }}
        >
          <LayerPicker />
          <Legend />
        </div>
      </aside>
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
