import React, { useState } from "react";
import SignUpForm from "./signUpForm/SignUpForm";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./signUp.css";

const SignUp = () => {
  const [role, setRole] = useState("player");

  const renderCheckSvg = () => {
    return (
      <span className="switch-role__check-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          viewBox="0 0 14 15"
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M6.116 10.884l5.482-5.482a.566.566 0 0 0 0-.804l-.91-.91a.566.566 0 0 0-.804 0l-4.17 4.17L3.83 5.972a.566.566 0 0 0-.803 0l-.91.91a.566.566 0 0 0 0 .804l3.196 3.197c.223.223.58.223.803 0zM13.714 3v8.571a2.572 2.572 0 0 1-2.571 2.572H2.57A2.572 2.572 0 0 1 0 11.57V3A2.572 2.572 0 0 1 2.571.429h8.572A2.572 2.572 0 0 1 13.714 3z"
          />
        </svg>
      </span>
    );
  };

  const renderPlayerBlock = () => (
    <div className="registration-note">
      <div className="registration-note__title">Players</div>
      <div className="registration-note__text">
        <p>
          Players have their own profile within the system and plan on having
          data collected.
        </p>
      </div>
    </div>
  );

  const renderScoutBlock = () => (
    <div className="registration-note">
      <div className="registration-note__title">Scouts</div>
      <div className="registration-note__text">
        <p>
          Coaches and scouts can view players in the system but do not have
          their own profile.
        </p>
      </div>
    </div>
  );

  const renderSwitchRole = () => (
    <div className="sign-up__switch-role">
      <button
        className={classNames("button switch-role__button", {
          "button-active": role === "player",
        })}
        type="button"
        onClick={() => setRole("player")}
      >
        {role === "player" && renderCheckSvg()}
        Sign Up as Player
      </button>
      <button
        className={classNames("button switch-role__button", {
          "button-active": role === "scout",
        })}
        type="button"
        onClick={() => setRole("scout")}
      >
        {role === "scout" && renderCheckSvg()}
        Sign Up as Scout
      </button>
    </div>
  );

  return (
    <div className="flex-container column sign-up">
      {renderSwitchRole()}
      {role === "player" && renderPlayerBlock()}
      {role === "scout" && renderScoutBlock()}
      <SignUpForm role={role} />
      <div className="sign-up__su-footer">
        <div className="su-footer__text">Already registered?</div>
        <Link className="si-footer__link" to="/login">
          Sign In
        </Link>
      </div>
    </div>
  );
};

SignUp.propTypes = {};

export default SignUp;
