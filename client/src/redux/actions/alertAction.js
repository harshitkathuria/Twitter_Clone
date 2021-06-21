import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, type, timeout = 5000) => {
  return async dispatch => {
    dispatch({
      type: REMOVE_ALERT
    });
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
  };
};
