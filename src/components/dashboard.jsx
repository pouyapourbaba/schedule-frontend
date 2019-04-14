import React, { Component } from "react";
import BarChart from "./barChart";

class Dashboard extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    let user_id;
    if (this.props.match.params.user_id === undefined) return;
    else user_id = this.props.match.params.user_id;
    this.setState({ user_id });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Dashboard</h1>
        <p>The chart below shows the working hours in each month.</p>
            <BarChart user_id={this.props.match.params.user_id} />

      </React.Fragment>
    );
  }
}

export default Dashboard;
