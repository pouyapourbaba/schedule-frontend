import moment from "moment";
import ContentEditable from "react-contenteditable";
import Joi from "joi-browser";
import React from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import Form from "./common/form";
import { getUser } from "../services/userService";
import taskService from "../services/taskService";

class TimeTrackerTable extends Form {
  state = {
    tasks: [],
    errors: [],
    pageSize: 5,
    currentPage: 1,
    data: { title: "" }
  };

  schema = {
    title: Joi.string()
      .min(2)
      .max(512)
      .required()
      .label("Title"),
    year: Joi.number(),
    month: Joi.number(),
    weekInYear: Joi.number()
  };

  async componentWillReceiveProps(newProps) {
    this.setState({ weekNumber: newProps.weekNumber });
    try {
      const { data: tasks } = await taskService.getTasks(
        newProps.user_id,
        newProps.weekNumber
      );
      tasks.reverse();
      this.setState({ tasks });
    } catch (ex) {
      console.log(ex.message);
    }
  }

  shouldComponentUpdate(newProps, newState) {
    return true;
  }

  async componentWillMount() {
    const weekNumber = this.props.weekNumber;
    this.setState({ weekNumber });
  }

  async componentDidMount() {
    let user_id;
    if (this.props.user_id === undefined) return;
    else user_id = this.props.user_id;

    try {
      let user = await getUser(user_id);
      user = user.data;
      this.setState({ user });
    } catch (ex) {
      console.log(ex.message);
    }

    try {
      const { data: tasks } = await taskService.getTasks(
        user_id,
        this.state.weekNumber
      );
      tasks.reverse();
      this.setState({ tasks });
    } catch (ex) {
      console.log(ex.message);
    }
  }

  // handle page change
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // handle add a new todo
  doSubmit = async () => {
    try {
      const obj = { title: this.state.data.title };
      const user_id = this.state.user._id;
      const weekNumber = this.state.weekNumber;

      obj.year = moment().format("YYYY");
      obj.month = moment().format("M");
      obj.weekInYear = weekNumber;
      obj.days = [
        { day: "monday", duration: 0 },
        { day: "tuesday", duration: 0 },
        { day: "wednesday", duration: 0 },
        { day: "thursday", duration: 0 },
        { day: "friday", duration: 0 },
        { day: "saturday", duration: 0 },
        { day: "sunday", duration: 0 }
      ];

      const { data: task } = await taskService.postTask(obj, user_id);
      const tasks = [task, ...this.state.tasks];
      this.setState({ tasks: tasks });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }

    const data = this.state.data;
    data.title = "";
    this.setState({
      data
    });
  };

  // handle update
  handleUpdate = async task => {
    // Optimistic Update
    const originalTasks = this.state.tasks;

    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...task };

    // trim the possible spaces added to the title in the ContentEditable
    tasks[index].title = this.trimSpaces(tasks[index].title);

    this.setState({ tasks });

    try {
      await taskService.updateTask(task._id, task);
    } catch (ex) {
      alert("Something went wrong while deleting the post.");
      this.setState({ tasks: originalTasks });
    }
  };

  // handle delete
  handleDelete = async task => {
    // Optimistic Delete
    const originalTasks = this.state.tasks;

    const tasks = this.state.tasks.filter(t => t._id !== task._id);
    this.setState({ tasks });

    try {
      await taskService.deleteTask(task._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        alert("This task has already been deleted.");
      }
      this.setState({ tasks: originalTasks });
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

  handleContentEditable = e => {
    const errors = { ...this.state.errors };
    const tasks = this.state.tasks;
    const index = tasks.findIndex(
      task => task._id === e.currentTarget.dataset.task
    );

    if (!e.currentTarget.dataset.day) {
      console.log("e.currentTarget.dataset.column ", e);
      tasks[index].title = e.target.value;
      const obj = { title: e.target.value };
      const { error } = Joi.validate(obj, this.schema);
      const errorMessage = error ? error.details[0].message : null;

      if (errorMessage) {
        errors["title"] = errorMessage;
        errors["id"] = tasks[index]._id;
      } else delete errors["title"];

      this.setState({ tasks, errors });
    } else {
      const dayIndex = tasks[index].days.findIndex(
        day => day._id === e.currentTarget.dataset.day
      );
      console.log("e.target.value ", e.target.value);
      if (e.target.value == "") {
        tasks[index].days[dayIndex].duration = 0;
      } else {
        tasks[index].days[dayIndex].duration = parseInt(e.target.value);
      }
      // validation
      // ....
      this.setState({ tasks, errors });
    }
  };

  // disable new lines in the ContentEditable
  disableNewlines = event => {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  // trim the spaces in the ContentEditable
  trimSpaces = string => {
    return string
      .replace(/&nbsp;/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<");
  };

  render() {
    const { length: count } = this.state.tasks;
    const { pageSize, currentPage, tasks: allTasks } = this.state;

    const tasks = paginate(allTasks, currentPage, pageSize);

    return (
      <React.Fragment>
        <h1>TIME TRACKER</h1>
        <React.Fragment>
          <table className="table">
            <thead>
              <tr>
                <th>#####</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
                <th>Total</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id}>
                  <td>
                    <ContentEditable
                      html={String(task.title)}
                      data-task={task._id}
                      className="content-editable"
                      onChange={this.handleContentEditable}
                      onKeyPress={this.disableNewlines}
                    />
                  </td>
                  {task.days.map(day => (
                    <td key={day._id}>
                      {" "}
                      <ContentEditable
                        html={String(day.duration)}
                        data-task={task._id}
                        data-day={day._id}
                        className="content-editable"
                        onChange={this.handleContentEditable}
                        onKeyPress={this.disableNewlines}
                      />
                    </td>
                  ))}
                  <td>
                    {task.days
                      .map(d => d.duration)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue
                      )}
                    {this.state.errors.title &&
                      this.state.errors.id === task._id && (
                        <div className="alert alert-danger">
                          {this.state.errors.title}
                        </div>
                      )}
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleUpdate(task)}
                      className="btn btn-sm btn-secondary"
                      disabled={
                        this.state.errors.title &&
                        this.state.errors.id === task._id
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(task)}
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
        </React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "New task", false)}
          {this.renderButton("Submit")}
        </form>
      </React.Fragment>
    );
  }
}

export default TimeTrackerTable;