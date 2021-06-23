import { HOME_FEED_SUCCESS } from "../actions/types";

const initialState = {
  data: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_FEED_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
