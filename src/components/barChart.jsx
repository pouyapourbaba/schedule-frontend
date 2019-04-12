import React, { Component } from "react";
import * as d3 from "d3";
import taskService from "../services/taskService";

class BarChart extends Component {
  state = {
    width: 700,
    height: 300,
    weeklyDurations: new Array(52).fill(0),
    monthlyDurations: new Array(12).fill(0)
  };

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  async componentWillReceiveProps(newProps) {
    this.setState({ user_id: newProps.user_id });

    if (!newProps.user_id) return;
    else {
      try {
        const { data: tasks } = await taskService.getAllTasks(newProps.user_id);
        tasks.reverse();

        const monthlyDurations = this.state.monthlyDurations;
        const weeklyDurations = this.state.weeklyDurations;

        // Weekly Data
        const weeklyGroups = this.groupBy(tasks, task => task.weekInYear);

        let weeklyData = [];
        for (let week of weeklyGroups) {
          // gives the number of the week
          let weekNumber = week[0];
          // should go through the object and get the durations
          let weekData = week[1];
          let sum = 0;
          for (let data of weekData) {
            let days = data.days;
            for (let day of days) {
              sum += day.duration;
            }
          }
          weeklyDurations[weekNumber - 1] = sum;
          weeklyData.push({ weekNumber, sum });
        }
        console.log("weeklyDurations ", weeklyDurations);

        console.log("Weekly Data", weeklyData);

        // Monthly Data
        const monthlyGroups = this.groupBy(tasks, task => task.month);
        let monthlyData = [];
        for (let month of monthlyGroups) {
          let monthNumber = month[0];
          let monthData = month[1];
          let sum = 0;
          for (let data of monthData) {
            let days = data.days;
            for (let day of days) {
              sum += day.duration;
            }
          }
          monthlyDurations[monthNumber - 1] = sum;
          monthlyData.push({ monthNumber, sum });
        }
        console.log("monthlyData ", monthlyData);
        console.log("monthly durations ", monthlyDurations);
        // this.setState({ durations });

          this.drawChart(monthlyDurations);
      } catch (ex) {
        console.log(ex.message);
      }
    }
  }

  shouldComponentUpdate(newProps, newState) {
    return true;
  }

  async componenDidtMount() {
    console.log("hello");
    console.log(this.state);
    this.drawChart(this.state.durations);
  }

  drawChart(data) {
    // if (this.state.durations) {
    //   return;
    // } else {
      const w = this.state.width;
      const h = this.state.height;
      // const data = this.props.data;
      // const data = [0, 0, 0, 20, 15, 0, 0, 0, 0, 0, 0, 0];
      // const data = data;
      console.log("data ", data);
      // console.log("this.props.data ", this.props.data);

      const svg = d3
        .select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("margin-left", 100);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => h - 10 * d)
        .attr("width", 30)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green");
    // }
  }

  render() {
    return <div style={{border: "1px solid red"}} />;
  }
}

export default BarChart;
