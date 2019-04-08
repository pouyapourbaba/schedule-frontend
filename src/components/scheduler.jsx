import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";
import Todos from "./todos";

class Scheduler extends Component {
  state = {
    months: [
      { name: "Jan", index: 1 },
      { name: "Feb", index: 2 },
      { name: "Mar", index: 3 },
      { name: "apr", index: 4 },
      { name: "May", index: 5 },
      { name: "Jun", index: 6 },
      { name: "Jul", index: 7 },
      { name: "Aug", index: 8 },
      { name: "Sep", index: 9 },
      { name: "Oct", index: 10 },
      { name: "Nov", index: 11 },
      { name: "Dec", index: 12 }
    ],
    weeksOfYear: [],
    seasons: [1, 2, 3, 4],
    year: "2019"
  };

  componentDidMount() {
    const currentWeek = moment().format("W");
    const numberOfWeeks = moment().isoWeeksInYear();
    this.setState({ currentWeek, year: "2019", numberOfWeeks });

    const months = [...this.state.months];

    // calculate the number of days for each months
    this.state.months.map(month => {
      // create the date for the begining of each month
      const m = moment(`${this.state.year}-${month.index}-01`, "YYYY-MM-DD");

      // format the date of the start and end of each month
      const startOfMonth = moment(m)
        .startOf("month")
        .format("DD");
      const endOfMonth = moment(m)
        .endOf("month")
        .format("DD");

      // find the number of days for each month
      const days = endOfMonth - startOfMonth + 1;

      return (month.days = days);
    });
    this.setState({ months });

    const rangeOfWeeks = _.range(numberOfWeeks);
    const range = rangeOfWeeks.map(week => {
      // return week +1;
      // const startOfWeek = moment(this.state.year)
      //   .add(week + 1, "weeks")
      //   .startOf("isoweek");
      // week.sdtart = startOfWeek.format("MM");
      // week.index = week;
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

  keys = _.range(54);

  time() {
    const firstDay = moment().startOf("month");
    const endDay = moment().endOf("month");
    const now = moment();
    const week = now.week();
    // console.log("week ", week);
    // console.log(now);

    const date = moment("2019-04-01T09:38:01.655Z");
    // console.log("date ", date.format("W"));
  }

  handleClick = week => {
    // console.log("week", (month.index - 1) * 4 + week);
    // console.log("month", month.name);
    // console.log("year", this.state.year);
    const startOfWeek = moment(this.state.year, "YYYY")
      .add(week.index - 1, "weeks")
      .startOf("isoWeek");
    console.log("startOfWeek:", startOfWeek.format("YYYY.MM.DD"));

    const endOfWeek = moment(this.state.year, "YYYY")
      .add(week.index, "weeks")
      .startOf("week");
    console.log("endOfWeek: ", endOfWeek.format("YYYY.MM.DD"));
    const weekToBeDisplayed = {
      startOfWeek: startOfWeek.format("YYYY.MM.DD"),
      endOfWeek: endOfWeek.format("YYYY.MM.DD"),
      index: week.index
    };

    this.setState({ weekToBeDisplayed });
  };

  setNewWeekNumber = weekNumber => {
    this.updateUser({ weekNumber }).then(res => {
      this.refreshShoeList();
    });
  };

  refreshShoeList = () =>
    this.setState({ refreshShoeList: !this.state.refreshShoeList });

  buttonClass = week => {
    let classes = "btn btn-";
    classes +=
      // this.state.currentWeek == (month.index - 1) * 4 + week
      this.state.currentWeek == week.index ? "primary" : "secondary";

    return classes;
  };

  render() {
    this.time();
    return (
      <React.Fragment>
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
                {this.state.weeksOfYear.map(week => {
                  if (week.index >= 0 && week.index <= 13)
                    return (
                      <button
                        key={week.index}
                        className={this.buttonClass(week)}
                        onClick={() => this.handleClick(week)}
                      >
                        {week.index}
                      </button>
                    );
                })}
              </td>
            </tr>
            <tr>
              <td>Apr - Jun</td>
              <td>
                {this.state.weeksOfYear.map(week => {
                  if (week.index >= 14 && week.index <= 26)
                    return (
                      <button
                        key={week.index}
                        className={this.buttonClass(week)}
                        onClick={() => this.handleClick(week)}
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
                {this.state.weeksOfYear.map(week => {
                  if (week.index >= 27 && week.index <= 39)
                    return (
                      <button
                        key={week.index}
                        className={this.buttonClass(week)}
                        onClick={() => this.handleClick(week)}
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
                {this.state.weeksOfYear.map(week => {
                  if (week.index >= 40 && week.index <= 52)
                    return (
                      <button
                        key={week.index}
                        className={this.buttonClass(week)}
                        onClick={() => this.handleClick(week)}
                      >
                        {week.index}
                      </button>
                    );
                })}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          {this.state.weekToBeDisplayed && (
            <React.Fragment>
              <div>
                <h2>
                  Week{" "}
                  <span className="badge badge-success">
                    #{this.state.weekToBeDisplayed.index}
                  </span>{" "}
                </h2>
                <h4>
                  From{" "}
                  <span className="badge badge-primary">
                    {this.state.weekToBeDisplayed.startOfWeek}
                  </span>{" "}
                  to{" "}
                  <span className="badge badge-primary">
                    {this.state.weekToBeDisplayed.endOfWeek}
                  </span>
                </h4>
              </div>
              <Todos
                user_id={this.props.match.params.user_id}
                weekNumber={this.state.weekToBeDisplayed.index}
              />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Scheduler;
