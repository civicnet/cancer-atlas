import React, { useEffect } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Icon,
  IconButton
} from "@material-ui/core";
import Container from "./Container";
import Octokit from "@octokit/rest";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    width: 350,
    height: "85vh",
    overflowY: "auto",
    paddingTop: 20
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

interface Commit {
  sha: string;
  commit: {
    message: string;
    url: string;
    author: {
      date: string;
    };
  };
  author: {
    avatar_url: string;
    login: string;
    url: string;
  };
}

const octokit = new Octokit({
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
  }
});

const Changelog: React.FC = () => {
  const classes = useStyles();
  const [commits, setCommits] = React.useState();

  useEffect(() => {
    (async function _() {
      const repsonse = await octokit.repos.listCommits({
        owner: "CivicNet",
        repo: "cancer-atlas",
        per_page: 100
      });
      setCommits(repsonse ? repsonse.data : null);
    })();
  }, []);

  if (!commits) {
    return null;
  }

  return (
    <Container>
      <IconButton
        component={Link}
        to="/cancer-atlas"
        style={{ position: "absolute", top: 4, right: 4, zIndex: 150 }}
      >
        <Icon className="far fa-times" style={{ fontSize: 16 }} />
      </IconButton>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">
            Ultimele {commits.length} actualizari pe{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Typography>
          <List className={classes.root} dense>
            {commits.map((commit: Commit) => (
              <React.Fragment key={commit.sha}>
                <ListItem alignItems="flex-start" disableGutters={true}>
                  <ListItemAvatar>
                    <Avatar
                      alt={commit.author.login}
                      src={commit.author.avatar_url}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={commit.author.login}
                    secondary={
                      <a
                        href={commit.commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "inherit"
                        }}
                      >
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {new Intl.DateTimeFormat("ro-RO").format(
                            new Date(commit.commit.author.date)
                          )}
                        </Typography>
                        {` — ${commit.commit.message}`}
                      </a>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Changelog;
