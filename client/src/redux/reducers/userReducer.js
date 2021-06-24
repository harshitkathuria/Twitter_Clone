import { CREATE_TWEET, HOME_FEED_SUCCESS } from "../actions/types";

const initialState = {
  homeFeed: null
};

const userReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default userReducer;
