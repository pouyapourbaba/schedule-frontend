import { SET_DATE } from "../types/types";

export const setWeekAndDays = date => {
      return {
          type: SET_DATE,
          payload: date
      }
    
  };