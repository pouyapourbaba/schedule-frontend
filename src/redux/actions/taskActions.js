import http from "../../services/httpService";
import {
  INIT_TASKS,
  POST_NEW_TASK,
  GET_TASKS_FOR_WEEK,
  DELETE_TASK,
  UPDATE_TASK,
  GET_WEEKLY_SUMS,
  GET_MONTHLY_SUMS
} from "../types/types";
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
    });
  } catch (error) {
    dispatch(setAlert("tasks not fetched", "danger"));
  }
};

export const getMonthlySums = () => async dispatch => {
  try {
    const response = await http.get("/tasks/sum-months");
    dispatch({
      type: GET_MONTHLY_SUMS,
      payload: response.data
    });
  } catch (error) {
    dispatch(setAlert("data not fethced", "danger"));
  }
};

export const getWeeklySums = () => async dispatch => {
  try {
    const response = await http.get("/tasks/sum-weeks");
    dispatch({
      type: GET_WEEKLY_SUMS,
      payload: response.data
    });
  } catch (error) {
    dispatch(setAlert("data not fethced", "danger"));
  }
};

export const deleteTask = taskId => async dispatch => {
  try {
    await http.delete(`/tasks/${taskId}`);
    dispatch({
      type: DELETE_TASK,
      payload: taskId
    });
    
    // get the new sums to update the charts in the stats page
    dispatch(getMonthlySums());
    dispatch(getWeeklySums());
  } catch (error) {
    dispatch(setAlert("task not deleted", "danger"));
  }
};

export const updateTaske = task => async dispatch => {
  try {
    const response = await http.put(`/tasks/${task._id}`, task);
    dispatch({
      type: UPDATE_TASK,
      payload: response.data
    });
    
    // get the new sums to update the charts in the stats page
    dispatch(getMonthlySums());
    dispatch(getWeeklySums());
  } catch (error) {
    dispatch(setAlert("task not updated", "danger"));
  }
};
