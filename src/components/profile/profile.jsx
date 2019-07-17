import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Col, Form, FormGroup, Label, Button, Input } from "reactstrap";
import PropTypes from "prop-types";

// Own
import Spinner from "../layout/Spinner";

// Own Redux
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../redux/actions/profileActions";

class Profile extends Component {
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

    this.props.updateUser(this.props.user._id, user);
  };

  render() {
    // destructure auth
    const {
      isAuthenticated,
      user: { first_name, last_name, email, added_date }
    } = this.props.auth;

    // destructure profile
    const { profile, loading } = this.props.profile;

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
            <Label for="added_date" sm={2} size="lg">
              Joined Date
            </Label>
            <Col sm={10}>
              <Input
                type="added_date"
                name="added_date"
                id="added_date"
                placeholder={formattedDate}
                bsSize="lg"
                disabled={true}
              />
            </Col>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        {profile !== null ? (
          <React.Fragment>
            <Link to={`/dashboard/edit-profile`} className="btn btn-primary">
              Edit Profile
            </Link>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => this.props.deleteAccount()}
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
)(Profile);
