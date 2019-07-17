import http from "./httpService";

const apiEndpoint = "/tasks";

/*
 * Get the weekly total
 */
export function getWeeklyTotalDurations(user_id) {
  return http.get(apiEndpoint + "/weeks")
}

/*
 * Get the monthly total
 */
export function getMonthlyTotalDurations(user_id) {
  return http.get(apiEndpoint + "/months")
}

/*
 * GET all the tasks of the current user based on the week
 */
export function getTasks(user_id, weekNumber) {
  return http.get(apiEndpoint + "/" + weekNumber);
}

/*
 * GET all the tasks of the current user
 */

export function getAllTasks(user_id) {
  return http.get(apiEndpoint + "/");
}

/*
 * POST a new task
 */
export function postTask(taskObj) {
  return http.post(apiEndpoint, taskObj);
}

/*
 * UPDATE a task
 */
export function updateTask(task_id, taskObj) {
  return http.put(apiEndpoint + "/update/" + task_id, taskObj);
}

/*
 * UPDATE the status of a task
 */
export function updateStatus(todo_id, isDone) {
  //   return http.put(apiEndpoint + "/status/" + todo_id, isDone);
}

/*
 * DELETE a task
 */
export function deleteTask(task_id) {
  return http.delete(apiEndpoint + "/delete/" + task_id);
}

export default {
  getWeeklyTotalDurations,
  getMonthlyTotalDurations,
  getTasks,
  getAllTasks,
  postTask,
  updateTask,
  deleteTask
};
