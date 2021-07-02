import axios from "axios";
import {
  FAIL,
  FOLLOW_USER,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWINGS_SUCCESS,
  GET_TWEETS_AND_RETWEETS,
  GET_USER,
  SET_LOADING,
  UNFOLLOW_USER
} from "./types";

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const getUser = id => {
  setLoading();
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

export const followUser = (user, loggedInUser) => {
  setLoading();
  return async dispatch => {
    try {
      await axios.post(`/api/connect/follow/${user._id}`);
      dispatch({
        type: FOLLOW_USER,
        payload: { user, loggedInUser }
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const unfollowUser = (user, loggedInUser) => {
  setLoading();
  return async dispatch => {
    try {
      await axios.delete(`/api/connect/unfollow/${user._id}`);
      dispatch({
        type: UNFOLLOW_USER,
        payload: { user, loggedInUser }
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
  setLoading();
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/followers/${id}`);
      dispatch({
        type: GET_FOLLOWERS_SUCCESS,
        payload: res.data.data.followers
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
  setLoading();
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/following/${id}`);
      dispatch({
        type: GET_FOLLOWINGS_SUCCESS,
        payload: res.data.data.followings
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
  setLoading();
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
