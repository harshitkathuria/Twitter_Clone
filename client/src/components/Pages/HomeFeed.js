import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLikedTweetsOfUser,
  getRetweetsOfUser,
  loadHomeFeed
} from "../../redux/actions/tweetAction";

import Tweet from "../Tweet/Tweet";
import Retweet from "../Tweet/Retweet";
import Spinner from "../layout/Spinner";
import Comment from "../Tweet/Comment";

const HomeFeed = () => {
  const user = useSelector(state => state.auth.user);
  const tweets = useSelector(state => state.tweet.homeFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHomeFeed());
    dispatch(getLikedTweetsOfUser(user._id));
    dispatch(getRetweetsOfUser(user._id));
  }, []);

  return (
    <div>
      {tweets ? (
        tweets.map(data => {
          if (data.text && data.tweetId)
            return <Comment key={data._id} data={data} />;
          else if (data.tweetId) return <Retweet key={data._id} data={data} />;
          else return <Tweet key={data._id} tweet={data} />;
        })
      ) : (
        <div className="mt-4 w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
