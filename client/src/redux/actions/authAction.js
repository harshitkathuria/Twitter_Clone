import axios from "axios";
import {
  SIGNUP_USER,
  LOGIN_USER,
  AUTH_FAIL,
  EMAIL_SUCCESS,
  EMAIL_FAIL,
  RESET_PASSWORD_FAIL,
  CLEAR_ERROR,
  USER_LOADED,
  LOGOUT_USER,
  UPDATE_USER,
  FAIL,
  GET_MY_FOLLOWINGS
} from "./types";

import setAuthToken from "../../components/utils/setAuthToken";

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
        payload: res.data
      });
      loadUser();
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
        payload: res.data
      });
      loadUser();
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: AUTH_FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const updateMe = data => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const formData = new FormData();
      for (const el in data) {
        formData.append(el, data[el]);
      }
      const res = await axios.patch("/api/users/updateMe", formData, config);
      dispatch({
        type: UPDATE_USER,
        payload: res.data.data.user
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const logout = () => {
  return async dispatch => {
    setAuthToken();
    dispatch({ type: LOGOUT_USER });
  };
};

export const loadUser = () => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({ type: AUTH_FAIL });
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

export const getMyFollowings = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/following/${id}`);
      dispatch({
        type: GET_MY_FOLLOWINGS,
        payload: res.data.data.followings
      });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: FAIL,
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
