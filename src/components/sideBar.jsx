import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SideBar extends Component {
  render() {
    // if no user, do not show the sideBar
    if (!this.props.user_id) return null;

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
                to={`/dashboard/${this.props.user_id}`}
              >
                <i className="fa fa-tachometer" aria-hidden="true" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/timetracker/${this.props.user_id}`}
              >
                <i className="fa fa-hourglass-start" aria-hidden="true" />{" "}
                TimeTracker
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/todos/${this.props.user_id}`}>
                <i className="fa fa-tasks" aria-hidden="true" /> Objectives
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link nav-item-profile"
                to={`/profile/${this.props.user_id}`}
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

export default SideBar;
