import React, { Component } from "react";
import * as d3 from "d3";
import taskService from "../services/taskService";

class BarChart extends Component {
  state = {
    width: 700,
    height: 1500,
    durations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
        console.log("tasks ", tasks);

        const weeklyGroups = this.groupBy(tasks, task => task.weekInYear);
        console.log("weeklyGroups ", weeklyGroups);

        for (let week of weeklyGroups) {
          // gives the number of the week
          let weekNumber = week[0];
          console.log("week number ", weekNumber);
          // should go through the object and get the durations
          let weekData = week[1];
          let sum = 0;
          for (let data of weekData) {
            let days = data.days;
            for (let day of days) {
              sum += day.duration;
            }
          }
          console.log("week sum", sum);
        }
        // this.setState({ tasks });
        // const data = [
        //   { month: "january", month_id: 1, totalDurationForThatMonth: 0 },
        //   { month: "february", month_id: 2, totalDurationForThatMonth: 0 },
        //   { month: "march", month_id: 3, totalDurationForThatMonth: 0 },
        //   { month: "april", month_id: 4, totalDurationForThatMonth: 0 },
        //   { month: "may", month_id: 5, totalDurationForThatMonth: 0 },
        //   { month: "june", month_id: 6, totalDurationForThatMonth: 0 },
        //   { month: "july", month_id: 7, totalDurationForThatMonth: 0 },
        //   { month: "august", month_id: 8, totalDurationForThatMonth: 0 },
        //   { month: "september", month_id: 9, totalDurationForThatMonth: 0 },
        //   { month: "october", month_id: 10, totalDurationForThatMonth: 0 },
        //   { month: "november", month_id: 11, totalDurationForThatMonth: 0 },
        //   { month: "december", month_id: 12, totalDurationForThatMonth: 0 }
        // ];

        // let totalDurationForThatMonth = 0;
        // for (let item of data) {
        //   item.tasksInMonth = tasks.filter(
        //     task => task.month === item.month_id
        //   );
        //   item.days = item.tasksInMonth.map(task => task.days);
        //   for (let i of item.days) {
        //     const taskDuration = i.map(dd => parseInt(dd.duration));
        //     totalDurationForThatMonth += taskDuration.reduce(
        //       (accumulator, currentValue) => accumulator + currentValue
        //     );
        //     item.totalDurationForThatMonth = totalDurationForThatMonth;
        //   }
        // }

        // console.log(data);

        // const durations = data.map(data =>
        //   parseInt(data.totalDurationForThatMonth)
        // );
        // this.setState({ durations });

        //   this.drawChart(this.state.durations);
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
    if (!this.state.durations) {
      return;
    } else {
      const w = this.state.width;
      const h = this.state.height;
      // const data = this.props.data;
      // const data = [0, 0, 0, 20, 15, 0, 0, 0, 0, 0, 0, 0];
      const data = this.state.durations;
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
        .attr("width", 65)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green");
    }
  }

  render() {
    return <div />;
  }
}

export default BarChart;
