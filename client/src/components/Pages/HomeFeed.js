import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLikedTweetsOfUser,
  loadHomeFeed
} from "../../redux/actions/tweetAction";

import Tweet from "../Tweet/Tweet";
import Retweet from "../Tweet/Retweet";

const HomeFeed = () => {
  const user = useSelector(state => state.auth.user);
  const tweets = useSelector(state => state.tweet.homeFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHomeFeed());
    dispatch(getLikedTweetsOfUser(user._id));
  }, []);

  return (
    <div>
      {tweets
        ? tweets.map(data => {
            if (data.tweetId) return <Retweet key={data._id} data={data} />;
            else return <Tweet key={data._id} tweet={data} />;
          })
        : ""}
    </div>
  );
};

export default HomeFeed;
