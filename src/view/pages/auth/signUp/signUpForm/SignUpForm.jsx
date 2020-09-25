import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { signUp } from "@ducks/auth/routines";
import { required } from "@helpers/validators";
import { getAuthIsLoading } from "@ducks/auth/selector";
import PropTypes from "prop-types";
import "./signUpForm.css";

const SignUpForm = ({ role }) => {
  const isLoading = useSelector(getAuthIsLoading);
  const dispatch = useDispatch();

  const onSubmit = (user) => {
    if (user.password === user.password_confirmation)
      dispatch(signUp({ ...user, role }));
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (values.password_confirmation !== values.password) {
          errors.password_confirmation = "Passwords are not equal";
        }
        return errors;
      }}
      render={({ handleSubmit }) => (
        <form className="sign-form" onSubmit={handleSubmit}>
          <div className="sign-form__sf-input">
            <div className="sf-input__container">
              <Field
                name="email"
                type="email"
                validate={required}
                render={({ input, meta }) => (
                  <div>
                    <input placeholder="Email" {...input} />
                    {meta.error && meta.touched && (
                      <span className="error">{meta.error}</span>
                    )}
                  </div>
                )}
              />
            </div>
            <span className="sf-input__icon">
              <FontAwesomeIcon className="icon icon-user" icon={faUser} />
            </span>
          </div>
          <div className="sign-form__sf-input">
            <div className="sf-input__container">
              <Field
                name="password"
                type="password"
                validate={required}
                render={({ input, meta }) => (
                  <div>
                    <input placeholder="Password" {...input} />
                    {meta.error && meta.touched && (
                      <span className="error">{meta.error}</span>
                    )}
                  </div>
                )}
              />
            </div>
            <span className="sf-input__icon">
              <FontAwesomeIcon className="icon icon-lock" icon={faLock} />
            </span>
          </div>
          <div className="sign-form__sf-input">
            <div className="sf-input__container">
              <Field
                name="password_confirmation"
                type="password"
                validate={required}
                render={({ input, meta }) => (
                  <div>
                    <input placeholder="Confirm Password" {...input} />
                    {meta.error && meta.touched && (
                      <span className="error">{meta.error}</span>
                    )}
                  </div>
                )}
              />
            </div>
            <span className="sf-input__icon">
              <FontAwesomeIcon className="icon icon-check" icon={faCheck} />
            </span>
          </div>
          <div className="sign-form__terms_and_privacy">
            By clicking Sign Up, you agree to our
            <Link to="/legal/terms"> Terms of Service </Link> and
            <Link to="/legal/privacy"> Privacy Policy </Link>
          </div>
          <button type="submit" disabled={isLoading}>
            Sign Up
          </button>
        </form>
      )}
    />
  );
};

SignUpForm.propTypes = {
  role: PropTypes.string.isRequired,
};

export default memo(SignUpForm);
