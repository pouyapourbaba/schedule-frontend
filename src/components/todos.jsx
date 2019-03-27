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

  render() {
    return (
      <React.Fragment>
        <h3>There are {this.state.todos.length} todos in the DB.</h3>
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
                  <button className="btn btn-sm btn-secondary">Edit</button>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger">Delete</button>
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
