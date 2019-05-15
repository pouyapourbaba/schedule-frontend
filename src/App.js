import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import _ from "lodash";
import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import Todos from "./components/todos";
import TimeTracker from "./components/timeTracker";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import Home from "./components/home";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Dashboard from "./components/dashboard";
import SideBar from "./components/sideBar";
import ProtectedRoute from "./components/common/protectedRoute";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCurrentUser, updateUser } from "./redux/actions/userActions";
import { withRouter } from "react-router";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    const user = this.props.user.user ? this.props.user.user : {};
    
    // if the user object is empty do not render
    if (_.isEmpty(user)) return null;

    return (
      <React.Fragment>
        <NavBar user_id={user._id} />
        <div className="container-fluid">
          <div className="row">
            <SideBar user_id={user._id} />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Switch>
                <ProtectedRoute
                  path="/profile/:user_id"
                  user={user}
                  render={(props) => <Profile {...this.props} user={user} {...props} />}
                />
                <ProtectedRoute
                  path="/todos/:user_id"
                  user={user}
                  component={Todos}
                />
                <ProtectedRoute
                  path="/timetracker/:user_id"
                  user={user}
                  component={TimeTracker}
                />
                <ProtectedRoute
                  path="/dashboard/:user_id"
                  user={user}
                  component={Dashboard}
                />
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/logout" component={Logout} />
                <Route path="/not-found" component={NotFound} />
                <Route path="/" exact component={Home} />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentUser, updateUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
