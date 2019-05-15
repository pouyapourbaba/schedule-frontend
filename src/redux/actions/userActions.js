import auth from "../../services/authService";
import userService from "../../services/userService";

// FETCH USER
export const fetchCurrentUser = () => async dispatch => {
  const currentUser = auth.getCurrentUser();
  if (currentUser) {
    try {
      const response = await userService.getUser(currentUser._id);
      const user = response.data;
      dispatch({ type: "FETCH_USER", payload: user });
    } catch (ex) {
      alert(ex.message);
    }
  }
};

// UPDATE USER
export const updateUser = (userId, user) => async dispatch => {
  try {
    const response = await userService.updateUser(userId, user);
    const updatedUser = response.data;
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
  } catch (ex) {
    alert(ex.message);
  }
};
