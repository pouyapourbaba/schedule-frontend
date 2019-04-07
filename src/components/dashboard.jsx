import React, { Component } from "react";
import Calendar from "./calendar";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Dashboard</h1>
        <Calendar />
      </React.Fragment>
    );
  }
}

export default Dashboard;
