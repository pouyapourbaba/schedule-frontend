import http from "./httpService";
// import {apiUrl} from "../config.json"

const apiUrl = " http://localhost:3000/api";
const apiEndpoint = apiUrl + "/users";

export function register(user) {
  console.log(user);
  return http.post(apiEndpoint, {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password
  });
}
