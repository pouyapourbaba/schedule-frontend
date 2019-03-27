import React, { Component } from "react";
import Axios from "axios";

class Todos extends Component {
  state = {
    todos: []
  };

  async componentDidMount() {
    const { data: todos } = await Axios.get("http://localhost:3000/api/todos");
    this.setState({ todos });
  }

  // handle edit
  handleEdit = (todo) => {
    console.log("edit", todo.title);
    // call the backend ...
  }

  // handle delete
  handleDelete = (todo) => {
    console.log("delete", todo.title);
    // call the backend ...
  }

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
            {this.state.todos.map(todo => (
              <tr key={todo._id}>
                <td>{this.state.todos.indexOf(todo) + 1}</td>
                <td>{todo.title}</td>
                <td>
                  <button
                    onClick={() => this.handleEdit(todo)}
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
        <button className="btn btn-primary btn-sm">New Todo</button>
      </React.Fragment>
    );
  }
}

export default Todos;
