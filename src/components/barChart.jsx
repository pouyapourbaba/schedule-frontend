import React, { useEffect } from "react";
import { drawMonthlyBarChart, drawWeeklyBarChart } from "../utils/barChart";
import { connect } from "react-redux";

const BarChart = props => {
  useEffect(() => {
    drawMonthlyBarChart(props.monthly);
    drawWeeklyBarChart(props.weekly);
  }, []);

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
};

const mapStateToProps = state => ({
  monthly: state.tasks.monthly,
  weekly: state.tasks.weekly
});

export default connect(mapStateToProps)(BarChart);
