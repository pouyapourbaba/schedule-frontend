import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Button from "@material-ui/core/Button";

// Pouya
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Tasks from "./Tasks";
import Profile from "./profile/profile";
import CreateProfile from "./profile/CreateProfile";
import EditProfile from "./profile/EditProfile";
import ProtectedRoute from "./common/protectedRoute";
import Dashboard from "./dashboard/dashboard";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  }
}));

const Home = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: "#2E3B55" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Schedu
          </Typography>
          <Button color="inherit" onClick={() => props.logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
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
          {[
            { text: "dashboard", icon: <DashboardIcon /> },
            { text: "tasks", icon: <ListIcon /> },
            { text: "profile", icon: <PermContactCalendarIcon /> }
          ].map((item, index) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={`/${item.text}`}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <BrowserRouter>
          <Switch> */}
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/create-profile" component={CreateProfile} />
        <ProtectedRoute path="/edit-profile" component={EditProfile} />
        {/* <ProtectedRoute path="/tasks" component={Tasks} /> */}
        <ProtectedRoute path="/tasks" component={<div>Ia m tasks</div>} />
        <ProtectedRoute path={`/dashboard`} component={Dashboard} />
        {/* </Switch>
        </BrowserRouter> */}
        <Typography paragraph>
          Schedu is a platform where you can set up weekly goals for yourself
          and keep track of your tasks by storing the number of hours that you
          work on a specific task in one week.
        </Typography>
        <Typography paragraph>
          The weekly objectives can be set in the Objectives page where there
          are options to edit, delete, and change the status of a goal between
          done and not done. The TimeTracker page can be used to insert tasks
          for each week and enter the amount of time that you spent working on
          that task each day. You can see the total amount of time that you have
          worked on a specific task as well.
        </Typography>
        <Typography paragraph>
          On the Dashboard page, you can see a chart which shows the number of
          hours that you have worked or studied during each week of the year
          2019.
        </Typography>
      </main>
    </div>
  );
};

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Home);
