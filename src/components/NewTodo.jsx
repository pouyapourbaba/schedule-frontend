import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Own
import WeekPicker from "./WeekPicker";

// Redux
import { connect } from "react-redux";
import {
  getTodosForWeek,
  createNewTodo,
  deleteTodo
} from "../redux/actions/todoActions";

const NewTodo = ({
  date,
  todos,
  getTodosForWeek,
  deleteTodo,
  createNewTodo
}) => {
  const [todoTitle, setTodoTitle] = useState("");

  // fetch the todos for the current week
  useEffect(() => {
    if (todos.length === 0) getTodosForWeek(date.week);
  }, []);

  // post new todo
  const handleSubmit = e => {
    e.preventDefault();
    createNewTodo({
      title: todoTitle,
      year: date.year,
      month: date.month,
      weekInYear: date.week,
      isDone: false
    });
    setTodoTitle("");
  };

  const handleChange = e => {
    setTodoTitle(e.target.value);
  };

  return (
    <React.Fragment>
      <WeekPicker />
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" value={todoTitle} />
        <button>Create</button>
      </form>
      <h1>New Todo Component</h1>
      {todos &&
        todos.map(todo => (
          <p key={todo._id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo)}>x</button>
          </p>
        ))}
    </React.Fragment>
  );
};

NewTodo.propTypes = {
  date: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  getTodosForWeek: PropTypes.func.isRequired,
  createNewTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  date: state.date.date,
  todos: state.todos.todos
});

export default connect(
  mapStateToProps,
  { getTodosForWeek, createNewTodo, deleteTodo }
)(NewTodo);
