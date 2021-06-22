import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer
});

export default rootReducer;
