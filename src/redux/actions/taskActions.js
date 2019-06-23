import http from "../../services/httpService";

import { GET_TASKS_FOR_WEEK } from "../types/types";
import { setAlert } from "./alertActions";

export const getTaksForWeek = week => async dispatch => {
  try {
    const res = await http.get("/task");
    console.log("res ", res);
  } catch (error) {
    dispatch(setAlert("tasks not fetched", "danger"));
  }
};
