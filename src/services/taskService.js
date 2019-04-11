import http from "./httpService";
import { apiUrl, apiUrlProd } from "../config.json";

const apiEndpoint = apiUrl + "/tasks";
// const apiEndpoint = "/tasks";

/*
 * GET all the tasks of the current user
 */
export function getTasks(user_id, weekNumber) {
  return http.get(apiEndpoint + "/" + user_id + "/" + weekNumber);
}

/*
 * POST a new task
 */
export function postTask(taskObj, user_id) {
  return http.post(apiEndpoint + "/new/" + user_id, taskObj);
}

/*
 * UPDATE a task
 */
export function updateTask(task_id, taskObj) {
  return http.put(apiEndpoint + "/update/" + task_id, taskObj);
}

/*
 * DELETE a task
 */
export function deleteTask(task_id) {
  return http.delete(apiEndpoint + "/delete/" + task_id);
}

export default {
  getTasks,
  postTask,
  updateTask,
  deleteTask
};
