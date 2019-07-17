import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Paper, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Own & Redux
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile
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

const EditProfileMUI = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const classes = useStyles();
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
    <Paper style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Edit Your Profile
      </Typography>
      <form
        onSubmit={handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone"
              name="phone"
              label="Phone Number"
              fullWidth
              autoComplete="phone"
              onChange={e => handleChange(e)}
              placeholder="Phone number"
              value={phone}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e => handleChange(e)}
              value={birthday}
              id="birthday"
              name="birthday"
              label="Birtchday"
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={e => handleChange(e)}
              value={address}
              id="address"
              name="address"
              label="Address"
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e => handleChange(e)}
              value={country}
              id="country"
              name="country"
              label="Cuntry"
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e => handleChange(e)}
              value={city}
              id="city"
              name="city"
              label="City"
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e => handleChange(e)}
              value={postal_code}
              id="postal_code"
              name="postal_code"
              label="Zip / Postal code"
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e => handleChange(e)}
              value={nationality}
              id="nationality"
              name="nationality"
              label="Nationality"
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={e => handleChange(e)}
              value={about}
              id="about"
              name="about"
              label="About"
              placeholder="Tell us briefley about yourself"
              fullWidth
              multiline
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>

          <Divider />

          <Grid item xs={12}>
            <Button
              onClick={() => toggleSocialInputs(!displaySocialInouts)}
              variant="contained"
              className={classes.button}
            >
              Add Social Network Links
            </Button>
          </Grid>

          {displaySocialInouts && (
            <React.Fragment>
              <Grid item xs={12} sm={12}>
                <TextField
                  onChange={e => handleChange(e)}
                  value={twitter}
                  id="twitter"
                  name="twitter"
                  label="Twitter"
                  placeholder="Twitter URL"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  onChange={e => handleChange(e)}
                  value={facebook}
                  id="facebook"
                  name="facebook"
                  label="Facebook"
                  placeholder="Facebook URL"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  onChange={e => handleChange(e)}
                  value={youtube}
                  id="youtube"
                  name="youtube"
                  label="Youtube"
                  placeholder="Youtube URL"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  onChange={e => handleChange(e)}
                  value={linkedin}
                  id="linkedin"
                  name="linkedin"
                  label="Linkedin"
                  placeholder="Linkedin URL"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                />
              </Grid>
            </React.Fragment>
          )}
        </Grid>

        <Grid item xs={12} style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </Grid>
      </form>

      <Button
        className={classes.button}
        variant="contained"
        component={Link}
        to="/dashboard/profile"
      >
        Go Back
      </Button>
    </Paper>
  );
};

EditProfileMUI.propTypes = {
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
)(withRouter(EditProfileMUI));
