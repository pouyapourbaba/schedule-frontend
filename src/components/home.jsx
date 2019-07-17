import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { connect } from "react-redux";

const Home = props => {
  if (!props.auth.user) return null;

  return (
    <Paper style={{ padding: "25px" }}>
      <h1>Welcome {props.auth.user.first_name.toUpperCase()}!</h1>
      <Typography paragraph>
        Here you can plan your tasks for each week of the year and store the
        amount of time you spend on each task. Schedu enables you to analyze
        your productivity and strategy for accomplishing your responsibilities.
      </Typography>
      <Typography paragraph>
        First you go to the "tasks" tab from the side menu and there you can
        insert the name of tasks that you plan to work on. Each task will be
        assignd a row in the tasks table where you can enter the number of hours
        you worked on the task each day. You can chage the week and the month or
        the year from the calendar provided there. Moreover, a chart showing the
        sum of the hours worked on each task on each day is provided to show the
        progress.
      </Typography>
      <Typography paragraph>
        Additionally, in the Statistics tab you can see the amount of work done
        on each week and month of the year.
      </Typography>
    </Paper>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
