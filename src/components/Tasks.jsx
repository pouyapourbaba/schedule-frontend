import React, { useState, useEffect } from "react";
import moment from "moment";
import WeekPicker from "./WeekPicker";
import { connect } from "react-redux";
import { postTask, getTasksForWeek } from "../redux/actions/taskActions";

const Tasks = props => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    // grab the tasks for the current week
    props.getTasksForWeek(parseInt(moment().format("W")));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const task = {
      title,
      ...props.date,
      days: [
        { day: "monday" },
        { day: "tuesday" },
        { day: "wednesday" },
        { day: "thursday" },
        { day: "friday" },
        { day: "saturday" },
        { day: "sunday" }
      ]
    };

    props.postTask(task);
  };

  return (
    <div>
      <WeekPicker />
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={({ target }) => setTitle(target.value)} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {props.tasks &&
          props.tasks.map(task => <li key={task._id}>{task.title}</li>)}
      </ul>
    </div>
  );
};

const mapstateToProps = state => ({
  date: state.date,
  tasks: state.tasks
});

export default connect(
  mapstateToProps,
  { postTask, getTasksForWeek }
)(Tasks);
