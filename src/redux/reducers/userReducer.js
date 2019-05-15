const initialState = {};

const userReducer = function user(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, user: action.payload };

    case "UPDATE_USER":
      console.log("recived in reducer", action.payload)
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default userReducer;
