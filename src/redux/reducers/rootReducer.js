import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import taskReducer from "./taskReducer";
import todoReducer from "./todoReducer";
import dateReducer from "./dateReducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  tasks: taskReducer,
  todos: todoReducer,
  date: dateReducer
});

export default rootReducer;
