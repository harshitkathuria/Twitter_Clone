import {
  FOLLOW_USER,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWINGS_SUCCESS,
  GET_USER,
  SET_LOADING,
  UNFOLLOW_USER,
  UPDATE_USER
} from "../actions/types";

const initialState = {
  user: null,
  followers: null,
  followings: null,
  loading: true
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
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
          : [action.payload.loggedInUser],
        loading: false
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        followers: state.followers.filter(
          user => user._id !== action.payload.loggedInUser._id
        ),
        loading: false
      };
    case GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: action.payload,
        loading: false
      };
    case GET_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        followings: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer;
