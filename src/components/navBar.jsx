import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow justify-content-between">
        <NavLink className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          Schedu
        </NavLink>
        {!this.props.user_id && (
          <ul className="navbar-nav mr-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        )}
        {this.props.user_id && (
          <ul className="navbar-nav mr-3">
            <li className="nav-item">
              <NavLink className="nav-link text-nowrap" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default NavBar;
