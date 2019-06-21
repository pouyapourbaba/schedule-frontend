import http from "../../services/httpService";
import setAuthToken from "./../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./../types/types";
import { setAlert } from "./alertActions";

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await http.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const register = ({
  first_name,
  last_name,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  const body = JSON.stringify({ first_name, last_name, email, password });

  try {
    const res = await http.post("/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) console.log("errors ", errors);
    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login user
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await http.post("/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) console.log("errors ", errors);

    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({type: LOGOUT})
}
