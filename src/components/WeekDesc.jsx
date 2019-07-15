import React, { useEffect } from "react";
import { drawLineChartForOneWeek } from "./../utils/lineChart";

const WeekDesc = props => {
  useEffect(() => {
    drawLineChartForOneWeek(props.weeklyTasks);
  }, [props.weeklyTasks]);

  if (!props.weeklyTasks) return null;

  return (
    <div>
      <h2>Week Stats</h2>
      there are {props.weeklyTasks.length} tasks
      <div id="weekDesc" className="canvas-for-week-desc" />
    </div>
  );
};

export default WeekDesc;
