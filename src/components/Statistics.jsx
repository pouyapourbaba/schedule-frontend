import React from "react";
import BarChart from "./barChart";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>Dashboard</h1>
      </div>
      <p>The charts below show the working hours based on month and week.</p>
      <BarChart />
    </React.Fragment>
  );
};

export default Dashboard;
