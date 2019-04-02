import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar">
        <div>
          <ul>
            <li>
              <NavLink className="sidebar-listitems" to={`/todos/${this.props.user._id}`}>Todos</NavLink>
            </li>
            <li>
              <NavLink className="sidebar-listitems" to="/scheduler">Scheduler</NavLink>
            </li>
            <li>
              <NavLink className="sidebar-listitems" to="/timetracker">Time Tracker</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
