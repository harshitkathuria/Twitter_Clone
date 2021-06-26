import React from "react";

import SideBar from "../layout/SideBar/SideBar";

const Overview = ({ page: Page, match }) => {
  const renderPage = () => {
    return <Page id={match.params.id} />;
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
