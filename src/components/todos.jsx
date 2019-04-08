import React, { Component } from "react";
import moment from "moment";
import WeekTable from "./weekTable";
import TodoForm from "./todoForm";

class Todos extends Component {
  state = {};

  componentWillMount() {
    const currentWeek = parseInt(moment().format("W"));
    const currentYear = parseInt(moment().format("YYYY"));
    this.setState({ currentWeek, year: currentYear });

    const startOfWeek = moment()
      .add(currentWeek, "weeks")
      .startOf("isoWeek");

    const endOfWeek = moment()
      .add(currentWeek, "weeks")
      .startOf("week");

    const weekToBeDisplayed = {
      startOfWeek: startOfWeek.format("YYYY.MM.DD"),
      endOfWeek: endOfWeek.format("YYYY.MM.DD"),
      index: currentWeek
    };

    this.setState({ weekToBeDisplayed });
  }

  handleWeekChange = week => {
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

    this.setState({ weekToBeDisplayed });
    console.log("weekToBeDisplayed ", weekToBeDisplayed);
  };

  render() {
    return (
      <React.Fragment>
        <h1>Todo</h1>
        <WeekTable onWeekChange={this.handleWeekChange} />
        <div className="row" style={{textAlign: "center", margin: "50px 0 30px 0", padding:"20px 0 10px 0", backgroundColor:"#eee"}}>
          <div className="col-5" style={{textAlign: "center"}}>
            <h2>
              Week{" "}
              <span className="badge badge-success">
                #{this.state.weekToBeDisplayed.index}
              </span>{" "}
            </h2>
          </div>
          <div className="col-7" style={{textAlign: "center"}}>
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
        </div>
        <TodoForm
          user_id={this.props.match.params.user_id}
          weekNumber={
            this.state.weekToBeDisplayed
              ? this.state.weekToBeDisplayed.index
              : this.state.currentWeek
          }
        />
      </React.Fragment>
    );
  }
}

export default Todos;
