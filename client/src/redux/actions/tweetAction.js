import axios from "axios";
import {
  CREATE_TWEET,
  DELETE_RETWEET,
  DELETE_TWEET,
  FAIL,
  HOME_FEED_SUCCESS
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

export const createTweet = data => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/api/tweets", data, config);
      dispatch({
        type: CREATE_TWEET,
        payload: res.data.data.tweet
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};

export const deleteTweet = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/tweets/${id}`);
      dispatch({
        type: DELETE_TWEET,
        payload: id
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

export const deleteRetweet = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/retweets/${id}`);
      dispatch({
        type: DELETE_RETWEET,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};
