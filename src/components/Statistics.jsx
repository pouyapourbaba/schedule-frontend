import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import BarChart from "./barChart";
import { Paper } from "@material-ui/core";

const Statistics = props => {
  const monthlyTickFormat = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const monthlyTickValues = Array.from(Array(12).keys());

  let weeklyTicks = [];
  for (let i = 0; i < 52; i++) {
    weeklyTicks[i] = `W${i + 1}`;
  }
  const weeklyTickValues = Array.from(Array(52).keys());

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>Statistics</h1>
      </div>
      <p>
        The charts below show the monthly and weekly amount of time you spent on
        doing your tasks.
      </p>

      <h2>
        <span className="badge badge-dark">MONTHLY</span>
      </h2>
      <Paper style={{ paddingLeft: "20px", paddingBottom: "20px" }}>
        <BarChart
          data={props.monthly}
          tickFormat={monthlyTickFormat}
          tickValues={monthlyTickValues}
          extraDomainPadding={5}
          title={"Sums of each month"}
          xAxisLabel={"months"}
        />
      </Paper>

      <h2>
        <span className="badge badge-dark">WEEKLY</span>
      </h2>
      <Paper style={{ paddingLeft: "20px", paddingBottom: "20px" }}>
        <BarChart
          data={props.weekly}
          tickFormat={weeklyTicks}
          tickValues={weeklyTickValues}
          extraDomainPadding={1}
          title={"Sums of each week"}
          xAxisLabel={"weeks"}
        />
      </Paper>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  monthly: state.tasks.monthly,
  weekly: state.tasks.weekly
});

export default connect(mapStateToProps)(Statistics);
