import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Redux and Own
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import Tasks from "./Tasks";
import Profile from "./profile/profile";
import CreateProfileMUI from "./profile/CreateProfileMUI";
import EditProfileMUI from "./profile/EditProfileMUI";
import ProtectedRoute from "./common/protectedRoute";
import Statistics from "./Statistics";
import Home from "./home";
import {
  getWeeklySums,
  getMonthlySums,
  initializeTasks
} from "./../redux/actions/taskActions";
import Alert from "./layout/Alert";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    background: "#2E3B55",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "100%"
  },
  title: {
    flexGrow: 1
  }
}));

const ResponsiveDrawer = props => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    props.getWeeklySums();
    props.getMonthlySums();

    // get all the tasks for the user
    props.initializeTasks();
  }, []);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          { text: "home", icon: <HomeIcon /> },
          { text: "tasks", icon: <AssignmentIcon /> },
          { text: "stats", icon: <InsertChartIcon /> },
          { text: "profile", icon: <PermContactCalendarIcon /> }
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={`${props.match.url}/${item.text}`}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
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
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Alert />
        <ProtectedRoute path={`${props.match.path}/home`} component={Home} />
        <ProtectedRoute path={`${props.match.path}/tasks`} component={Tasks} />
        <ProtectedRoute
          path={`${props.match.path}/stats`}
          component={Statistics}
        />
        <ProtectedRoute
          path={`${props.match.path}/profile`}
          component={Profile}
        />
        <ProtectedRoute
          path={`${props.match.path}/create-profile`}
          component={CreateProfileMUI}
        />
        <ProtectedRoute
          path={`${props.match.path}/edit-profile`}
          component={EditProfileMUI}
        />
      </main>
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, getWeeklySums, getMonthlySums, initializeTasks }
)(ResponsiveDrawer);
