import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

class WeekTable extends Component {
  state = {
    weeksOfYear: []
  };

  componentDidMount() {
    const currentWeek = parseInt(moment().format("W"));
    const currentYear = parseInt(moment().format("YYYY"));
    const numberOfWeeks = moment().isoWeeksInYear();
    this.setState({ currentWeek, year: currentYear, numberOfWeeks });

    const rangeOfWeeks = _.range(numberOfWeeks);
    const range = rangeOfWeeks.map(week => {
      return {
        startOfWeek: moment(`${this.state.year}-01-01`, "YYYY-MM-DD")
          .add(week, "weeks")
          .startOf("isoweek")
          .toString(),
        index: week + 1
      };
    });
    this.setState({ weeksOfYear: range });
  }

  handleClick = week => {
    const startOfWeek = moment(this.state.year, "YYYY")
      .add(week.index - 1, "weeks")
      .startOf("isoWeek");

    const endOfWeek = moment(this.state.year, "YYYY")
      .add(week.index, "weeks")
      .startOf("week");

    const weekToBeDisplayed = {
      startOfWeek: startOfWeek.format("YYYY.MM.DD"),
      endOfWeek: endOfWeek.format("YYYY.MM.DD"),
      index: week.index
    };

    this.setState({ weekToBeDisplayed,  });
  };

  buttonClass = week => {
    let classes = "btn btn-sm btn-";
    classes +=
      // this.state.currentWeek == (month.index - 1) * 4 + week
      this.state.currentWeek === week.index ? "primary" : "secondary";
    // this.state.weekToBeDisplayed.index === week.index ? "primary" : "secondary";

    return classes;
  };

  buttonClassAfterSelection = week => {
    let classes = "btn-";
    if (this.state.weekToBeDisplayed) {
      console.log(week.index)
      classes +=
        this.state.weekToBeDisplayed.index === week.index
          ? "success"
          : "secondary";
    }
    

    return classes;
  };

  render() {
    return (
      <table
        className="table"
        id="scheduler-table"
        style={{ backgroundColor: "#eee", padding: "15px" }}
      >
        <thead>
          <tr>
            <th>Months</th>
            <th>Weeks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jan - Mar</td>
            <td>
              {this.state.weeksOfYear
                .filter(week => {
                  return week.index >= 0 && week.index <= 13;
                })
                .map(week => {
                  return (
                    <button
                      style={{ margin: "0 2px" }}
                      key={week.index}
                      className={`${this.buttonClass(
                        week
                      )} ${this.buttonClassAfterSelection(week)}`}
                      onClick={() => this.props.onWeekChange(week)}
                    >
                      {week.index < 10 ? `0${week.index}` : week.index}
                    </button>
                  );
                })}
            </td>
          </tr>
          <tr>
            <td>Apr - Jun</td>
            <td>
              {this.state.weeksOfYear
                .filter(week => {
                  return week.index >= 14 && week.index <= 26;
                })
                .map(week => {
                  return (
                    <button
                      style={{ margin: "0 2px" }}
                      key={week.index}
                      className={this.buttonClass(week)}
                      onClick={() => this.props.onWeekChange(week)}
                    >
                      {week.index}
                    </button>
                  );
                })}
            </td>
          </tr>
          <tr>
            <td>Jul - Sep</td>
            <td>
              {this.state.weeksOfYear
                .filter(week => {
                  return week.index >= 27 && week.index <= 39;
                })
                .map(week => {
                  return (
                    <button
                      style={{ margin: "0 2px" }}
                      key={week.index}
                      className={this.buttonClass(week)}
                      onClick={() => this.props.onWeekChange(week)}
                    >
                      {week.index}
                    </button>
                  );
                })}
            </td>
          </tr>
          <tr>
            <td>Oct - Dec</td>
            <td>
              {this.state.weeksOfYear
                .filter(week => {
                  return week.index >= 40 && week.index <= 52;
                })
                .map(week => {
                  return (
                    <button
                      style={{ margin: "0 2px" }}
                      key={week.index}
                      className={this.buttonClass(week)}
                      onClick={() => this.props.onWeekChange(week)}
                    >
                      {week.index}
                    </button>
                  );
                })}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default WeekTable;