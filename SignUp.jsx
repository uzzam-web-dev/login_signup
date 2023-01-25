/** @format */

import React, { useState } from "react";
import mailIcon from "../public/mail.png";
import passIcon from "../public/padlock.png";
import fbIcon from "../public/facebook.png";
import twitterIcon from "../public/twitter.png";
import gitHubIcon from "../public/github.png";
import { auth } from "../firebase/clientApp";
import {
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const SignUp = ({ showLogin, startLoader }) => {
  // STATES
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // FUNCTIONS
  // SIGN UP USER USING EMAIL PASSWORD
  const signUpUser = () => {
    if (email === "" || password === "" || confirmPassword === "") {
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

    if (password !== confirmPassword) {
      showError("Passwords don't match");
      return;
    }

    startLoader();
    setPersistence(auth, browserLocalPersistence).then(() => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          startLoader();
        })
        .catch((e) => {
          showError(e.message);
          startLoader();
        });
    });
  };

  // LOGIN USING GITHUB
  const signUpUsingGitHub = () => {
    startLoader();
    setPersistence(auth, browserLocalPersistence).then(() => {
      const provider = new GithubAuthProvider();
      return signInWithPopup(auth, provider)
        .then((result) => {
          startLoader();
        })
        .catch((error) => {
          startLoader();
        });
    });
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

  return (
    <div className="flex flex-col items-center justify-start flex-1 w-full h-full pt-5 text-black">
      <h1 className="text-3xl font-bold text-center text-black">Signup</h1>

      <div className="flex flex-col items-center justify-start w-full mt-5">
        {/* EMAIL */}
        <span className="w-full text-sm font-semibold text-gray-600">
          Email
        </span>
        <div className="flex flex-row items-center justify-start w-full pb-1 mt-2 border-b-2">
          <img src={mailIcon.src} alt="email icon" className="w-5 h-5 mr-2" />
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
          <img src={passIcon.src} alt="email icon" className="w-5 h-5 mr-2" />
          <input
            type="text"
            className="outline-none text-[#d03dd0] font-semibold"
            placeholder="Type your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <span className="w-full mt-4 text-sm font-semibold text-gray-600">
          Confirm Password
        </span>
        <div className="flex flex-row items-center justify-start w-full pb-1 mt-2 border-b-2">
          <img src={passIcon.src} alt="email icon" className="w-5 h-5 mr-2" />
          <input
            type="text"
            className="outline-none text-[#d03dd0] font-semibold"
            placeholder="Retype your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* ERROR MESSAGE */}
        <span
          className={`text-[#FF0000] text-sm font-mono mt-3 font-semibold ${
            error ? "visible" : "invisible"
          }`}
        >
          {errorMessage}
        </span>

        {/* LOGIN BUTTON */}
        <button
          className="w-full py-2 mt-4 font-semibold text-gray-100 bg-black rounded-3xl hover:bg-[#d02dd0] duration-300"
          onClick={signUpUser}
        >
          Signup
        </button>

        {/* OTHER SIGNUP OPTIONS */}
        <span className="mt-6 text-sm font-semibold text-gray-600">
          Or Sign Up Using
        </span>
        <div className="flex flex-row items-center justify-center gap-3 mt-3">
          <div>
            <img
              src={fbIcon.src}
              className="w-10 h-10 cursor-pointer"
              alt="Facebook Login"
            />
          </div>
          <div>
            <img
              src={twitterIcon.src}
              className="w-10 h-10 cursor-pointer"
              alt="Twitter Login"
            />
          </div>
          <div onClick={signUpUsingGitHub}>
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
          onClick={showLogin}
        >
          Already have an account? Login now
        </span>
      </div>
    </div>
  );
};

export default SignUp;
