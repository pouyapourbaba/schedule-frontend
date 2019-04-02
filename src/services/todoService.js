import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/todos";

/* *************************************
// GET all the todos of the current user
** ************************************/
export function getTodos(user_id) {
  return http.get(apiEndpoint + "/" + user_id);
}

/* *************************************
// POST a new todo
** ************************************/
export function postTodo(todoObj) {
  return http.post(apiEndpoint, todoObj);
}

/* *************************************
// UPDATE a todo
** ************************************/
export function updateTodo(todo_id, todoObj) {
  return http.put(apiEndpoint + "/" + todo_id, todoObj);
}

/* *************************************
// DELETE a todo
** ************************************/
export function deleteTodo(todo_id) {
  return  http.delete(apiEndpoint + "/" + todo_id);
}

export default {
  getTodos,
  postTodo,
  updateTodo,
  deleteTodo
};
