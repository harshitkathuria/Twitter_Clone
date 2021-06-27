import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadUser, logout } from "../../../redux/actions/authAction";

import List from "./List";
import Logo from "../Logo";

const SideBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="max-w-xs w-1/5 ml-32 py-1 max-h-screen border-r-2 border-gray-200 fixed top-0 left-0 z-10 overflow-y-auto">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-start p-1">
          <div className="logo mb-2">
            <Logo classes={"w-8 h-8 text-blue"} />
          </div>
          <List />
          <div className="tweet-btn">
            <button className="bg-blue text-white w-48 mt-3 hover:bg-blue bg-opacity-90 font-bold py-2 px-4 rounded-full">
              Tweet
            </button>
          </div>
        </div>
        <div
          id="profile-btn"
          className="flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-14 mr-2"
        >
          <button className="flex flex-col flex-shrink-0 group focus:outline-none">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src="https://source.unsplash.com/random"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-base leading-6 font-bold">
                  Harshit Kathuria
                </p>
                <p className="text-sm leading-5 font-medium text-gray-600 transition ease-in-out duration-150">
                  @1409_harshit
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center w-full">
              <div
                onClick={onLogout}
                className="bg-blue text-white focus:outline-none w-full mx-auto mt-5 hover:bg-blue bg-opacity-90 font-bold py-2 px-2 rounded-full"
              >
                Logout
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
