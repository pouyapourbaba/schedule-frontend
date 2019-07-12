import {
  GET_TASKS_FOR_WEEK,
  INIT_TASKS,
  POST_NEW_TASK,
  GET_MONTHLY_SUMS,
  DELETE_TASK
} from "../types/types";

const initialState = {
  tasks: [],
  monthly: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case INIT_TASKS:
    //   return { ...state, tasks: [...payload] };
    case POST_NEW_TASK:
      return { ...state, tasks: [...state.tasks, payload] };
    case GET_TASKS_FOR_WEEK:
      return { ...state, tasks: [...payload] };
    case GET_MONTHLY_SUMS:
      console.log("reducer", payload)
      return { ...state, monthly: [...payload] };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== payload)
      };
    default:
      return state;
  }
}
