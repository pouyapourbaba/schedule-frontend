import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Own & Redux
import { connect } from "react-redux";
import { createProfile } from "../../redux/actions/profileActions";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = React.useState({
    phone: "",
    address: "",
    birthday: "",
    country: "",
    city: "",
    postal_code: "",
    nationality: "",
    occupation: "",
    about: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    github: ""
  });

  const [displaySocialInouts, toggleSocialInputs] = React.useState(false);

  const {
    phone,
    address,
    birthday,
    country,
    city,
    postal_code,
    nationality,
    occupation,
    about,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    github
  } = formData;

  const handleChange = e => {
    console.log({ [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your
        profile stand out
      </p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Phone number"
            name="phone"
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Address"
            name="address"
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Birthday"
            name="birthday"
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Country of residence"
            name="country"
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            placeholder="City"
            name="city"
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            placeholder="Postal Code"
            name="postal_code"
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            placeholder="Nationality"
            name="nationality"
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            placeholder="Occupation"
            name="occupation"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Tell us briefley about yourself"
            name="about"
          />
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInouts)}
            type="button"
            className="btn btn-secondary"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInouts && (
          <React.Fragment>
            <div className="form-group social-input">
              <i className="fa fa-twitter fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-facebook fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-youtube fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-linkedin fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-instagram fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </React.Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/profile">
          Go Back
        </Link>
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
