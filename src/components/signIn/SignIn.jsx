import React from "react";
import SignInForm from "@commonComponents/signInForm/SignInForm";
import { Link } from "react-router-dom";
import "./signIn.css";

const SignIn = () => {
  return (
    <div className="flex-container column sign-in">
      <div className="sign-in__si-header">
        <div className="si-header__title">Welcome to BaseballCloud!</div>
        <div className="si-header__subtitle">Sign into your account here:</div>
      </div>
      <SignInForm />
      <div className="sign-in__si-footer">
        <div className="si-footer__text">Don’t have an account?</div>
        <Link className="si-footer__link" to="/registration">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;
