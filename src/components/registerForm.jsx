// 3rd party
import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import PropTypes from "prop-types";

// Own
import Form from "./common/form";

// Own Redux
import { connect } from "react-redux";
import { register } from "./../redux/actions/authActions";

class RegisterForm extends Form {
  state = {
    data: { first_name: "", last_name: "", email: "", password: "" },
    errors: {}
  };

  schema = {
    first_name: Joi.string()
      .min(4)
      .max(255)
      .required()
      .label("First name"),
    last_name: Joi.string()
      .min(4)
      .max(255)
      .required()
      .label("Last name"),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
      .label("Password")
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.data);
  };

  render() {
    // Redirect if logged in
    if (this.props.isAuthenticated) return <Redirect to="/" />;

    return (
      <div>
        <h1>Registration Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("first_name", "First name")}
          {this.renderInput("last_name", "Last name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(RegisterForm);
