import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

class Scheduler extends Component {
  state = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    weeks: [1, 2, 3, 4]
  };

  componentDidMount() {
      const currentWeek = moment().format("W");
      this.setState({currentWeek})
  }

  keys = _.range(54);

  time() {
    const now = moment();
    const week = now.week();
    // console.log("week ", week);
    // console.log(now);

    const date = moment("2019-04-01T09:38:01.655Z");
    console.log("date ", date.format("W"));
  }

  weekClass() {
      
  }

  render() {
    this.time();
    return (
      <table className="table" id="scheduler-table">
        <thead>
          <tr>
            <th>Weeks</th>
            {this.state.months.map(month => (
              <th key={this.state.months.indexOf(month)}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.weeks.map(week => (
            <tr key={this.state.weeks.indexOf(week)} id="week">
              <td>{`Week ${week}`}</td>
              {this.state.months.map(month => (
                <td key={this.state.months.indexOf(month)}>
                  <div className="week-in-table" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Scheduler;
