import React, { useState, useEffect } from "react";
import { TextField, Button, makeStyles, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
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
  },
  dense: {
    marginTop: theme.spacing(0)
  },
  icon: {
    margin: theme.spacing(0),
    fontSize: 20
  }
}));

const TasksTable = props => {
  const classes = useStyles();
  const [edittedTasks, setEdittedTasks] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setEdittedTasks(props.weeklyTasks);
  }, []);

  const handleContentEditable = e => {
    const tasks = [...props.tasks];
    const index = tasks.findIndex(
      task => task._id === e.currentTarget.dataset.task
    );

    if (!e.currentTarget.dataset.day) {
      tasks[index].title = trimSpaces(e.target.value);
    } else {
      const dayIndex = tasks[index].days.findIndex(
        day => day._id === e.currentTarget.dataset.day
      );
      if (e.target.value === "") {
        tasks[index].days[dayIndex].duration = 0;
      } else {
        tasks[index].days[dayIndex].duration = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
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
    const total = task.days.reduce((a, b) => {
      return a + Number(b.duration);
    }, 0);

    return total.toFixed(2)
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
    <Grid>
      <Grid item>
        <h5 className="card-header text-center font-weight-bold  text-uppercase py-2">
          Tasks for week {props.date.week}
        </h5>
        <div className="card-body">
          <div id="table" className="table-editable">
            <table style={{overflowX:" auto"}}  className="table table-bordered table-responsive-md table-striped text-center">
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
                {props.weeklyTasks &&
                  props.weeklyTasks.map(task => {
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
                            style={{padding: "2px 1px"}}
                            className="btn btn-info btn-rounded btn-sm my-0 m-1"
                          >
                            Update
                            {/* <UpdateIcon className={classes.icon} /> */}
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => props.deleteTask(task._id)}
                            type="button"
                            style={{padding: "2px 1px"}}
                            className="btn btn-danger btn-rounded btn-sm my-0 m-1"
                          >
                            Delete
                            {/* <DeleteIcon className={classes.icon} /> */}
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
                  type="submit"
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
      </Grid>
    </Grid>
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
