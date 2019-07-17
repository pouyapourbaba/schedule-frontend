import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Divider,
  TextField,
  Typography,
  Grid
} from "@material-ui/core";

// Own
import Spinner from "../layout/Spinner";

// Own Redux
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../redux/actions/profileActions";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

const Profile = props => {
  const classes = useStyles();

  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const first_name = e.target.elements.first_name.value;
    const last_name = e.target.elements.last_name.vlaue;
    const email = e.target.elements.email.value;

    const user = {};
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;

    if (_.isEmpty(user)) return;

    this.props.updateUser(this.props.user._id, user);
  };

  // destructure auth
  const {
    isAuthenticated,
    user: { first_name, last_name, email, added_date }
  } = this.props.auth;

  // destructure profile
  const { profile, loading } = props.profile;

  if (!isAuthenticated) return null;

  // Show a spinner till the profile data is fetched
  if (loading && profile === null) return <Spinner />;

  // format the date
  const rawDate = new Date(added_date);
  const formattedDate = rawDate.toDateString();

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>Profile</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="fname"
              name="fnam"
              label="First Name"
              fullWidth
              placeholder={first_name}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </form>

      {profile !== null ? (
        <React.Fragment>
          <Link to={`/dashboard/edit-profile`} className="btn btn-primary">
            Edit Profile
          </Link>
          <div>
            <button
              className="btn btn-danger"
              onClick={() => props.deleteAccount()}
            >
              <i className="fa fa-user-minus">Delete My Account</i>
            </button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>You have not yet setup a profile, you can add your info via</p>
          <Link to={`/dashboard/create-profile`} className="btn btn-primary">
            Create Profile
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Profile);
