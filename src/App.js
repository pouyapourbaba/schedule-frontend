import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import Todos from "./components/todos";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import Home from "./components/home";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import Dashboard from "./components/dashboard";
import SideBar from "./components/sideBar";
import "./App.css";

class App extends Component {
  // set the state to get the user information
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        {this.state.user && (
          <div className="row">
            <div className="col-sm-3 col-lg-2">
              <SideBar />
            </div>
            <main className="col-9 container">
              <Switch>
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/logout" component={Logout} />
                <Route path="/profile" component={Profile} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/todos" component={Todos} />
                <Route path="/not-found" component={NotFound} />
                <Route path="/" exact component={Home} />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </div>
        )}
        {!this.state.user && <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/profile" component={Profile} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/todos" component={Todos} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </main>}
      </React.Fragment>
    );
  }
}

export default App;
