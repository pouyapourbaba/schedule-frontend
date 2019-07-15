import React from "react";
import { connect } from "react-redux";

const WeekDesc = props => {
  return (
    <div>
      <h2>Week Stats</h2>
      there are {props.tasks.length} tasks
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
});

export default connect(mapStateToProps)(WeekDesc);
