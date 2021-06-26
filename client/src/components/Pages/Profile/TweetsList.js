import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserTweetsAndRetweets } from "../../../redux/actions/userAction";

import Tweet from "../../Tweet/Tweet";
import Retweet from "../../Tweet/Retweet";

const TweetsList = ({ id }) => {
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.user.tweetsAndRetweets);

  useEffect(() => {
    dispatch(getUserTweetsAndRetweets(id));
  }, [id]);

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

export default TweetsList;
