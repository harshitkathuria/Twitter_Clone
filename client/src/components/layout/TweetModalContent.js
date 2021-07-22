import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/alertAction";
import { createComment, createTweet } from "../../redux/actions/tweetAction";

const TweetModalContent = ({ header, classes, closeModal, tweetId }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const onChange = e => {
    setText(e.target.value);
  };

  const onUploadFile = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = () => {
      setImage(input.files[0]);
    };
  };

  const postTweet = () => {
    if (tweetId) dispatch(createComment(tweetId, text));
    else dispatch(createTweet({ text, media: image }));
    setText("");
    setImage(null);
    dispatch(setAlert("Your tweet was sent", "info"));
  };
  return (
    <>
      <div
        className={`flex border-b-2 border-gray-200 dark:border-gray-secondary ${classes}`}
      >
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl font-bold text-black dark:text-gray-primary">
            {!header ? "Home" : header}
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
            className=" bg-transparent text-black dark:text-gray-primary font-normal text-xl w-full focus:outline-none"
            rows="3"
            cols="50"
            placeholder="What's happening?"
            value={text}
            onChange={onChange}
            style={{ resize: false, overflow: "auto" }}
          />
        </div>
      </div>
      <div className="flex justify-end border-b-2 border-gray-200 dark:border-gray-secondary">
        <div className="flex w-64 px-2 justify-end">
          <div>
            <div className="flex text-center px-1 py-1 m-2">
              <div
                className="cursor-pointer mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-opacity-10 hover:bg-blue"
                onClick={onUploadFile}
              >
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
              onClick={postTweet}
              disabled={!text}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetModalContent;
