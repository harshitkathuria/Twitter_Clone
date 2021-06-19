import React from "react";

const Home = () => {
  return (
    <div className="flex h-screen pb-12">
      <div className="img-background">
        <img
          className="h-full"
          src="https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png"
          alt="Showcase Image"
        />
      </div>
      <div className="content w-2/4 p-9 h-full flex-grow">
        <div className="flex flex-col justify-center h-full">
          <div className="flex flex-col justify-start">
            <div className="logo">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-blue"
                fill="currentColor"
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="heading-xl text-black">Happening Now</h1>
            </div>
            <div>
              <h3 className="text-3xl font-medium text-black">
                Join Twitter Today
              </h3>
            </div>
            <div className="join-buttons flex flex-col">
              <button className="bg-blue text-white w-48 mt-5 hover:bg-blue hover:bg-opacity-90 font-bold py-2 px-4 rounded-full">
                Sign Up
              </button>
              <button className="bg-white text-blue w-48 border-2 border-blue mt-5 hover:bg-blue hover:bg-opacity-10 font-bold py-2 px-4 rounded-full">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
