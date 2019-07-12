import React, { Component } from "react";
import taskService from "../services/taskService";
import http from "../services/httpService";
import { drawMonthlyBarChart, drawWeeklyBarChart } from "../utils/barChart";

import { connect } from "react-redux";
import { getMonthlySums } from "../redux/actions/taskActions";

class BarChart extends Component {
  state = {};

  async componentDidMount() {
    if (this.props.user_id) {
      // Get the monthly data
      const monthlyData = await http.get("/tasks/sum-months");
      console.log("monthlyData barchart", monthlyData);
      drawMonthlyBarChart(monthlyData.data);
      // drawMonthlyBarChart(this.props.monthly)
      // console.log("barchart", this.props);

      // Get the weekly data
      const weeklyData = await http.get("/tasks/sum-weeks");
      drawWeeklyBarChart(weeklyData.data);
      console.log("weeklyData barchart ", weeklyData.data);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>
          <span className="badge badge-dark">MONTHLY</span>
        </h1>
        <div className="canvas-monthly" style={{ border: "1px solid #ccc" }} />
        <h1>
          <span className="badge badge-dark">WEEKLY</span>
        </h1>
        <div className="canvas-weekly" style={{ border: "1px solid #ccc" }} />
      </React.Fragment>
    );
  }
}

const mapstateToProps = state => ({
  monthly: state.tasks
});

export default connect(
  mapstateToProps,
  { getMonthlySums }
)(BarChart);
