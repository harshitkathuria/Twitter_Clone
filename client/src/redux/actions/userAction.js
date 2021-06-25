import axios from "axios";
import {
  HOME_FEED_SUCCESS,
  FAIL,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWINGS_SUCCESS,
  GET_TWEETS_AND_RETWEETS,
  GET_USER
} from "./types";

export const loadHomeFeed = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/users/home");
      dispatch({
        type: HOME_FEED_SUCCESS,
        payload: res.data.data.result
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const getUser = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      dispatch({
        type: GET_USER,
        payload: res.data.data.user
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const getFollowers = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/followers/${id}`);
      dispatch({
        type: GET_FOLLOWERS_SUCCESS,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const getFollowings = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/following/${id}`);
      dispatch({
        type: GET_FOLLOWINGS_SUCCESS,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const getUserTweetsAndRetweets = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/tweets/${id}`);
      dispatch({
        type: GET_TWEETS_AND_RETWEETS,
        payload: res.data.data.tweets
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};
