import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Own & Redux
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile
} from "../../redux/actions/profileActions";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
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

  React.useEffect(() => {
    getCurrentProfile();

    setFormData({
      phone: loading || !profile.phone ? "" : profile.phone,
      address: loading || !profile.address ? "" : profile.address,
      birthday: loading || !profile.birthday ? "" : profile.birthday,
      country: loading || !profile.country ? "" : profile.country,
      city: loading || !profile.city ? "" : profile.city,
      postal_code: loading || !profile.postal_code ? "" : profile.postal_code,
      nationality: loading || !profile.nationality ? "" : profile.nationality,
      occupation: loading || !profile.occupation ? "" : profile.occupation,
      about: loading || !profile.about ? "" : profile.about,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      github: loading || !profile.social ? "" : profile.social.github,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
  }, [loading]);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
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
            value={phone}
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Address"
            name="address"
            value={address}
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Birthday"
            name="birthday"
            value={birthday}
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Country of residence"
            name="country"
            value={country}
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            placeholder="City"
            name="city"
            value={city}
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            placeholder="Postal Code"
            name="postal_code"
            value={postal_code}
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            placeholder="Nationality"
            name="nationality"
            value={nationality}
          />
        </div>
        <div className="form-group">
          <input
            onChange={e => handleChange(e)}
            placeholder="Occupation"
            name="occupation"
            value={occupation}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={e => handleChange(e)}
            placeholder="Tell us briefley about yourself"
            name="about"
            value={about}
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
                value={twitter}
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-facebook fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-youtube fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-linkedin fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-instagram fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
              />
            </div>
            <div className="form-group social-input">
              <i className="fa fa-github fa-2x" />
              <input
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Github URL"
                name="github"
                value={github}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToPropf = state => ({
  profile: state.profile
});

export default connect(
  mapStateToPropf,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
