import React, { useEffect } from "react";
import { Paper, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import WeekPicker from "./WeekPicker";
import TasksTable from "./TasksTable";
import WeekDesc from "./WeekDesc";

// Redux
import { connect } from "react-redux";
import { getTasksForWeek } from "./../redux/actions/taskActions";

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
    // props.getTasksForWeek(props.date.week);
  }, []);

  const weeklyTasks = props.tasks.filter(task => task.week === props.date.week)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={12} lg={3}>
        <Paper className={fixedHeightPaper}>
          <WeekPicker />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={12} lg={9}>
        <Paper className={fixedHeightPaper}>
          <WeekDesc weeklyTasks={weeklyTasks}/>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <TasksTable weeklyTasks={weeklyTasks} />
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  allTasks: state.tasks.allTasks,
  date: state.date
});

export default connect(
  mapStateToProps,
  { getTasksForWeek }
)(Tasks);