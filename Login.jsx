/** @format */

import React, { useState } from "react";
import mailIcon from "../public/mail.png";
import passIcon from "../public/padlock.png";
import fbIcon from "../public/facebook.png";
import twitterIcon from "../public/twitter.png";
import gitHubIcon from "../public/github.png";
import SignUp from "./SignUp";
import { auth } from "../firebase/clientApp";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { ThreeCircles } from "react-loader-spinner";

const Login = ({ closeLogin }) => {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // FUNCTIONS
  // LOGIN FUNCTION
  const login = () => {
    if (email === "" || password === "") {
      showError("Please fill all fields");
      return;
    }

    const checkEmailValidity =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );

    if (!checkEmailValidity) {
      showError("Please provide valid credentials");
      return;
    }
    setLoading(true);

    setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // closeLogin();
          setLoading(false);
        })
        .catch((e) => {
          showError(e.code);
          setLoading(false);
        });
    });
  };

  const startLoader = () => {
    setLoading(!loading);
  };

  // FORGOT PASSWORD FUNCTION
  const forgotPass = () => {
    console.log("Forgot password");
  };

  // LOGIN USING FB
  const loginUsingFb = () => {
    console.log("Login");
  };

  // LOGIN USING TWITTER
  const loginUsingTwitter = () => {
    console.log("Login");
  };

  // LOGIN USING GITHUB
  const loginUsingGitHub = () => {
    setLoading(true);
    setPersistence(auth, browserLocalPersistence).then(() => {
      const provider = new GithubAuthProvider();
      return signInWithPopup(auth, provider)
        .then((result) => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    });
  };

  // OPEN SIGNUP MODAL/SCREEN FUNCTION
  const openSignUpModal = () => {
    setShowSignUp(!showSignUp);
  };

  // SHOW ERROR FUNCTION
  const showError = (message) => {
    setErrorMessage(message);
    setError(true);
    setTimeout(() => {
      setErrorMessage("");
      setError(false);
    }, 3000);
  };

  // RETURN VIEW
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 border rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60">
      <div className="text-white bg-white rounded-md w-[50%] md:w-[35%] h-[85%] flex flex-col justify-center items-center relative py-8 px-12">
        {loading ? (
          <ThreeCircles
            height="100"
            width="100"
            color="#000"
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        ) : (
          <>
            <h1
              className="absolute flex items-center justify-center w-8 h-8 p-1 font-semibold text-black border-2 border-black rounded-full cursor-pointer top-4 right-4"
              onClick={closeLogin}
            >
              X
            </h1>

            {showSignUp ? (
              <SignUp showLogin={openSignUpModal} startLoader={startLoader} />
            ) : (
              <div className="flex flex-col items-center justify-start flex-1 w-full h-full pt-5 text-black">
                <h1 className="text-3xl font-bold text-center text-black">
                  Login
                </h1>

                <div className="flex flex-col items-center justify-start w-full mt-5">
                  {/* EMAIL */}
                  <span className="w-full text-sm font-semibold text-gray-600">
                    Email
                  </span>
                  <div className="flex flex-row items-center justify-start w-full pb-1 mt-2 border-b-2">
                    <img
                      src={mailIcon.src}
                      alt="email icon"
                      className="w-5 h-5 mr-2"
                    />
                    <input
                      type="text"
                      className="outline-none text-[#d03dd0] font-semibold"
                      placeholder="Type your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* PASSWORD */}
                  <span className="w-full mt-4 text-sm font-semibold text-gray-600">
                    Password
                  </span>
                  <div className="flex flex-row items-center justify-start w-full pb-1 mt-2 border-b-2">
                    <img
                      src={passIcon.src}
                      alt="email icon"
                      className="w-5 h-5 mr-2"
                    />
                    <input
                      type="text"
                      className="outline-none text-[#d03dd0] font-semibold"
                      placeholder="Type your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* ERROR MESSAGE */}
                  <span
                    className={`text-[#FF0000] text-sm font-mono mt-3 font-semibold text-center ${
                      error ? "visible" : "invisible"
                    }`}
                  >
                    {errorMessage}
                  </span>

                  {/* FORGOT PASSWORD */}
                  <div className="flex flex-row items-end justify-end w-full mt-3">
                    <span
                      className="font-semibold text-gray-600 cursor-pointer"
                      onClick={forgotPass}
                    >
                      Forgot password?
                    </span>
                  </div>
                  {/* LOGIN BUTTON */}
                  <button
                    className="w-full py-2 mt-4 font-semibold text-gray-100 bg-black rounded-3xl hover:bg-[#d02dd0] duration-300"
                    onClick={login}
                  >
                    Login
                  </button>

                  {/* OTHER SIGNUP OPTIONS */}
                  <span className="mt-6 text-sm font-semibold text-gray-600">
                    Or Login Using
                  </span>
                  <div className="flex flex-row items-center justify-center gap-3 mt-3">
                    <div onClick={loginUsingFb}>
                      <img
                        src={fbIcon.src}
                        className="w-10 h-10 cursor-pointer"
                        alt="Facebook Login"
                      />
                    </div>
                    <div onClick={loginUsingTwitter}>
                      <img
                        src={twitterIcon.src}
                        className="w-10 h-10 cursor-pointer"
                        alt="Twitter Login"
                      />
                    </div>
                    <div onClick={loginUsingGitHub}>
                      <img
                        src={gitHubIcon.src}
                        className="w-10 h-10 cursor-pointer"
                        alt="Github Login"
                      />
                    </div>
                  </div>

                  {/* CREATE ACCOUNT OPTIONS */}
                  <span
                    className="mt-6 text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={openSignUpModal}
                  >
                    Don't have an account? Create one
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
