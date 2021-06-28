import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { login, clearError } from "../../redux/actions/authAction";
import Logo from "../layout/Logo";
import Alert from "../layout/Alert";
import { setAlert } from "../../redux/actions/alertAction";

const Login = props => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const state = useSelector(state => state.auth);
  const { email, password } = user;
  const { isAuthenticated, error } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Twitter / Login";
    if (isAuthenticated === true) {
      props.history.push("/home");
    }

    if (error) {
      dispatch(setAlert(error, "error"));
      dispatch(clearError());
    }
  }, [error, isAuthenticated, props.history]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(user));
  };

  return (
    <div className="flex justify-center">
      <div className="wrapper flex flex-col mt-4 w-1/5">
        <header className="flex flex-col justify-start p-4">
          <Logo classes={"h-10 w-10 text-blue"} />
          <div className="text-3xl font-bold text-black">
            <h1 className="my-6">Log in to Twitter</h1>
          </div>
        </header>
        <div className="form-wrapper">
          <form onSubmit={onSubmit}>
            <div className="relative w-full mb-3">
              <input
                type="email"
                name="email"
                className="border-2 border-gray-400 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                placeholder="Email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="relative w-full mb-3">
              <input
                type="password"
                name="password"
                className="border-2 border-gray-400 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                placeholder="Password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <div className="text-center mt-6">
              <input
                type="submit"
                name="login"
                id="login"
                value="Log in"
                className="cursor-pointer bg-blue text-white hover:bg-opacity-90 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:bg-opacity-90"
              />
            </div>
          </form>
        </div>
        <div className="links flex justify-around mt-6 text-blue w-full">
          <div>
            <Link to="/forgotPassword" className="text-xl">
              <small>Forgot password?</small>
            </Link>
          </div>
          <div>
            <Link to="/signup" className="text-xl">
              <small>Sign up for Twitter</small>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
