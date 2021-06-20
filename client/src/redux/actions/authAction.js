import axios from "axios";

export const signup = async user => {
  return {
    type: "SIGNUP_USER"
  };
};

export const login = async user => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/auth/login", user, config);
    return {
      type: "LOGIN_USER",
      payload: res.data.data
    };
  } catch (err) {
    console.log(err.response.data.msg);
    return {
      type: "AUTH_FAIL",
      payload: err.response.data.msg
    };
  }
};
