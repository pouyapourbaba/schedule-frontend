import React, { useState, useEffect } from "react";
import moment from "moment";
import clsx from "clsx";
import { TextField, Button, makeStyles } from "@material-ui/core";
import ContentEditable from "react-contenteditable";
import { connect } from "react-redux";
import {
  postTask,
  getTasksForWeek,
  deleteTask,
  updateTaske
} from "../redux/actions/taskActions";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    // width: 200,
    // border: "1px red solid"
  },
  dense: {
    marginTop: theme.spacing(0)
  }
}));

const TasksTable = props => {
  const classes = useStyles();
  const [edittedTasks, setEdittedTasks] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // grab the tasks for the current week
    props.getTasksForWeek(parseInt(moment().format("W")));

    setEdittedTasks(props.tasks);
  }, []);

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

  // disable new lines in the ContentEditable
  const disableNewlines = event => {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
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

  // trim the spaces in the ContentEditable
  const trimSpaces = string => {
    return string
      .replace(/&nbsp;/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<");
  };
  return (
    <React.Fragment>
      <h5 className="card-header text-center font-weight-bold  text-uppercase py-2">
        Tasks for week {props.date.week}
      </h5>
      <div className="card-body">
        <div id="table" className="table-editable">
          <table className="table table-bordered table-responsive-md table-striped text-center">
            <thead>
              <tr>
                <th className="text-center">Task</th>
                <th className="text-center">Mon</th>
                <th className="text-center">Tue</th>
                <th className="text-center">Wed</th>
                <th className="text-center">Thu</th>
                <th className="text-center">Fri</th>
                <th className="text-center">Sat</th>
                <th className="text-center">Sun</th>
                <th className="text-center">Tot</th>
                <th className="text-center" />
                <th className="text-center" />
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
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                required
                id="outlined-name"
                label="New Task"
                className={classes.textField}
                onChange={({ target }) => setTitle(target.value)}
                value={title}
                margin="dense"
                rowsMax="4"
                variant="outlined"
              />
              <Button
                variant="contained"
                style={{ background: "#2E3B55", color: "#fff" }}
                className={classes.button}
              >
                ADD
              </Button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapstateToProps = state => ({
  date: state.date,
  tasks: state.tasks.tasks
});

export default connect(
  mapstateToProps,
  { postTask, getTasksForWeek, deleteTask, updateTaske }
)(TasksTable);
