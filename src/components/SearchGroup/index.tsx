import React from "react";
import {
  makeStyles,
  fade,
  InputBase,
  IconButton,
  Badge,
  Icon,
  Card,
  CardContent,
  List
} from "@material-ui/core";
import clsx from "clsx";
import { ServiceType } from "../ServiceMap";
import SwitchListItem from "../SwitchListItem";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { setQuery } from "./SearchGroupSlice";

const useStyles = makeStyles(theme => ({
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

const SearchGroup: React.FC = () => {
  const classes = useStyles();
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const dispatch = useDispatch();

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleChangeQuery = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(ev.target.value));
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Cauta servicii medicale (ex: radiologie)"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        onChange={handleChangeQuery}
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
          <List dense={true}>
            {Object.values(ServiceType).map(type => (
              <SwitchListItem key={type} serviceType={type} />
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchGroup;
