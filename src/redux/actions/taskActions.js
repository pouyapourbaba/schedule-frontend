import http from "../../services/httpService";
import {
  INIT_TASKS,
  POST_NEW_TASK,
  GET_TASKS_FOR_WEEK,
  DELETE_TASK
} from "../types/types";
import { setAlert } from "./alertActions";
import { GET_MONTHLY_SUMS } from "./../types/types";

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
    });
  } catch (error) {
    dispatch(setAlert("tasks not fetched", "danger"));
  }
};

export const getMonthlySums = () => async dispatch => {
  try {
    const response = await http.get("/tasks/sum-months");
 console.log("response action", response.data);
    dispatch({
      type: GET_MONTHLY_SUMS,
      payload: response.data
    });
  } catch (error) {
    dispatch(setAlert("data not fethced", "danger"));
  }
};

export const deleteTask = taskId => async dispatch => {
  try {
    const response = await http.delete(`/tasks/${taskId}`);
    dispatch({
      type: DELETE_TASK,
      payload: taskId
    });
  } catch (error) {
    dispatch(setAlert("task not deleted", "danger"));
  }
};
