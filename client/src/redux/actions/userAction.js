import axios from "axios";
import {
  FAIL,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWINGS_SUCCESS,
  GET_TWEETS_AND_RETWEETS,
  GET_USER
} from "./types";

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
      const tweets = (await axios.get(`/api/users/tweets/${id}`)).data.data
        .tweets;
      const retweets = (await axios.get(`/api/users/retweet/${id}`)).data.data
        .retweets;
      const res = tweets.concat(retweets);
      dispatch({
        type: GET_TWEETS_AND_RETWEETS,
        payload: res
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};
