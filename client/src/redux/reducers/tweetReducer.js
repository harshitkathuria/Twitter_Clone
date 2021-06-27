import {
  CREATE_TWEET,
  DELETE_RETWEET,
  DELETE_TWEET,
  GET_TWEETS_AND_RETWEETS,
  HOME_FEED_SUCCESS
} from "../actions/types";

const initialState = {
  homeFeed: null,
  followers: null,
  followings: null,
  tweetsAndRetweets: null,
  likes: []
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case GET_TWEETS_AND_RETWEETS:
      return {
        ...state,
        tweetsAndRetweets: action.payload
      };
    default:
      return state;
  }
};

export default tweetReducer;
