import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MainListItems from "./listItems";
import MessageBoard from "./messageBoard";
import TweetSearchTamplate from "./tweetSearchTamplate";
import TweetPost from "./tweetPost";
import FavoriteList from "./favoriteList";
import { withRouter } from "react-router";

const drawerWidth = 240;
const reuireOptions = {
  TweetGetByUser: "Get Tweet By User",
  TweetPost: "Post Tweet",
  TweetLikeAndSearch: "Search Tweet and Like",
  FavoriteList: "Favorite Tweet List"
};
const tableTitle = {
  TweetGetByUser: ["User", "Screen Name", "Tweet"],
  TweetPost: "Post Tweet",
  TweetLikeAndSearch: ["User", "Screen Name", "Tweet", "Favorited"],
  FavoriteList: ["User", "Screen Name", "Tweet", "Favorited"]
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  messageBorder: {
    marginTop: 10
  }
}));

export default function Homepage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [optionSelect, setOptionSelect] = React.useState("TweetGetByUser");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      props.history.push({
        pathname: "/"
      });
    }
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            HomePage
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems
            items={reuireOptions}
            setOptionSelect={setOptionSelect}
          />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <span>{reuireOptions[optionSelect]}</span>
                {
                  {
                    TweetGetByUser: (
                      <TweetSearchTamplate
                        type={"TweetGetByUser"}
                        search
                        tableTitle={tableTitle[optionSelect]}
                      />
                    ),
                    TweetPost: <TweetPost />,
                    TweetLikeAndSearch: (
                      <TweetSearchTamplate
                        type={"TweetLikeAndSearch"}
                        favoriteIcon
                        search
                        tableTitle={tableTitle[optionSelect]}
                      />
                    ),
                    FavoriteList: (
                      <TweetSearchTamplate
                        type={"FavoriteList"}
                        get
                        favoriteIcon
                        preSending
                        tableTitle={tableTitle[optionSelect]}
                      />
                    )
                  }[optionSelect]
                }
              </Paper>
              {/**  <Paper
                className={[classes.paper, classes.messageBorder].join(" ")}
              >
                <span>Discussion Board</span>
                <MessageBoard />
              </Paper>*/}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
