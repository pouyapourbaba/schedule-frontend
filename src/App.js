import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RegisterFormMUI from "./components/RegisterFormMUI";
import LoginFormMUI from "./components/LoginFormMUI";
import MainLayout from "./components/MainLayout";
import NotFound from "./components/notFound";
import Alert from "./components/layout/Alert";
import "./App.css";

// Redux Init
import { Provider } from "react-redux";
import store from "./store";

import { getMonthlySums, getWeeklySums } from "./redux/actions/taskActions";
import { loadUser } from "./redux/actions/authActions";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) setAuthToken(localStorage.token);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    // store.dispatch(getMonthlySums())
    // store.dispatch(getWeeklySums())
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Alert />
          <Route path="/dashboard" component={MainLayout} />
          <Route path="/login" component={LoginFormMUI} />
          <Route path="/register" component={RegisterFormMUI} />
          <Route path="/not-found" component={NotFound} />
          {/* <Redirect from="/" to="/main" /> */}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
