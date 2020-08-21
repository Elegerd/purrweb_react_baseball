import React from "react";
import authViewImg from "@assets/img/authView.png";
import PropTypes from "prop-types";
import "./auth.css";

const Auth = ({ children }) => {
  return (
    <div
      className={"auth auth-view"}
      style={{ backgroundImage: `url(${authViewImg})` }}
    >
      <div className="auth-form">{children}</div>
    </div>
  );
};

Auth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Auth;
