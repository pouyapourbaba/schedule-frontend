import React, { Component } from "react";
import taskService from "../services/taskService";
import { drawMonthlyBarChart } from "../utils/barChart";

class BarChart extends Component {
  state = {};

  async componentDidMount() {
    if (this.props.user_id) {
      // Get the monthly data
      const monthlyData = await taskService.getMonthlyTotalDurations(
        this.props.user_id
      );

      // Get the weekly data
      const weeklyData = await taskService.getWeeklyTotalDurations(
        this.props.user_id
      );
      drawMonthlyBarChart(monthlyData.data);
    }
  }

  render() {
    return <div className="canvas" style={{ border: "1px solid #ccc" }} />;
  }
}

export default BarChart;
