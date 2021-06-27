import {
  CREATE_TWEET,
  DELETE_RETWEET,
  DELETE_TWEET,
  GET_LIKED_TWEETS_OF_USER,
  GET_TWEETS_AND_RETWEETS,
  HOME_FEED_SUCCESS,
  LIKE_TWEET,
  UNLIKE_TWEET
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
    case LIKE_TWEET:
      return {
        ...state,
        likes: [...state.likes, action.payload],
        homeFeed: state.homeFeed
          ? state.homeFeed.map(tweet =>
              tweet._id === action.payload._id
                ? {
                    ...tweet,
                    likesCount: tweet.likesCount + 1
                  }
                : tweet
            )
          : null,
        tweetsAndRetweets: state.tweetsAndRetweets
          ? state.tweetsAndRetweets.map(tweet =>
              tweet._id === action.payload._id
                ? {
                    ...tweet,
                    likesCount: tweet.likesCount + 1
                  }
                : tweet
            )
          : null
      };
    case UNLIKE_TWEET:
      return {
        ...state,
        likes: state.likes.filter(tweet => tweet._id !== action.payload._id),
        homeFeed:
          state.homeFeed &&
          state.homeFeed.map(tweet =>
            tweet._id === action.payload._id
              ? {
                  ...tweet,
                  likesCount: tweet.likesCount - 1
                }
              : tweet
          ),
        tweetsAndRetweets:
          state.tweetsAndRetweets &&
          state.tweetsAndRetweets.map(tweet =>
            tweet._id === action.payload._id
              ? {
                  ...tweet,
                  likesCount: tweet.likesCount - 1
                }
              : tweet
          )
      };
    case GET_LIKED_TWEETS_OF_USER:
      return {
        ...state,
        likes: action.payload
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
