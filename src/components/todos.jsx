import Joi from "joi-browser";
import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import http from "../services/httpService";
import config from "../config.json";
import Input from "./common/input";

class Todos extends Component {
  state = {
    todos: [],
    pageSize: 5,
    currentPage: 1,
    data: { title: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .min(2)
      .max(512)
      .required()
      .label("Title")
  };

  async componentDidMount() {
    const { data: todos } = await http.get(config.apiEndpoint);
    this.setState({ todos });
  }

  // handle page change
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // handle the change of the input field and bind it to the state
  handleChange = ({ currentTarget: input }) => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];

    let data = { ...this.state.data };
    data.title = input.value;
    this.setState({ data });
  };

  // prevent the full page reload when submitting this form
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  // validate the whole form
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  // validate each field when its value changes
  // validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const schema = { [name]: this.schema[name] };
  //   const { error } = Joi.validate(obj, schema);

  //   return error ? error.details[0].message : null;
  // };

  // handle add a new todo
  doSubmit = async () => {
    const obj = this.state.data;
    console.log("obj ", obj);

    const { data: todo } = await http.post(config.apiEndpoint, obj);
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
      await http.put(config.apiEndpoint + "/" + todo._id, todo);
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
      await http.delete(config.apiEndpoint + "/" + todo._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        alert("This todo has already been deleted.");
      }
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
        <form onSubmit={this.handleSubmit}>
          <Input
            name="data"
            value={this.state.data.title}
            label="New todo"
            onChange={this.handleChange}
            error={this.state.erros}
          />
          <button className="btn btn-primary btn-sm">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Todos;
