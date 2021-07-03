import React, { useEffect } from "react";

import TweetModalContent from "../layout/TweetModalContent";
import HomeFeed from "./HomeFeed";

const Home = () => {
  useEffect(() => {
    document.title = "Home / Twitter";
  }, []);

  return (
    <div
      className="flex flex-col w-2/5 border-r-2 border-gray-200 dark:border-gray-secondary"
      style={{ marginLeft: "calc(20% + 8rem - 4px)" }}
    >
      <TweetModalContent />
      <div
        className="border-b-2 border-gray-200 dark:border-gray-secondary h-2 dark:bg-gray-800"
        style={{ backgroundColor: "#f7f9fa" }}
      ></div>
      <HomeFeed />
    </div>
  );
};

export default Home;
