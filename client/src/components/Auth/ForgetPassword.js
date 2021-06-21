import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logo from "../layout/Logo";
import { sendResetPasswordEmail } from "../../redux/actions/authAction";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const onChange = e => {
    setEmail(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(sendResetPasswordEmail({ email }));
    document.getElementById("before-sending").style.display = "none";
    document.getElementById("after-sending").style.display = "block";
  };

  return (
    <div className="w-screen">
      <nav className="flex justify-center h-10 border-b-2 border-gray-200 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <Logo classes={"h6 w-6 text-blue"} />
          <span className="text-gray-500 text-lg">Password Reset</span>
        </Link>
      </nav>
      <section id="before-sending" className="mx-auto max-w-xl my-4">
        <div className="py-9">
          <div className="heading__wrapper mb-9">
            <p className="text-3xl font-semibold">Find your Twitter account</p>
          </div>
          <div className="form__wrapper">
            <form className="form" onSubmit={onSubmit}>
              <label htmlFor="email" className="block ml-1">
                Enter your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                required
                className="mt-3 px-4 py-1 w-2/3 rounded-full block border-2 border-gray-300 focus:outline-none focus:border-blue focus:ring-1"
              />

              <input
                type="submit"
                value="Send"
                className="mt-6 cursor-pointer bg-blue text-white hover:bg-opacity-90 font-bold py-1 px-6 rounded-full focus:outline-none focus:bg-opacity-90"
              />
            </form>
          </div>
        </div>
      </section>
      <section
        id="after-sending"
        className="max-w-xl mx-auto my-10"
        style={{ display: "none" }}
      >
        <p className="font-medium text-lg">
          Reset Password Link has been sent to your email address. Click on the
          link to reset your password.{" "}
        </p>
      </section>
    </div>
  );
};

export default ForgetPassword;
