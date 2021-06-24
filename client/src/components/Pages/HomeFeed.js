import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadHomeFeed } from "../../redux/actions/userAction";

import Tweet from "../Tweet/Tweet";
import Retweet from "../Tweet/Retweet";

const HomeFeed = () => {
  const tweets = useSelector(state => state.user.homeFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHomeFeed());
  }, []);

  return (
    <div>
      {tweets &&
        tweets.map(data => {
          if (data.tweetId) return <Retweet key={data._id} data={data} />;
          else return <Tweet key={data._id} tweet={data} />;
        })}
    </div>
  );
};

export default HomeFeed;
