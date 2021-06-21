import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_FAIL,
  EMAIL_FAIL,
  RESET_PASSWORD_FAIL
} from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case SIGNUP_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_FAIL:
    case EMAIL_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
