import React, { Component } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import RegisterFormMUI from "./components/RegisterFormMUI";
import LoginFormMUI from "./components/LoginFormMUI";
import MainLayoutResponsive from "./components/MainLayoutResponsive";
import NotFound from "./components/notFound";
import Alert from "./components/layout/Alert";
import "./App.css";

// Redux Init
import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./redux/actions/authActions";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) setAuthToken(localStorage.token);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <Alert />
            <Switch>
              <Route path="/dashboard" component={MainLayoutResponsive} />
              <Route path="/login" component={LoginFormMUI} />
              <Route path="/register" component={RegisterFormMUI} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" to="/dashboard/home" />
              <Redirect to="/not-found" />
            </Switch>
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
