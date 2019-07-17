import http from "../../services/httpService";

import {
  GET_TODOS_FOR_WEEK,
  CREATE_NEW_TODO,
  DELETE_TODO,
  DELETE_TODO_FAILED
} from "../types/types";
import { setAlert } from "./alertActions";

// Get todos for a given week
export const getTodosForWeek = week => async dispatch => {
  try {
    const res = await http.get(`/todos/${week}`);
    dispatch({
      type: GET_TODOS_FOR_WEEK,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert("todos not fetched", "danger"));
  }
};

// Create new todo
export const createNewTodo = todo => async dispatch => {
  try {
    const res = await http.post("/todos", todo);
    dispatch({
      type: CREATE_NEW_TODO,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert("todos not created", "danger"));
  }
};

// Delete todo
export const deleteTodo = todo => async dispatch => {
  try {
    await http.delete(`/todos/${todo._id}`);
    dispatch({
      type: DELETE_TODO,
      payload: todo
    });
  } catch (error) {
    dispatch(setAlert("Todo not deleted  ", "danger"));
  }
};
