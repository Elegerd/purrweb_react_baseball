import React from "react";
import { createForm } from "final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./signInForm.css";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

class SignInForm extends React.Component {
  constructor() {
    super();
    const initialState = {};
    let inConstructor = true;
    this.form = createForm({ onSubmit });

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

    this.unsubscribeFields = ["email", "password"].map((fieldName) =>
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

  render() {
    const { formState, email, password } = this.state;
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
        <button type="submit" disabled={formState.submitting}>
          Sign In
        </button>
        <div className="sign-form__forgotten">
          <Link to="/forgotpassword">Forgotten password?</Link>
        </div>
      </form>
    );
  }
}

export default SignInForm;
