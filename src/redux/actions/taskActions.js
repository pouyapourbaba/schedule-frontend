import http from "../../services/httpService";
import { INIT_TASKS, POST_NEW_TASK, GET_TASKS_FOR_WEEK } from "../types/types";
import { setAlert } from "./alertActions";

export const initializeTasks = () => async dispatch => {
  try {
    const response = await http.get("/tasks");
    dispatch({
      type: INIT_TASKS,
      payload: response.data
    });
  } catch (error) {
    dispatch(setAlert("Tasks not fetched", "danger"));
  }
};

export const postTask = task => async dispatch => {
  try {
    const response = await http.post("/tasks", task);
    dispatch({
      type: POST_NEW_TASK,
      payload: response.data
    });
  } catch (error) {
    dispatch(setAlert("Task no created", "danger"));
  }
};

export const getTasksForWeek = week => async dispatch => {
  try {
    const response = await http.get(`/tasks/week/${week}`);
    dispatch({
      type: GET_TASKS_FOR_WEEK,
      payload: response.data
    })
  } catch (error) {
    dispatch(setAlert("tasks not fetched", "danger"));
  }
};
