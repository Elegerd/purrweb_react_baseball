import React from "react";
import PropTypes from "prop-types";
import "./customInput.css";

const CustomInput = ({ input, placeholder, ...rest }) => {
  return (
    <div className="custom-input">
      <div className="custom-input__container">
        <div className="custom-input__input">
          <input placeholder={placeholder} {...input} {...rest} />
          <label className="custom-input__label">{placeholder}</label>
        </div>
      </div>
    </div>
  );
};

CustomInput.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
};

export default CustomInput;
