import { GET_TASKS_FOR_WEEK, INIT_TASKS, POST_NEW_TASK } from "../types/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case INIT_TASKS:
      return [...state, ...payload];
    case POST_NEW_TASK:
      return [...state, payload];
    case GET_TASKS_FOR_WEEK:
      return [ ...payload];
    default:
      return state;
  }
}
