import { SET_DATE } from "../types/types";
import moment from "moment";

const initialState = {
  year: parseInt(moment().format("Y")),
  month: parseInt(moment().format("M")),
  week: parseInt(moment().format("W"))
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DATE:
      console.log(payload);
      return { ...state, ...payload };
    default:
      return state;
  }
}
