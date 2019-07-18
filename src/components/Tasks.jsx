import React, { useEffect } from "react";
import { Paper, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import WeekPicker from "./WeekPicker";
import TasksTable from "./TasksTable";
import WeekDesc from "./WeekDesc";

// Redux
import { connect } from "react-redux";
import {
  getTasksForWeek,
  initializeTasks
} from "./../redux/actions/taskActions";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 340
  }
}));

const Tasks = props => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    props.initializeTasks();
  }, []);

  const weeklyTasks = props.tasks.filter(task => task.week === props.date.week);

  return (
    <div>
      <Grid container spacing={3} style={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <Paper className={fixedHeightPaper}>
            <WeekPicker />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={7} lg={8}>
          <Paper className={fixedHeightPaper}>
            <WeekDesc weeklyTasks={weeklyTasks} />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper>
            <TasksTable weeklyTasks={weeklyTasks} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  allTasks: state.tasks.allTasks,
  date: state.date
});

export default connect(
  mapStateToProps,
  { getTasksForWeek, initializeTasks }
)(Tasks);
