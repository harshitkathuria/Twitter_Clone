import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logo from "../layout/Logo";
import Alert from "../layout/Alert";

import { resetPassword } from "../../redux/actions/authAction";
import { setAlert } from "../../redux/actions/alertAction";

const ResetPassword = () => {
  const [state, setState] = useState({
    url: window.location.pathname,
    password: "",
    confirmPassword: ""
  });

  const { password, confirmPassword } = state;
  const dispatch = useDispatch();

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setAlert("Passwords do not match", "error"));
    } else {
      dispatch(resetPassword(state));
      document.getElementById("before-reset").style.display = "none";
      document.getElementById("after-reset").style.display = "block";
    }
  };

  return (
    <div className="w-screen">
      <nav className="flex justify-center h-10 border-b-2 border-gray-200 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <Logo classes={"h6 w-6 text-blue"} />
          <span className="text-gray-500 text-lg">Password Reset</span>
        </Link>
      </nav>
      <section id="before-reset" className="mx-auto max-w-xl my-4">
        <div className="py-9">
          <div className="heading__wrapper mb-9">
            <p className="text-3xl font-semibold">Reset Your Password</p>
          </div>
          <div className="form__wrapper">
            <form className="form" onSubmit={onSubmit}>
              <label htmlFor="password" className="block ml-1">
                Enter new password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                minLength={8}
                required
                className="mt-1 mb-3 px-4 py-1 w-2/3 rounded-lg block border-2 border-gray-300 focus:outline-none focus:border-blue focus:ring-1"
              />
              <label htmlFor="confirmPassword" className="block ml-1">
                Confirm new password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                minLength={8}
                required
                className="mt-1 px-4 py-1 w-2/3 rounded-lg block border-2 border-gray-300 focus:outline-none focus:border-blue focus:ring-1"
              />

              <input
                type="submit"
                value="Submit"
                className="mt-6 cursor-pointer bg-blue text-white hover:bg-opacity-90 font-bold py-1 px-6 rounded-full focus:outline-none focus:bg-opacity-90"
              />
            </form>
          </div>
        </div>
      </section>
      <section
        id="after-reset"
        className="max-w-xl mx-auto my-10"
        style={{ display: "none" }}
      >
        <p className="font-medium text-lg">
          Your password has been changed. Please close this window.
        </p>
      </section>
    </div>
  );
};

export default ResetPassword;
