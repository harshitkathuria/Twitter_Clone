import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer
});

export default rootReducer;
