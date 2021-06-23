import React, { useEffect } from "react";
import SideBar from "../layout/SideBar/SideBar";
import Home from "./Home";

const Overview = () => {
  const renderPage = () => {};

  return (
    <div className="w-screen flex">
      <SideBar />
      {/* {renderPage()} */}
      <Home />
      <div id="follow-suggestion" className=""></div>
    </div>
  );
};

export default Overview;
