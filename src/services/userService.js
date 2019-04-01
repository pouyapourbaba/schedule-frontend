import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password
  });
}

export function getUser(id) {
  return http.get(apiEndpoint + "/" + id)
}
