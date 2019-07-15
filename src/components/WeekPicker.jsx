import React from "react";
import Helmet from "react-helmet";
import moment from "moment";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

// Redux
import { connect } from "react-redux";
import { setWeekAndDays } from "./../redux/actions/dateActions";
import { getTasksForWeek } from "../redux/actions/taskActions";

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, "days")
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf("isoWeek")
      .toDate(),
    to: moment(date)
      .endOf("isoWeek ")
      .toDate()
  };
}

class Calender extends React.Component {
  state = {
    hoverRange: undefined,
    selectedDays: []
  };

  componentDidMount() {
    // set the current week upon loading the page and clicking on the
    // current week button and colorize it on the calender
    // this.state.selectedDays.length === 0 && this.setCurrentWeek();
  }

  setCurrentWeek = () => {
    const now = moment().format();
    const selectedDays = getWeekDays(getWeekRange(now).from);
    this.setState({ selectedDays });
    // this.props.getTasksForWeek(parseInt(moment().format("W")));
  };

  handleDayChange = date => {
    this.props.setWeekAndDays({
      year: parseInt(moment(date).format("Y")),
      month: parseInt(moment(date).format("M")),
      week: parseInt(moment(date).format("W")),
      days: getWeekDays(getWeekRange(date).from)
    });

    // this.props.getTasksForWeek(parseInt(moment(date).format("W")));

    const selectedDays = getWeekDays(getWeekRange(date).from);

    this.setState({
      selectedDays
    });
  };

  handleDayEnter = date => {
    this.setState({
      hoverRange: getWeekRange(date)
    });
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined
    });
  };

  handleWeekClick = (weekNumber, days, e) => {
    this.setState({
      selectedDays: days
    });
  };

  render() {
    const { hoverRange, selectedDays } = this.state;

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6]
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6]
    };

    return (
      <div className="SelectedWeekExample">
        <DayPicker
          selectedDays={selectedDays}
          showWeekNumbers
          showOutsideDays
          modifiers={modifiers}
          onDayClick={this.handleDayChange}
          firstDayOfWeek={1}
          todayButton="Current Week"
          onTodayButtonClick={this.setCurrentWeek}
          onWeekClick={this.handleWeekClick}
        />
        {selectedDays.length === 7 && (
          <div>
            {moment(selectedDays[0]).format("LL")} –{" "}
            {moment(selectedDays[6]).format("LL")}
          </div>
        )}

        <Helmet>
          <style>{`
            .SelectedWeekExample .DayPicker-Month {
              border-collapse: separate;
            }
            .SelectedWeekExample .DayPicker-WeekNumber {
              outline: none;
            }
            .SelectedWeekExample .DayPicker-Day {
              outline: none;
              border: 1px solid transparent;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange {
              background-color: #EFEFEF !important;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange {
              background-color: #fff7ba !important;
              border-top-color: #FFEB3B;
              border-bottom-color: #FFEB3B;
              border-left-color: #fff7ba;
              border-right-color: #fff7ba;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeStart {
              background-color: #FFEB3B !important;
              border-left: 1px solid #FFEB3B;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeEnd {
              background-color: #FFEB3B !important;
              border-right: 1px solid #FFEB3B;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
            .SelectedWeekExample .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
              border-radius: 0 !important;
              color: black !important;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange:hover {
              border-radius: 0 !important;
            }import { getTaksForWeek } from './../redux/actions/taskActions';


          `}</style>
        </Helmet>
      </div>
    );
  }
}

Calender.propTypes = {
  date: PropTypes.object.isRequired,
  setWeekAndDays: PropTypes.func.isRequired,
  todos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  date: state.date,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { setWeekAndDays, getTasksForWeek }
)(Calender);
