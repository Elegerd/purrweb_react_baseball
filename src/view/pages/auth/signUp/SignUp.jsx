import React, { useState } from "react";
import SignUpForm from "./signUpForm/SignUpForm";
import { Link } from "react-router-dom";
import { ReactComponent as Check } from "@assets/svg/check.svg";
import classNames from "classnames";
import "./signUp.css";

const SignUp = () => {
  const [role, setRole] = useState("player");

  const renderCheckSvg = () => {
    return (
      <span className="switch-role__check-svg">
        <Check />
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
