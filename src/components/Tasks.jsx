import React, { useState, useEffect } from "react";
import moment from "moment";
import WeekPicker from "./WeekPicker";
import { connect } from "react-redux";
import {
  postTask,
  getTasksForWeek,
  deleteTask
} from "../redux/actions/taskActions";

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
    setTitle("");
  };

  return (
    <div>
      <WeekPicker />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {props.tasks &&
          props.tasks.map(task => {
            return (
              <li key={task._id}>
                {task.title}
                {task.days.map(day => day.day + " " + day.duration + " ")}
                <button onClick={() => props.deleteTask(task._id)}>
                  delete
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const mapstateToProps = state => ({
  date: state.date,
  tasks: state.tasks.tasks
});

export default connect(
  mapstateToProps,
  { postTask, getTasksForWeek, deleteTask }
)(Tasks);
