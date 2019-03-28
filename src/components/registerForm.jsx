import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
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

  doSubmit = () => {
    // call the server
    console.log("Registered");
  };

  render() {
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

export default LoginForm;
