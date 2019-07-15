import React from "react";
import { Paper, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import WeekPicker from "./WeekPicker";
import TasksTable from "./TasksTable";
import WeekDesc from "./WeekDesc";

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

const Tasks = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={12} lg={3}>
        <Paper className={fixedHeightPaper}>
          <WeekPicker />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={12} lg={9}>
        <Paper className={fixedHeightPaper}>
          <WeekDesc />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <TasksTable />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Tasks;
