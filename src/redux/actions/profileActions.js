import http from "../../services/httpService";

import { setAlert } from "./alertActions";
import { GET_PROFILE, PROFILE_ERROR } from "../types/types";

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
