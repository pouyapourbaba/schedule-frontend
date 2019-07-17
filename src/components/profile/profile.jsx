import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import { Paper, Button, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Own
import Spinner from "../layout/Spinner";
// Own Redux
import { connect } from "react-redux";
import { updateUser } from "./../../services/userService";
import {
  getCurrentProfile,
  deleteAccount
} from "../../redux/actions/profileActions";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: "10px",
    marginRight: "10px"
  },
  dense: {
    marginTop: "20px"
  },
  menu: {
    width: 200
  }
};

class Profile extends Component {
  classes = this.props.classes;
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleSubmit = e => {
    e.preventDefault();
    const first_name = e.target.elements.first_name.value;
    const last_name = e.target.elements.last_name.vlaue;
    const email = e.target.elements.email.value;

    const user = {};
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;

    if (_.isEmpty(user)) return;

    updateUser(this.props.auth.user._id, user);
  };

  render() {
    // destructure auth
    const {
      isAuthenticated,
      user: { first_name, last_name, email, date }
    } = this.props.auth;

    // destructure profile
    const { profile, loading } = this.props.profile;

    if (!isAuthenticated) return null;

    // Show a spinner till the profile data is fetched
    if (loading && profile === null) return <Spinner />;

    // format the date
    const rawDate = new Date(date);
    const formattedDate = rawDate.toDateString();

    return (
      <React.Fragment>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1>Profile</h1>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="first_name" sm={2} size="lg">
              First Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder={first_name}
                bsSize="lg"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="last_name" sm={2} size="lg">
              Last Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder={last_name}
                bsSize="lg"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2} size="lg">
              Email
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder={email}
                bsSize="lg"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="date" sm={2} size="lg">
              Joined Date
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="date"
                id="date"
                placeholder={formattedDate}
                bsSize="lg"
                disabled={true}
              />
            </Col>
          </FormGroup>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
          >
            Update
          </Button>
        </Form>
        {profile !== null ? (
          <React.Fragment>
            <Button
              component={Link}
              to={`/dashboard/edit-profile`}
              style={{ marginBottom: "10px" }}
              variant="contained"
            >
              Detailed Profile
            </Button>

            <div>
              <Button
                onClick={() => this.props.deleteAccount()}
                style={{ marginBottom: "10px" }}
                variant="contained"
                color="secondary"
              >
                Delete My Account
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p>You have not yet setup a profile, you can add your info via</p>
            <Button component={Link} to={`/dashboard/create-profile`} color="primary">
              Create Detailed Profile
            </Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

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
)(withStyles(styles)(Profile));
