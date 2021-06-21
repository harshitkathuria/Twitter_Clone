import axios from "axios";
import {
  SIGNUP_USER,
  LOGIN_USER,
  AUTH_FAIL,
  EMAIL_SUCCESS,
  EMAIL_FAIL,
  RESET_PASSWORD_FAIL,
  CLEAR_ERROR
} from "./types";

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
        type: AUTH_FAIL,
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
        type: AUTH_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const sendResetPasswordEmail = email => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/api/users/forgotPassword", email, config);
      dispatch({
        type: EMAIL_SUCCESS,
        payload: res.data.msg
      });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: EMAIL_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const resetPassword = data => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      console.log(data);
      const url = data.url;
      const passwords = {
        password: data.password,
        confirmPassword: data.confirmPassword
      };
      const res = await axios.patch(`/api/users${url}`, passwords, config);
      dispatch({
        type: EMAIL_SUCCESS,
        payload: res.data.msg
      });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};
