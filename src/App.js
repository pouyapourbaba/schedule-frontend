import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import _ from "lodash";

import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import Todos from "./components/todos";
import TimeTracker from "./components/timeTracker";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import Home from "./components/home";
import RegisterForm from "./components/registerForm";
import Dashboard from "./components/dashboard/dashboard";
import SideBar from "./components/sideBar";
import Alert from "./components/layout/Alert";
import ProtectedRoute from "./components/common/protectedRoute";

// Redux Init
import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./redux/actions/authActions";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) setAuthToken(localStorage.token);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    console.log(store)
  }
  render() {
    const user = {};
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <NavBar />
            <div className="container-fluid">
              <div className="row">
                <SideBar user_id={user._id} />
                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-4"
                >
                  <Alert />
                  <Switch>
                    <ProtectedRoute
                      path="/profile/:user_id"
                      user={user}
                      render={props => (
                        <Profile {...this.props} user={user} {...props} />
                      )}
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
                    <Route path="/not-found" component={NotFound} />
                    <Route path="/" exact component={Home} />
                    <Redirect to="/not-found" />
                  </Switch>
                </main>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
