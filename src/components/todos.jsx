import React, { Component } from "react";
import TodoForm from "./todoForm";
import NewTodo from "./NewTodo";
import WeekPicker from "./WeekPicker";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { getTodosForWeek } from "../redux/actions/todoActions";

class Todos extends Component {
  componentDidMount() {
    if (this.props.todos.todos.length === 0) {
      this.props.getTodosForWeek(this.props.date);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="border-bottom">
          <h1>Objectives</h1>
        </div>
        <WeekPicker />
        <NewTodo />
        {/* <TodoForm
          // user_id={this.props.match.params.user_id}
          weekNumber={
            this.props.date ? this.props.date.week : this.state.currentWeek
          }
        /> */}
      </React.Fragment>
    );
  }
}

Todos.propTypes = {
  auth: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired,
  getTodosForWeek: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  date: state.date,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { getTodosForWeek }
)(Todos);
