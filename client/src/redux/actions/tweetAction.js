import axios from "axios";
import { CREATE_TWEET, FAIL } from "./types";

export const createTweet = data => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/api/tweets", data, config);
      dispatch({
        type: CREATE_TWEET,
        payload: res.data.data.tweet
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response.data.msg
      });
    }
  };
};
