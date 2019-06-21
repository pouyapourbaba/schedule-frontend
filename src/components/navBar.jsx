import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// Own Redux
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  console.log(isAuthenticated)
  const guestLinks = (
    <ul className="navbar-nav mr-3">
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink onClick={logout} className="nav-item nav-link" to="/">
          Register
        </NavLink>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav mr-3">
      <li className="nav-item">
        <NavLink className="nav-link text-nowrap" to="/logout">
          <i className="fa fa-sign-out-alt" /> Logout
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow justify-content-between">
      <NavLink className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
        Schedu
      </NavLink>
      {!loading && (
        <React.Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </React.Fragment>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
