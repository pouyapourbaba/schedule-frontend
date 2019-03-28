import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Schedu
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/login">
              Login 
            </NavLink>
            <NavLink className="nav-link" to="/todos">
              Todos
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
