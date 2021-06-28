import axios from "axios";
import {
  CREATE_RETWEET,
  CREATE_TWEET,
  DELETE_RETWEET,
  DELETE_TWEET,
  FAIL,
  GET_LIKED_TWEETS_OF_USER,
  GET_RETWEETS_OF_USER,
  HOME_FEED_SUCCESS,
  LIKE_TWEET,
  UNLIKE_TWEET
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

export const likeTweet = tweet => {
  return async dispatch => {
    try {
      await axios.post(`/api/tweets/like/${tweet._id}`);
      dispatch({
        type: LIKE_TWEET,
        payload: tweet
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

export const unlikeTweet = tweet => {
  return async dispatch => {
    try {
      await axios.post(`/api/tweets/unlike/${tweet._id}`);
      dispatch({
        type: UNLIKE_TWEET,
        payload: tweet
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

export const getLikedTweetsOfUser = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/like/${id}`);
      dispatch({
        type: GET_LIKED_TWEETS_OF_USER,
        payload: res.data.data.likedTweets
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

export const createRetweet = tweetId => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post(`/api/tweets/retweet/${tweetId}`, config);
      dispatch({
        type: CREATE_RETWEET,
        payload: res.data.data.retweet
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

export const getRetweetsOfUser = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/retweet/${id}`);
      dispatch({
        type: GET_RETWEETS_OF_USER,
        payload: res.data.data.retweets
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
      await axios.delete(`/api/tweets/retweet/${id}`);
      dispatch({
        type: DELETE_RETWEET,
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
