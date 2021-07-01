import {
  FOLLOW_USER,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWINGS_SUCCESS,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_USER
} from "../actions/types";

const initialState = {
  user: null,
  followers: null,
  followings: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case FOLLOW_USER:
      return {
        ...state,
        followers: state.followers
          ? [action.payload.loggedInUser, ...state.followers]
          : [action.payload.loggedInUser]
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        followers: state.followers.filter(
          user => user._id !== action.payload.loggedInUser._id
        )
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
    default:
      return state;
  }
};

export default userReducer;
