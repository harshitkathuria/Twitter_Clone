import axios from "axios";
import { SIGNUP_USER, LOGIN_USER } from "./types";

export const signup = user => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/api/auth/signup", user, config);
      dispatch({
        type: SIGNUP_USER,
        payload: res.data.data.user
      });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: "AUTH_FAIL",
        payload: err.response.data.msg
      });
    }
  };
};

export const login = user => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/api/auth/login", user, config);
      dispatch({
        type: LOGIN_USER,
        payload: res.data.data.user
      });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: "AUTH_FAIL",
        payload: err.response.data.msg
      });
    }
  };
};
