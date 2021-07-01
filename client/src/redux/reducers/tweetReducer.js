import {
  CREATE_COMMENT,
  CREATE_RETWEET,
  CREATE_TWEET,
  DELETE_RETWEET,
  DELETE_TWEET,
  GET_LIKED_TWEETS_OF_USER,
  GET_RETWEETS_OF_USER,
  GET_TWEETS_AND_RETWEETS,
  HOME_FEED_SUCCESS,
  LIKE_TWEET,
  UNLIKE_TWEET
} from "../actions/types";

const initialState = {
  homeFeed: null,
  tweetsAndRetweets: null,
  likes: [],
  retweets: null
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
        homeFeed: state.homeFeed
          ? [action.payload, ...state.homeFeed]
          : [action.payload],
        tweetsAndRetweets: state.tweetsAndRetweets
          ? [action.payload, ...state.tweetsAndRetweets]
          : [action.payload]
      };
    case CREATE_RETWEET:
      return {
        ...state,
        retweets: [action.payload, ...state.retweets],
        homeFeed: state.homeFeed
          ? [action.payload, ...state.homeFeed].map(tweet =>
              tweet._id === action.payload.tweetId._id
                ? {
                    ...tweet,
                    retweetsCount: tweet.retweetsCount + 1
                  }
                : tweet
            )
          : null,
        tweetsAndRetweets: state.tweetsAndRetweets
          ? [action.payload, ...state.tweetsAndRetweets].map(tweet =>
              tweet._id === action.payload.tweetId._id
                ? {
                    ...tweet,
                    retweetsCount: tweet.retweetsCount + 1
                  }
                : tweet
            )
          : null
      };
    case DELETE_TWEET:
      return {
        ...state,
        homeFeed: state.homeFeed
          ? state.homeFeed.filter(tweet =>
              tweet.tweetId
                ? tweet.tweetId._id !== action.payload
                : tweet._id !== action.payload
            )
          : null,
        tweetsAndRetweets: state.tweetsAndRetweets
          ? console.log(state.tweetsAndRetweets) &&
            state.tweetsAndRetweets.filter(tweetOrRetweet =>
              tweetOrRetweet.tweetId
                ? tweetOrRetweet.tweetId._id !== action.payload
                : tweetOrRetweet._id !== action.payload
            )
          : null
      };
    case DELETE_RETWEET:
      return {
        ...state,
        retweets: state.retweets.filter(
          retweet => retweet.tweetId && retweet.tweetId._id !== action.payload
        ),
        homeFeed: state.homeFeed
          ? state.homeFeed
              .filter(retweet =>
                retweet.tweetId
                  ? retweet.tweetId._id !== action.payload
                  : retweet
              )
              .map(tweet =>
                tweet._id === action.payload
                  ? {
                      ...tweet,
                      retweetsCount: tweet.retweetsCount - 1
                    }
                  : tweet
              )
          : null,
        tweetsAndRetweets: state.tweetsAndRetweets
          ? state.tweetsAndRetweets
              .filter(tweetOrRetweet => tweetOrRetweet._id !== action.payload)
              .map(retweet =>
                retweet.tweetId && retweet.tweetId._id === action.payload
                  ? {
                      ...retweet,
                      [retweet.tweetId.retweetsCount]:
                        retweet.tweetId.retweetsCount - 1
                    }
                  : retweet
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
    case CREATE_COMMENT:
      return {
        ...state,
        homeFeed: state.homeFeed
          ? [action.payload.comment, ...state.homeFeed].map(tweet =>
              tweet._id === action.payload.tweet._id
                ? {
                    ...tweet,
                    commentsCount: tweet.commentsCount + 1
                  }
                : tweet
            )
          : null,
        tweetsAndRetweets: state.tweetsAndRetweets
          ? [action.payload.comment, ...state.tweetsAndRetweets].map(tweet =>
              tweet._id === action.payload.tweet._id
                ? {
                    ...tweet,
                    commentsCount: tweet.commentsCount + 1
                  }
                : tweet
            )
          : null
      };
    case GET_RETWEETS_OF_USER:
      return {
        ...state,
        retweets: action.payload
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
