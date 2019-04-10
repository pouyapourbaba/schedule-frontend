import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/tasks";

/* *************************************
// GET all the todos of the current user
** ************************************/
export function getTasks(user_id, weekNumber) {
  return http.get(apiEndpoint + "/" + user_id + "/" + weekNumber);
}

/* *************************************
// POST a new todo
** ************************************/
export function postTask(taskObj, user_id) {
  return http.post(apiEndpoint + "/" + user_id, taskObj);
}

/* *************************************
// UPDATE a todo
** ************************************/
export function updateTask(task_id, taskObj) {
  return http.put(apiEndpoint + "/" + task_id, taskObj);
}

/* *************************************
// UPDATE the status of a todo
** ************************************/
export function updateStatus(todo_id, isDone) {
//   return http.put(apiEndpoint + "/status/" + todo_id, isDone);
}

/* *************************************
// DELETE a todo
** ************************************/
export function deleteTask(task_id) {
  return  http.delete(apiEndpoint + "/" + task_id);
}

export default {
  getTasks,
  postTask,
  updateTask,
  deleteTask,
  updateStatus
};
