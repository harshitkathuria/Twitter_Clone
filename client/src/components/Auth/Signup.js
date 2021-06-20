import React from "react";
import { Link } from "react-router-dom";
import Logo from "../layout/Logo";

const Signup = () => {
  return (
    <main class="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
      <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div class="bg-white rounded-lg md:max-w-lg w-3/5 md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div class="md:flex flex-col justify-between items-center w-full">
            <div className="logo-wrapper flex justify-center">
              <Logo classes={"w-8 h-8 text-blue"} />
            </div>
            <div class="mt-4 text-left">
              <p class="text-2xl font-bold">Create Your Account</p>
              <div className="form-wrapper">
                <form class="mt-6">
                  <div class="flex justify-between gap-3 mb-4">
                    <span class="w-1/2">
                      <label
                        for="firstname"
                        class="block text-xs font-semibold text-gray-600 uppercase"
                      >
                        Firstname
                      </label>
                      <input
                        id="firstname"
                        type="text"
                        name="firstname"
                        placeholder="Your"
                        class="border-2 block w-full p-3 mt-2 bg-gray-200 appearance-none focus:outline-none focus:shadow-inner focus:border-blue rounded"
                        required
                      />
                    </span>
                    <span class="w-1/2">
                      <label
                        for="lastname"
                        class="block text-xs font-semibold text-gray-600 uppercase"
                      >
                        Lastname
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        placeholder="Name"
                        class="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                        required
                      />
                    </span>
                  </div>
                  <div class="flex justify-between gap-3 mb-4">
                    <span class="w-1/2">
                      <label
                        for="username"
                        class="block text-xs font-semibold text-gray-600 uppercase"
                      >
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="username"
                        class="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:shadow-inner focus:border-blue rounded"
                        required
                      />
                    </span>
                    <span class="w-1/2">
                      <label
                        for="DOB"
                        class="block text-xs font-semibold text-gray-600 uppercase"
                      >
                        Date Of Birth
                      </label>
                      <input
                        id="DOB"
                        type="date"
                        name="DOB"
                        class="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                        required
                      />
                    </span>
                  </div>
                  <label
                    for="email"
                    class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john.doe@company.com"
                    class="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                    required
                  />
                  <label
                    for="password"
                    class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    class="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                    required
                  />
                  <label
                    for="passwordConfirm"
                    class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                  >
                    Confirm password
                  </label>
                  <input
                    id="passwordConfirm"
                    type="password"
                    name="passwordConfirm"
                    placeholder="********"
                    class="border-2 block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none  focus:shadow-inner focus:border-blue rounded"
                    required
                  />
                  <div className="text-center mt-6">
                    <input
                      type="submit"
                      name="login"
                      id="login"
                      value="Sign up"
                      className="cursor-pointer bg-blue text-white hover:bg-blue bg-opacity-90 font-bold py-2 px-4 rounded-full w-full max"
                    />
                  </div>
                  <Link
                    to="/login"
                    class="flex justify-between mt-4 text-sm text-blue cursor-pointer hover:text-black"
                  >
                    Already registered?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
