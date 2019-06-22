import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import PropTypes from "prop-types";

// Own
import Form from "./common/form";
import styles from "../styles/LoginForm.module.css"

// Own Redux
import auth from "../services/authService";
import { connect } from "react-redux";
import { login } from "./../redux/actions/authActions";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    this.props.login(this.state.data);
  };

  render() {
    // Redirect if logged in
    if (this.props.isAuthenticated) return <Redirect to="/" />;

    return (
      <div className={styles["login-form"]}>
        <h1>Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(LoginForm);
