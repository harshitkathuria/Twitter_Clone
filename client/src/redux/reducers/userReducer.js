import {
  CREATE_TWEET,
  DELETE_RETWEET,
  DELETE_TWEET,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWINGS_SUCCESS,
  GET_TWEETS_AND_RETWEETS,
  GET_USER,
  HOME_FEED_SUCCESS
} from "../actions/types";

const initialState = {
  user: null,
  homeFeed: null,
  followers: null,
  followings: null,
  tweetsAndRetweets: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case HOME_FEED_SUCCESS:
      return {
        ...state,
        homeFeed: action.payload
      };
    case CREATE_TWEET:
      return {
        ...state,
        homeFeed: [action.payload, ...state.homeFeed]
      };
    case DELETE_TWEET:
    case DELETE_RETWEET:
      return {
        ...state,
        homeFeed: state.homeFeed
          ? state.homeFeed.filter(tweet => tweet._id !== action.payload)
          : null,
        tweetsAndRetweets: state.tweetsAndRetweets
          ? state.tweetsAndRetweets.filter(
              tweetOrRetweet => tweetOrRetweet._id !== action.payload
            )
          : null
      };
    case GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: action.payload
      };
    case GET_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        followings: action.payload
      };
    case GET_TWEETS_AND_RETWEETS:
      return {
        ...state,
        tweetsAndRetweets: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
