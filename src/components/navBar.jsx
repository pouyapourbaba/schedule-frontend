import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/userService";

class NavBar extends Component {
  state = { user: { first_name: "", last_name: "", email: "" } };

  async componentDidMount() {
    // if (this.props.match.params.user_id === undefined) return;

    try {
      let user = await getUser(this.props.user_id);
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            {!this.props.user_id && (
              <React.Fragment>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {this.props.user_id && (
              <React.Fragment>
                <NavLink className="nav-link" to={`/dashboard`}>
                  Dashboard
                </NavLink>
                <NavLink
                  className="nav-link"
                  to={`/profile/${this.props.user_id}`}
                >
                  {this.state.user.first_name}
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
