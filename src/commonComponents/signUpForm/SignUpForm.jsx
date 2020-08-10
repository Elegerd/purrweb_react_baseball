import React from "react";
import { connect } from "react-redux";
import { createForm } from "final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { signUp } from "@routines/authRoutines";
import PropTypes from "prop-types";
import "./signUpForm.css";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    const initialState = {};
    let inConstructor = true;
    this.form = createForm({ onSubmit: this.onSubmit });

    this.unsubscribe = this.form.subscribe(
      (formState) => {
        if (inConstructor) {
          initialState.formState = formState;
        } else {
          this.setState({ formState });
        }
      },
      { active: true, pristine: true, submitting: true, values: true }
    );

    this.unsubscribeFields = ["email", "password", "password_confirmation"].map(
      (fieldName) =>
        this.form.registerField(
          fieldName,
          (fieldState) => {
            if (inConstructor) {
              initialState[fieldName] = fieldState;
            } else {
              this.setState({ [fieldName]: fieldState });
            }
          },
          { value: true }
        )
    );

    this.state = initialState;
    inConstructor = false;
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribeFields.forEach((unsubscribe) => unsubscribe());
  }

  onSubmit(user) {
    const { signUp, role } = this.props;
    if (user.password === user.password_confirmation) signUp({ ...user, role });
  }

  render() {
    const { formState, email, password, password_confirmation } = this.state;
    const handleSubmit = (event) => {
      event.preventDefault();
      this.form.submit();
    };
    return (
      <form className="sign-form" onSubmit={handleSubmit}>
        <div className="sign-form__sf-input">
          <div className="sf-input__container">
            <input
              name="email"
              type="email"
              onBlur={() => email.blur()}
              onChange={(event) =>
                email.change(event.target.value || undefined)
              }
              onFocus={() => email.focus()}
              value={email.value || ""}
              placeholder="Email"
            />
          </div>
          <span className="sf-input__icon">
            <FontAwesomeIcon className="icon icon-user" icon={faUser} />
          </span>
        </div>
        <div className="sign-form__sf-input">
          <div className="sf-input__container">
            <input
              name="password"
              type="password"
              onBlur={() => password.blur()}
              onChange={(event) =>
                password.change(event.target.value || undefined)
              }
              onFocus={() => password.focus()}
              value={password.value || ""}
              placeholder="Password"
            />
          </div>
          <span className="sf-input__icon">
            <FontAwesomeIcon className="icon icon-lock" icon={faLock} />
          </span>
        </div>
        <div className="sign-form__sf-input">
          <div className="sf-input__container">
            <input
              name="password_confirmation"
              type="password"
              onBlur={() => password_confirmation.blur()}
              onChange={(event) =>
                password_confirmation.change(event.target.value || undefined)
              }
              onFocus={() => password_confirmation.focus()}
              value={password_confirmation.value || ""}
              placeholder="Confirm Password"
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
        <button type="submit" disabled={formState.submitting}>
          Sign Up
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => {
      dispatch(signUp(user));
    },
  };
};

SignUpForm.propTypes = {
  signUp: PropTypes.func,
  role: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUpForm);
