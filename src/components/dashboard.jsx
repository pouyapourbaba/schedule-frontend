import React, { Component } from "react";
import BarChart from "./barChart";
import taskService from "../services/taskService";

class Dashboard extends Component {
  state = { data: [], width: 700, height: 500, durations: [0,0,0,0,0,0,0,0,0,0,0,0]};
  
  
  
  async componentDidMount() {
    let user_id;
    if (this.props.match.params.user_id === undefined) return;
    else user_id = this.props.match.params.user_id;
    this.setState({user_id})

    // try {
    //   // GET all the tasks
    //   const { data: tasks } = await taskService.getAllTasks(user_id);
    //   tasks.reverse();
    //   this.setState({ tasks });

    //   const data = [
    //     { month: "january", month_id: 1, totalDurationForThatMonth: 0 },
    //     { month: "february", month_id: 2 , totalDurationForThatMonth: 0},
    //     { month: "march", month_id: 3 , totalDurationForThatMonth: 0},
    //     { month: "april", month_id: 4 , totalDurationForThatMonth: 0},
    //     { month: "may", month_id: 5 , totalDurationForThatMonth: 0},
    //     { month: "june", month_id: 6 , totalDurationForThatMonth: 0},
    //     { month: "july", month_id: 7 , totalDurationForThatMonth: 0},
    //     { month: "august", month_id: 8 , totalDurationForThatMonth: 0},
    //     { month: "september", month_id: 9 , totalDurationForThatMonth: 0},
    //     { month: "october", month_id: 10, totalDurationForThatMonth: 0 },
    //     { month: "november", month_id: 11, totalDurationForThatMonth: 0 },
    //     { month: "december", month_id: 12, totalDurationForThatMonth: 0 }
    //   ];


    //   let totalDurationForThatMonth = 0;
    //   for (let item of data) {
    //     item.tasksInMonth = tasks.filter(task => task.month === item.month_id);
    //     item.days = item.tasksInMonth.map(task => task.days);
    //     for (let i of item.days) {
    //         const taskDuration = i.map(dd => parseInt(dd.duration))
    //         totalDurationForThatMonth += taskDuration.reduce(
    //           (accumulator, currentValue) =>
    //             accumulator + currentValue
    //         )
    //     item.totalDurationForThatMonth =   totalDurationForThatMonth;  
    //   }}
      
    //   const durations = data.map(data => data.totalDurationForThatMonth)
    //   this.setState({durations})
    // } catch (ex) {
    //   console.log(ex.message);
    // }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Dashboard</h1>
        <p>Something cool is gonna happen in this page, stay tuned...</p>
        <BarChart
          // data={this.state.durations}
          // width={this.state.width}
          // height={this.state.height}
          user_id={this.state.user_id}
        />
      </React.Fragment>
    );
  }
}

export default Dashboard;
