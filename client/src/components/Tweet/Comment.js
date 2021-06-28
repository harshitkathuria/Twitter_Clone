import React from "react";
import { Link } from "react-router-dom";
import Tweet from "./Tweet";

const Comment = ({ data }) => {
  const commentUser = data.userId,
    tweet = data.tweetId;

  return (
    <div className="flex flex-col pt-3">
      <Tweet tweet={tweet} />
      <div className="flex align-items justify-between px-2 mt-4">
        <div className="flex items-start">
          <div className="flex mr-3 w-12 justify-end">
            <svg
              className="text-center h-5 w-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="gray"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
              </g>
            </svg>
          </div>
          <Link to={`/${commentUser._id}`} className="hover:underline">
            <div className="font-semibold text-sm text-gray-500">
              {commentUser.name} Commented
            </div>
          </Link>
        </div>
      </div>
      <Tweet tweet={data} />
    </div>
  );
};

export default Comment;
