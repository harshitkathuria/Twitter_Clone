import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import tweetReducer from "./tweetReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  tweet: tweetReducer
});

export default rootReducer;
