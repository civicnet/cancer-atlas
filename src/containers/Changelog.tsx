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
import { graphql } from "@octokit/graphql";
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
  author: {
    avatarUrl: string;
    name: string;
    date: string;
    user: {
      bio: string;
    };
  };
  commitUrl: string;
  additions: string;
  deletions: string;
  message: string;
  messageBody: string;
  messageHeadline: string;
}

const Changelog: React.FC = () => {
  const classes = useStyles();
  const [repository, setRepository] = React.useState();

  const getRepo = async () => {
    return await graphql(
      `
        {
          repository(owner: "CivicNet", name: "cancer-atlas") {
            refs(first: 3, refPrefix: "refs/heads/") {
              totalCount
              edges {
                node {
                  name
                  target {
                    ... on Commit {
                      history(first: 100) {
                        nodes {
                          author {
                            avatarUrl
                            name
                            date
                            user {
                              bio
                            }
                          }
                          commitUrl
                          additions
                          deletions
                          message
                          messageBody
                          messageHeadline
                        }
                        totalCount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {
        headers: {
          authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      }
    );
  };

  useEffect(() => {
    (async function _() {
      const data = await getRepo();
      setRepository(data ? data.repository : null);
    })();
  }, []);

  if (!repository) {
    return null;
  }

  const branches = repository.refs.edges;
  let commits = [];
  for (const branch of branches) {
    if (branch.node.name === "master") {
      commits = branch.node.target.history.nodes;
      break;
    }
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
              <React.Fragment key={commit.commitUrl}>
                <ListItem alignItems="flex-start" disableGutters>
                  <ListItemAvatar>
                    <Avatar
                      alt={commit.author.name}
                      src={commit.author.avatarUrl}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={commit.author.name}
                    secondary={
                      <a
                        href={commit.commitUrl}
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
                            new Date(commit.author.date)
                          )}
                        </Typography>
                        {` — ${commit.messageHeadline}`}
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
