import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// Own Redux
import { connect } from "react-redux";

class SideBar extends Component {
  render() {
    const {isAuthenticated, user} = this.props.auth
    // if no user, do not show the sideBar
    if (!isAuthenticated) return null;

    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact={true}>
                <i className="fa fa-home" aria-hidden="true" /> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/dashboard/${user._id}`}
              >
                <i className="fa fa-tachometer" aria-hidden="true" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/timetracker/${user._id}`}
              >
                <i className="fa fa-hourglass-start" aria-hidden="true" />{" "}
                TimeTracker
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/todos/${user._id}`}>
                <i className="fa fa-tasks" aria-hidden="true" /> Objectives
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link nav-item-profile"
                to={`/profile`}
              >
                <i className="fa fa-user-circle-o" aria-hidden="true" /> Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

SideBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(SideBar);