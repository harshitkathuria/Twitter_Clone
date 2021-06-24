import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import SideBar from "../layout/SideBar/SideBar";
import Home from "./Home";
// import Profile from "./Profile";

const Overview = () => {
  const location = useLocation();
  console.log(location.pathname);
  const renderPage = () => {
    switch (location.pathname) {
      case "/home":
        return <Home />;
      // case "/profile":
      //   return <Profile />;
    }
  };

  return (
    <div className="w-screen flex">
      <SideBar />
      {renderPage()}
      <div id="follow-suggestion" className=""></div>
    </div>
  );
};

export default Overview;
