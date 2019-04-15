import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/userService";

class NavBar extends Component {
  state = { user: { first_name: "", last_name: "", email: "" } };

  async componentDidMount() {
    // if (this.props.match.params.user_id === undefined) return;
    let user_id;
    if (this.props.user_id === undefined) return null;
    else user_id = this.props.user_id;

    try {
      let user = await getUser(user_id);
      user = user.data;
      this.setState({ user });
    } catch (ex) {
      console.log(ex.message);
    }
  }

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
        
            {!this.props.user_id && (
              <div className="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav mr-auto">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </ul>
        </div>
            )}

        {this.props.user_id && (
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <NavLink
                className="nav-link"
                to={`/dashboard/${this.props.user_id}`}
              >
                Dashboard
              </NavLink>
              <NavLink className="nav-link" to={`/todos/${this.props.user_id}`}>
                Objectives
              </NavLink>
              <NavLink
                className="nav-link"
                to={`/timetracker/${this.props.user_id}`}
              >
                TimeTracker
              </NavLink>
            </ul>
            <ul className="navbar-nav">
              <li class="nav-item dropdown dropleft">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-circle-o" aria-hidden="true" />
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink
                    className="nav-link dropdown-item"
                    to={`/profile/${this.props.user_id}`}
                  >
                    Profile
                  </NavLink>
                  <div className="dropdown-divider" />
                  <NavLink className="nav-link dropdown-item" to="/logout">
                    Logout
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

export default NavBar;
