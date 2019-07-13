import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import Todos from "./components/todos";
import NewTodo from "./components/NewTodo";
import TimeTracker from "./components/timeTracker";
import Tasks from "./components/Tasks";
import Profile from "./components/profile/profile";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import NotFound from "./components/notFound";
import Home from "./components/home";
import RegisterForm from "./components/registerForm";
import Dashboard from "./components/dashboard/dashboard";
import SideBar from "./components/sideBar";
import SidebarMUI from "./components/SidebarMUI";
import NavbarRS from "./components/NavbarRS";
import Alert from "./components/layout/Alert";
import ProtectedRoute from "./components/common/protectedRoute";
import WeekPicker from "./components/WeekPicker";

// Redux Init
import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./redux/actions/authActions";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import { getMonthlySums, getWeeklySums } from "./redux/actions/taskActions";

if (localStorage.token) setAuthToken(localStorage.token);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getMonthlySums())
    store.dispatch(getWeeklySums())
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {/* <NavbarRS /> */}
          <NavBar />
          {/* <div className="container-fluid"> */}
          <div className="">
            <div className="row">
            <SideBar />
            {/* <SidebarMUI /> */}
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Alert />
                <Switch>
                  <ProtectedRoute path="/profile" component={Profile} />
                  <ProtectedRoute path="/create-profile" component={CreateProfile} />
                  <ProtectedRoute path="/edit-profile" component={EditProfile} />
                  <ProtectedRoute path="/todos" component={NewTodo} />
                  <ProtectedRoute
                    path="/timetracker"
                    component={Tasks}
                  />
                  <ProtectedRoute
                    path="/dashboard"
                    component={Dashboard}
                  />
                  <Route path="/register" component={RegisterForm} />
                  <Route path="/week" component={WeekPicker} />
                  <Route path="/login" component={LoginForm} />
                  <Route path="/not-found" component={NotFound} />
                  <Route path="/" exact component={Home} />
                  <Redirect to="/not-found" />
                </Switch>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
