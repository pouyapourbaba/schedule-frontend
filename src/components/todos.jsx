import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import axios from "axios";

const apiEndpoint = "http://localhost:3000/api/todos";

class Todos extends Component {
  state = {
    todos: [],
    pageSize: 3,
    currentPage: 1
  };

  async componentDidMount() {
    const { data: todos } = await axios.get(apiEndpoint);
    this.setState({ todos });
  }

  // handle page change
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // handle add a new todo
  handleAdd = async () => {
    // add a static new todo
    // after creating the new todo form it should be dynamic
    const obj = { title: "added from the front end" };
    const { data: todo } = await axios.post(apiEndpoint, obj);
    const todos = [todo, ...this.state.todos];
    this.setState({ todos });
  };

  // handle edit
  handleUpdate = async todo => {
    // update a static new todo
    // after creating the new todo form it should be dynamic

    // Optimistic Update
    const originalTodos = this.state.todos;
    
    todo.title = "Updated from the frontend 2 2";
    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    todos[index] = { ...todo };
    this.setState({ todos });

    try {
      await axios.put(apiEndpoint + "/" + todo._id, todo);
    } catch (ex) {
      alert("Something went wrong while deleting the post.");
      this.setState({ todos: originalTodos });
    }
  };

  // handle delete
  handleDelete = async todo => {
    // Optimistic Delete
    const originalTodos = this.state.todos;

    const todos = this.state.todos.filter(t => t._id !== todo._id);
    this.setState({ todos });

    try {
      await axios.delete(apiEndpoint + "/" + todo._id);
    } catch (ex) {
      alert("Something went wrong while deleting the post.");
      this.setState({ todos: originalTodos });
    }
  };

  // get the class of the span based on the number of todos
  getSpannClasses = () => {
    let classes = "badge badge-";
    classes += this.state.todos.length === 0 ? "danger" : "primary";
    return classes;
  };

  // conditionally render the number of elements in the todo list
  renderNumberOfTodoElemensts = () => {
    const { todos } = this.state;
    if (todos.length === 0)
      return <h5>There are no elements in the todo list.</h5>;
    if (todos.length === 1) {
      return (
        <h5>
          There is <span className={this.getSpannClasses()}>1</span> element in
          the todo list.
        </h5>
      );
    } else {
      return (
        <h5>
          There are{" "}
          <span className={this.getSpannClasses()}>{todos.length}</span>{" "}
          elements in the todo list.
        </h5>
      );
    }
  };

  render() {
    const { length: count } = this.state.todos;
    const { pageSize, currentPage, todos: allTodos } = this.state;

    const todos = paginate(allTodos, currentPage, pageSize);

    return (
      <React.Fragment>
        {this.renderNumberOfTodoElemensts()}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo._id}>
                <td>{this.state.todos.indexOf(todo) + 1}</td>
                <td>{todo.title}</td>
                <td>
                  <button
                    onClick={() => this.handleUpdate(todo)}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(todo)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
        <button
          onClick={() => this.handleAdd()}
          className="btn btn-primary btn-sm"
        >
          New Todo
        </button>
      </React.Fragment>
    );
  }
}

export default Todos;
