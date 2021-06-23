import axios from "axios";
import { HOME_FEED_SUCCESS, FAIL } from "./types";

export const loadHomeFeed = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/users/home");
      dispatch({
        type: HOME_FEED_SUCCESS,
        payload: res.data.data.result
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};
