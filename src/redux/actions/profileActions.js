import http from "../../services/httpService";

import { setAlert } from "./alertActions";
import { GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE, ACCOUNT_DELETED } from "../types/types";

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await http.get("/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      paylaod: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  console.log(formData)
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await http.post("/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    // if (!edit) {
    //   history.push("/profile");
    // }
  } catch (error) {
    const errors = error.response.data.errors;

    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PROFILE_ERROR,
      paylaod: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  console.log("delete action")
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await http.delete('/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly deleted', "info"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

