import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../layout/Logo";
import Alert from "../layout/Alert";

import { clearError, signup } from "../../redux/actions/authAction";
import { setAlert } from "../../redux/actions/alertAction";

const Signup = props => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    DOB: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const state = useSelector(state => state.auth);
  const { isAuthenticated, error } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Twitter / Signup";

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
    if (user.password !== user.confirmPassword) {
      dispatch(setAlert("Passwords do not match", "error"));
    } else {
      let userData = { ...user };
      userData.name = user.firstname + " " + user.lastname;
      delete userData.firstname;
      delete userData.lastname;
      dispatch(signup(userData));
    }
  };

  return (
    <div className="relative">
      <div className=""></div>
      <div className="antialiased bg-gray-500 bg-opacity-60 text-gray-900 font-sans overflow-x-hidden w-full">
        <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-white rounded-lg md:max-w-lg w-3/5 md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div className="md:flex flex-col justify-between items-center w-full">
              <div className="logo-wrapper flex justify-center">
                <Logo classes={"w-8 h-8 text-blue"} />
              </div>
              <div className="mt-4 text-left">
                <p className="text-2xl font-bold">Create Your Account</p>
                <div className="form-wrapper">
                  <form className="mt-6" onSubmit={onSubmit}>
                    <div className="flex justify-between gap-3 mb-4">
                      <span className="w-1/2">
                        <label
                          htmlFor="firstname"
                          className="block text-xs font-semibold text-gray-600 uppercase"
                        >
                          Firstname
                        </label>
                        <input
                          id="firstname"
                          type="text"
                          name="firstname"
                          placeholder="Your"
                          className="border-2 block w-full p-3 mt-2 bg-gray-200 appearance-none focus:outline-none focus:shadow-inner focus:border-blue rounded"
                          value={user.firstname}
                          onChange={onChange}
                          required
                        />
                      </span>
                      <span className="w-1/2">
                        <label
                          htmlFor="lastname"
                          className="block text-xs font-semibold text-gray-600 uppercase"
                        >
                          Lastname
                        </label>
                        <input
                          id="lastname"
                          type="text"
                          name="lastname"
                          placeholder="Name"
                          className="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                          value={user.lastname}
                          onChange={onChange}
                          required
                        />
                      </span>
                    </div>
                    <div className="flex justify-between gap-3 mb-4">
                      <span className="w-1/2">
                        <label
                          htmlFor="username"
                          className="block text-xs font-semibold text-gray-600 uppercase"
                        >
                          Username
                        </label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          placeholder="username"
                          className="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:shadow-inner focus:border-blue rounded"
                          value={user.username}
                          onChange={onChange}
                          required
                        />
                      </span>
                      <span className="w-1/2">
                        <label
                          htmlFor="DOB"
                          className="block text-xs font-semibold text-gray-600 uppercase"
                        >
                          Date Of Birth
                        </label>
                        <input
                          id="DOB"
                          type="date"
                          name="DOB"
                          className="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                          value={user.DOB}
                          onChange={onChange}
                          required
                        />
                      </span>
                    </div>
                    <label
                      htmlFor="email"
                      className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john.doe@company.com"
                      className="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                      value={user.email}
                      onChange={onChange}
                      required
                    />
                    <label
                      htmlFor="password"
                      className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="********"
                      min={8}
                      className="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                      value={user.password}
                      onChange={onChange}
                      required
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="********"
                      minLength={8}
                      className="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                      value={user.confirmPassword}
                      onChange={onChange}
                      required
                    />
                    <div className="text-center mt-6">
                      <input
                        type="submit"
                        name="login"
                        id="login"
                        value="Sign up"
                        className="cursor-pointer bg-blue text-white hover:bg-blue hover:bg-opacity-90 font-bold py-2 px-4 rounded-full w-full max focus:outline-none focus:bg-opacity-90"
                      />
                    </div>
                    <Link
                      to="/login"
                      className="flex justify-between mt-4 text-sm text-blue cursor-pointer hover:text-black"
                    >
                      Already registered?
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
