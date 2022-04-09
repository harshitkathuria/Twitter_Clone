import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../redux/actions/alertAction";
import profilePicture from "../../assets/defaultProfile.jpg";

import Modal from "react-modal";

import {
  createComment,
  createRetweet,
  deleteRetweet,
  deleteTweet,
  likeTweet,
  unlikeTweet
} from "../../redux/actions/tweetAction";

const Tweet = ({ tweet }) => {
  const {
    _id: tweetId,
    userId: { _id, name, username },
    text,
    media,
    createdAt,
    likesCount,
    retweetsCount,
    commentsCount
  } = tweet;

  const [isModalOpen, setModalIsOpen] = useState(false);
  const [tweetText, setTweetText] = useState("");

  const user = useSelector(state => state.auth.user);
  const likes = useSelector(state => state.tweet.likes);
  const retweets = useSelector(state => state.tweet.retweets);

  const dispatch = useDispatch();

  const onChange = e => {
    setTweetText(e.target.value);
  };

  const postComment = () => {
    setModalIsOpen(false);
    dispatch(createComment(tweetId, tweetText));
    setTweetText("");
    dispatch(setAlert("Your tweet was sent", "info"));
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "rgb(0, 0, 0, 0.7)",
      zIndex: 100
    },
    content: {
      zIndex: 1000,
      height: "40%",
      width: "40%",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "15px",
      overflow: "hidden"
    }
  };

  const onLikeTweet = () => {
    dispatch(likeTweet(tweet));
  };
  const onUnlikeTweet = () => {
    dispatch(unlikeTweet(tweet));
  };

  const onCreateRetweet = () => {
    dispatch(createRetweet(tweetId));
  };
  const onDeleteRetweet = () => {
    dispatch(deleteRetweet(tweetId));
  };

  const onDeleteTweet = () => {
    dispatch(deleteTweet(tweetId));
    dispatch(setAlert("Your tweet was deleted", "success"));
  };

  // Should Create Retweet or Delete Retweet
  let inputProps = null;

  const arr =
    retweets && retweets.length > 0
      ? retweets.filter(
          retweet => retweet.tweetId && retweet.tweetId._id === tweetId
        )
      : [];
  if (arr.length > 0) {
    inputProps = {
      stroke: "rgb(23, 191, 99)",
      fill: "rgb(23, 191, 99)"
    };
  } else {
    inputProps = {
      stroke: "gray",
      fill: ""
    };
  }

  Modal.setAppElement(document.getElementById("root"));

  return (
    <div className="border-b-2 border-gray-200 dark:border-gray-secondary flex px-2 pt-3">
      <div className="flex flex-col flex-grow-0 flex-shrink-0 items-center mr-3">
        <div id="img-wrapper" className="flex flex-grow-0 w-full">
          <Link
            to={`/profile/${_id}`}
            className="flex items-center justify-center w-full"
          >
            <img
              src={
                user.profilePicture
                  ? require(`../../assets/users/${user.profilePicture}`).default
                  : profilePicture
              }
              alt="User Profile"
              className="w-12 h-12 rounded-full"
            />
          </Link>
        </div>
      </div>
      <div className="pb-3 flex flex-col justify-center flex-grow-1 w-full">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-start">
            <div id="user-name">
              <Link to={`/profile/${_id}`}>
                <p>
                  <span className="text-base leading-6 font-bold font text-black dark:text-gray-primary">
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
          {!(tweet.tweetId && tweet.text) && _id === user._id && (
            <div
              onClick={onDeleteTweet}
              id="delete"
              className="text-red-600 cursor-pointer font-semibold"
            >
              Delete
            </div>
          )}
        </div>
        <div id="tweet-info" className="flex flex-col w-full">
          {media && media != "null" && (
            <div id="tweet-media">
              <img
                src={media}
                alt="Media"
                className="max-h-40 mb-4 max-w-full"
              />
            </div>
          )}
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
              <div
                onClick={() => setModalIsOpen(true)}
                className="max-w-12 group flex items-center text-gray-500 text-base leading-6 font-medium rounded-full"
              >
                <Modal
                  isOpen={isModalOpen}
                  shouldCloseOnOverlayClick={true}
                  onRequestClose={() => setModalIsOpen(false)}
                  style={modalStyle}
                >
                  <div className="-m-1">
                    <div className="mb-2">
                      <h2 className="px-4 py-2 text-xl font-bold text-black">
                        <i
                          className="fas fa-times blue"
                          onClick={() => setModalIsOpen(false)}
                        ></i>
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="m-2 w-10 py-1">
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                        alt=""
                      />
                    </div>
                    <div className="flex-1 px-2 pt-2 mt-2">
                      <textarea
                        id="tweet-text"
                        className="bg-transparent text-black font-normal text-xl w-full focus:outline-none"
                        rows="3"
                        cols="50"
                        placeholder="What's happening?"
                        value={tweetText}
                        onChange={onChange}
                        style={{ resize: false, overflow: "auto" }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex w-64 px-2 justify-end">
                      <div>
                        <div className="flex text-center px-1 py-1 m-2">
                          <div className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-opacity-10 hover:bg-blue">
                            <svg
                              className="text-center h-7 w-6"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          id="tweet-btn"
                          className="focus:outline-none bg-blue mt-5 hover:bg-opacity-90 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
                          onClick={postComment}
                          disabled={!text}
                        >
                          Tweet
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal>
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
                  onClick={arr.length > 0 ? onDeleteRetweet : onCreateRetweet}
                  {...inputProps}
                  className="text-center h-5 w-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                {likes.filter(tweet => tweet._id === tweetId).length === 0 ? (
                  <i
                    onClick={onLikeTweet}
                    id="like"
                    className="far fa-heart"
                  ></i>
                ) : (
                  <i
                    onClick={onUnlikeTweet}
                    id="unlike"
                    style={{ color: "rgb(224, 36, 94)" }}
                    className="fas fa-heart"
                  ></i>
                )}
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
