import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserTweetsAndRetweets } from "../../../redux/actions/userAction";

import Tweet from "../../Tweet/Tweet";

const TweetsList = ({ id }) => {
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.user.tweetsAndRetweets);

  useEffect(() => {
    dispatch(getUserTweetsAndRetweets(id));
  }, []);

  return (
    <div>
      {tweets && tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)}
    </div>
  );
};

export default TweetsList;
