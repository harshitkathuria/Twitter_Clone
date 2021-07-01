import React from "react";

import SideBar from "../layout/SideBar/SideBar";

const Overview = ({ page: Page, match }) => {
  const renderPage = () => {
    return <Page id={match.params.id} />;
  };

  return (
    <div className="w-screen min-h-screen flex dark:bg-black-dark dark:text-gray-primary">
      <SideBar />
      {renderPage()}
      <div id="follow-suggestion" className=""></div>
    </div>
  );
};

export default Overview;
