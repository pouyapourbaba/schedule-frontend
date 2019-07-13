import React, { useState, useEffect } from "react";
import moment from "moment";
import ContentEditable from "react-contenteditable";
import WeekPicker from "./WeekPicker";
import { connect } from "react-redux";
import {
  postTask,
  getTasksForWeek,
  deleteTask,
  updateTaske
} from "../redux/actions/taskActions";

const Tasks = props => {
  const [title, setTitle] = useState("");
  const [edittedTasks, setEdittedTasks] = useState(null);

  useEffect(() => {
    // grab the tasks for the current week
    props.getTasksForWeek(parseInt(moment().format("W")));

    setEdittedTasks(props.tasks);
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

  const totalDuration = task => {
    return task.days.reduce((a, b) => {
      return a + Number(b.duration);
    }, 0);
  };

  const handleUpdateTask = task => {
    if (!edittedTasks) return;
   props.updateTaske(task);
  };

  const handleChangeTasks = e => {
    console.log(e.target.name);
  };

  const handleContentEditable = e => {
    const tasks = [...props.tasks];
    const index = tasks.findIndex(
      task => task._id === e.currentTarget.dataset.task
    );

    if (!e.currentTarget.dataset.day) {
      tasks[index].title = e.target.value;
      const obj = { title: e.target.value };
    } else {
      const dayIndex = tasks[index].days.findIndex(
        day => day._id === e.currentTarget.dataset.day
      );
      if (e.target.value === "") {
        tasks[index].days[dayIndex].duration = 0;
      } else {
        tasks[index].days[dayIndex].duration = parseInt(e.target.value);
      }
      setEdittedTasks(tasks);
    }
  };

  // disable new lines in the ContentEditable
  const disableNewlines = event => {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  // trim the spaces in the ContentEditable
  const trimSpaces = string => {
    return string
      .replace(/&nbsp;/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<");
  };

  console.log("tasks rendered")

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

      <div className="card">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
          Tasks for week {props.date.week}
        </h3>
        <div className="card-body">
          <div id="table" className="table-editable">
            <table className="table table-bordered table-responsive-md table-striped text-center">
              <thead>
                <tr>
                  <th className="text-center">Task</th>
                  <th className="text-center">Monday</th>
                  <th className="text-center">Tuesday</th>
                  <th className="text-center">Wednesday</th>
                  <th className="text-center">Thursday</th>
                  <th className="text-center">Friday</th>
                  <th className="text-center">Saturday</th>
                  <th className="text-center">Sunday</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Submit</th>
                  <th className="text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {props.tasks &&
                  props.tasks.map(task => {
                    return (
                      <tr key={task._id}>
                        <td
                          className="pt-3-half title"
                          style={{ textAlign: "center" }}
                        >
                          <ContentEditable
                            html={String(task.title)}
                            data-task={task._id}
                            className="content-editable"
                            onChange={handleContentEditable}
                            onKeyPress={disableNewlines}
                          />
                        </td>
                        {task.days.map(day => (
                          <td
                            key={day._id}
                            className="pt-3-half"
                            style={{ textAlign: "center" }}
                          >
                            <ContentEditable
                              html={String(day.duration)}
                              data-task={task._id}
                              data-day={day._id}
                              className="content-editable"
                              onChange={handleContentEditable}
                              onKeyPress={disableNewlines}
                            />
                          </td>
                        ))}
                        <td>{totalDuration(task)}</td>
                        <td>
                          <button
                            onClick={() => handleUpdateTask(task)}
                            type="button"
                            className="btn btn-info btn-rounded btn-sm my-0"
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => props.deleteTask(task._id)}
                            type="button"
                            className="btn btn-danger btn-rounded btn-sm my-0"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapstateToProps = state => ({
  date: state.date,
  tasks: state.tasks.tasks
});

export default connect(
  mapstateToProps,
  { postTask, getTasksForWeek, deleteTask, updateTaske }
)(Tasks);
