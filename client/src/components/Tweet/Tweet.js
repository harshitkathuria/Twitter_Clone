import React from "react";
import { Link } from "react-router-dom";

const Tweet = ({ tweet }) => {
  const {
    userId: { _id, name, username },
    text,
    createdAt,
    likesCount,
    retweetsCount,
    commentsCount
  } = tweet;

  return (
    <div className="border-b-2 border-gray-200 flex px-2 pt-3">
      <div className="flex flex-col flex-grow-0 flex-shrink-0 items-center mr-3">
        <div id="img-wrapper" className="flex flex-grow-0 w-full">
          <Link
            to={`/${_id}`}
            className="flex items-center justify-center w-full"
          >
            <img
              src="https://source.unsplash.com/random"
              alt="User Profile"
              className="w-12 h-12 rounded-full"
            />
          </Link>
        </div>
      </div>
      <div className="pb-3 flex flex-col justify-center flex-grow-1 w-full">
        <div className="flex items-start mb-1">
          <div id="user-name">
            <Link to={`/${_id}`}>
              <p>
                <span className="text-base leading-6 font-bold font text-black">
                  {name}
                </span>
                <span className="ml-1 text-gray-500">{`@${username}`}</span>
              </p>
            </Link>
          </div>
          <div
            id="dot-break"
            className="flex-shrink-0 font-normal text-sm px-1"
          >
            .
          </div>
          <div id="date">
            <span className="text-gray-500">
              {new Date(createdAt).toLocaleString("default", {
                dateStyle: "long"
              })}
            </span>
          </div>
        </div>
        <div id="tweet-info" className="flex flex-col w-full">
          <div id="tweet-text" className="w-full">
            <p>{text}</p>
          </div>
          <div
            id="tweet-affiliation"
            className="max-w-md flex justify-between items-center w-full pt-2"
          >
            <div
              id="comment"
              className="flex text-center items-center hover:text-blue cursor-pointer"
            >
              <div className="max-w-12 group flex items-center text-gray-500 text-base leading-6 font-medium rounded-full">
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
              <div className="px-3 cursor-pointer">
                <span className="cursor-pointer">{commentsCount}</span>
              </div>
            </div>

            <div
              id="retweet"
              className="flex text-center items-center cursor-pointer"
            >
              <div className="max-w-12 group flex items-center text-gray-500 text-base leading-6 font-medium rounded-full">
                <svg
                  className="text-center h-5 w-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="gray"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                  </g>
                </svg>
              </div>
              <div className="px-3 cursor-pointer">
                <span>{retweetsCount}</span>
              </div>
            </div>

            <div
              id="like"
              className="flex text-center items-center cursor-pointer"
            >
              <div className="max-w-12 group flex items-center text-gray-500 text-base leading-6 font-medium rounded-full hover:text-blue-300">
                <svg
                  className="text-center h-5 w-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="gray"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                  </g>
                </svg>
              </div>
              <div className="px-3 cursor-pointer">
                <span>{likesCount}</span>
              </div>
            </div>
            <div id="share" className="text-center cursor-pointer">
              <div className="max-w-12 group flex items-center text-gray-500 text-base leading-6 font-medium rounded-full  hover:text-blue-300">
                <svg
                  className="text-center h-5 w-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="gray"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                    <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
