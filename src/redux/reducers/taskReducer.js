import {
  GET_TASKS_FOR_WEEK,
  POST_NEW_TASK,
  GET_MONTHLY_SUMS,
  GET_WEEKLY_SUMS,
  DELETE_TASK,
  UPDATE_TASK,
  INIT_TASKS
} from "../types/types";

const initialState = {
  allTasks: [],
  tasks: [],
  monthly: [],
  weekly: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case INIT_TASKS:
      return { ...state, tasks: payload };
    case POST_NEW_TASK:
      return { ...state, tasks: [...state.tasks, payload] };
    case GET_TASKS_FOR_WEEK:
      return { ...state, tasks: [...payload] };
    case GET_MONTHLY_SUMS:
      return { ...state, monthly: [...payload] };
    case GET_WEEKLY_SUMS:
      return { ...state, weekly: [...payload] };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== payload)
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id !== payload._id ? task : payload
        )
      };
    default:
      return state;
  }
}
