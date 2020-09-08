import React from "react";
import PropTypes from "prop-types";
import "./customInput.css";

const CustomInput = ({ input, placeholder, title, meta, ...rest }) => {
  return (
    <div className="custom-input">
      <div className="custom-input__container">
        <div className="custom-input__input">
          <input title={title} placeholder={placeholder} {...input} {...rest} />
          <label className="custom-input__label">{placeholder}</label>
        </div>
        {meta.error && meta.touched ? (
          <span className="error">{`${title.replace("*", "")} ${
            meta.error
          }`}</span>
        ) : null}
      </div>
    </div>
  );
};

CustomInput.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  meta: PropTypes.object,
};

export default CustomInput;
