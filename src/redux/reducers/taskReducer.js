import { GET_TASKS_FOR_WEEK } from "../types/types";

const initialState = {
  tasks: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS_FOR_WEEK:
      return { ...state, tasks: payload };
    default:
      return state;
  }
}
