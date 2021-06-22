import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/authAction";
import Logo from "./layout/Logo";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className="flex h-screen pb-12">
      <div className="img-background text-3xl relative">
        <img
          className="h-full"
          src="https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png"
          alt="Showcase"
        />
        <div className="logo absolute top-1/3 left-1/3 z-10">
          <Logo classes={"h-3/4 w-3/4 text-white"} />
        </div>
      </div>
      <div className="content w-2/4 p-9 h-full flex-grow">
        <div className="flex flex-col justify-center h-full">
          <div className="flex flex-col justify-start">
            <div className="logo">
              <Logo classes={"h-12 w-12 text-blue"} />
            </div>
            <div className="heading-xl text-black ">
              <h1 className="my-12">Happening Now</h1>
            </div>
            <div className="mb-8 text-3xl font-bold text-black">
              <h3>Join Twitter Today</h3>
            </div>
            <div className="join-buttons flex flex-col max-w-xs">
              <Link
                to="/signup"
                className="cursor-pointer outlint-none focus:outline-none bg-blue text-white w-full mt-5 hover:bg-blue hover:bg-opacity-90 font-bold py-2 px-4 rounded-full text-center"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="bg-white text-blue w-full border-2 border-blue mt-5 hover:bg-blue hover:bg-opacity-10 font-bold py-2 px-4 rounded-full text-center"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
