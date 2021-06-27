import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getFollowers,
  getFollowings,
  getUser
} from "../../../redux/actions/userAction";
import TweetsList from "./TweetsList";
import Spinner from "../../layout/Spinner";

const Profile = ({ id }) => {
  const user = useSelector(state => state.user.user);
  const followersData = useSelector(state => state.user.followers);
  const followingsData = useSelector(state => state.user.followings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) document.title = user.username;

    dispatch(getUser(id));
    dispatch(getFollowers(id));
    dispatch(getFollowings(id));
  }, [id]);

  return user && followersData && followingsData ? (
    <section
      className="w-2/5 border-r-2 border-gray-200"
      style={{ marginLeft: "calc(20% + 8rem - 4px)" }}
    >
      <div>
        <div className="flex justify-start">
          <div className="px-4 py-2 mx-2">
            <Link
              to=""
              className=" text-2xl font-medium rounded-full text-blue-400 hover:bg-gray-800 hover:text-blue-300 float-right"
            >
              <svg
                className="m-2 h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <g>
                  <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                </g>
              </svg>
            </Link>
          </div>
          <div className="mx-2 flex items-center justify-center">
            <h2 className="mb-0 text-xl font-bold text-black">{user.name}</h2>
          </div>
        </div>

        <hr className="border-gray-800" />
      </div>
      <div>
        <div
          className="w-full bg-cover bg-no-repeat bg-center"
          style={{
            height: "200px",
            backgroundImage:
              "url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200)"
          }}
        >
          <img
            className="opacity-0 w-full h-full"
            src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200"
            alt=""
          />
        </div>
        <div className="p-4">
          <div className="relative flex w-full">
            <div className="flex flex-1">
              <div style={{ marginTop: "-6rem" }}>
                <div
                  style={{ height: "9rem", width: "9rem" }}
                  className="md rounded-full relative avatar"
                >
                  <img
                    style={{ height: "9rem", width: "9rem" }}
                    className="md rounded-full relative border-4 border-gray-900"
                    src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                    alt=""
                  />
                  <div className="absolute"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring   max-w-max border bg-transparent border-blue text-blue hover:bg-blue hover:bg-opacity-10 items-center font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="space-y-1 justify-center w-full mt-3 ml-3">
            <div className="flex flex-col items-start mb-3.5">
              <h2 className="text-xl leading-6 font-bold text-black">
                {user.name}
              </h2>
              <p className="text-sm leading-5 font-medium text-gray-600">
                @{user.username}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-black leading-tight mb-2">{user.bio}</p>
              <div className="text-gray-600 flex items-center gap-3">
                {/* Location */}
                {user.location && (
                  <span
                    className="flex mr-2"
                    style={{ color: "rgb(83, 100, 113)" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <g>
                        <path d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"></path>
                        <path d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.163 0 .327-.053.465-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"></path>
                      </g>
                    </svg>{" "}
                    <span className="leading-5 ml-1">My Location</span>
                  </span>
                )}
                {/* Website */}
                {user.website && (
                  <span
                    className="flex mr-2"
                    style={{ color: "rgb(83, 100, 113)" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <g>
                        <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                        <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
                      </g>
                    </svg>{" "}
                    <Link to="/" className="text-blue">
                      My Website
                    </Link>
                  </span>
                )}
                {/* Joined */}
                <span
                  className="flex mr-2"
                  style={{ color: "rgb(83, 100, 113)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <g>
                      <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                      <circle cx="7.032" cy="8.75" r="1.285"></circle>
                      <circle cx="7.032" cy="13.156" r="1.285"></circle>
                      <circle cx="16.968" cy="8.75" r="1.285"></circle>
                      <circle cx="16.968" cy="13.156" r="1.285"></circle>
                      <circle cx="12" cy="8.75" r="1.285"></circle>
                      <circle cx="12" cy="13.156" r="1.285"></circle>
                      <circle cx="7.032" cy="17.486" r="1.285"></circle>
                      <circle cx="12" cy="17.486" r="1.285"></circle>
                    </g>
                  </svg>{" "}
                  <span className="leading-5 ml-1">
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleString("default", {
                      month: "long",
                      year: "numeric"
                    })}
                  </span>
                </span>
              </div>
            </div>
            <div className="pt-3 flex justify-start items-start w-full">
              <Link
                to="/following"
                className="text-center pr-3 hover:underline"
              >
                <span className="font-bold ">
                  {followingsData && followingsData.length}
                </span>
                <span className="text-gray-500"> Following</span>
              </Link>
              <Link to="/follower" className="text-center px-3 hover:underline">
                <span className="font-bold ">
                  {followersData && followersData.length}
                </span>
                <span className="text-gray-500"> Followers</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full text-gray-600 font-bold px-1 border-b-2 border-gray-200">
          <div className="cursor-pointer flex-1 flex pt-4 pb-2 justify-center hover:text-blue hover:bg-blue hover:bg-opacity-10">
            <span>Tweets</span>
          </div>
          <div className="cursor-pointer flex-1 flex pt-4 pb-4 justify-center hover:text-blue hover:bg-blue hover:bg-opacity-10">
            <span>Tweets & replies</span>
          </div>
          <div className="cursor-pointer flex-1 flex pt-4 pb-4 justify-center hover:text-blue hover:bg-blue hover:bg-opacity-10">
            <span>Media</span>
          </div>
          <div className="cursor-pointer flex-1 flex pt-4 pb-4 justify-center hover:text-blue hover:bg-blue hover:bg-opacity-10">
            <span>Likes</span>
          </div>
        </div>
      </div>
      <TweetsList id={id} />
    </section>
  ) : (
    <div className="mt-4 w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Profile;
