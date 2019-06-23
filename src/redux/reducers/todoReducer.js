import {
  GET_TODOS_FOR_WEEK,
  CREATE_NEW_TODO,
  DELETE_TODO,
  DELETE_TODO_FAILED
} from "../types/types";

const initialState = {
  todos: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
 console.log("payload ", payload);

  switch (type) {
    case GET_TODOS_FOR_WEEK:
      return { ...state, todos: payload };
    case CREATE_NEW_TODO:
      return { ...state, todos: [...state.todos, payload] };
    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo._id !== payload._id) };
    case DELETE_TODO_FAILED:
      return { ...state, todos: [...state.todos, payload] };
    default:
      return state;
  }
}
