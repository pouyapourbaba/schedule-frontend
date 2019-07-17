import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// Own Redux
import { connect } from "react-redux";

const ProtectedRoute = ({
  component: Component,
  render,
  auth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.isAuthenticated) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ProtectedRoute);
