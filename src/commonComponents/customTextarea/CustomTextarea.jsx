import React, { memo } from "react";
import PropTypes from "prop-types";
import "./customTextarea.css";

const CustomTextarea = ({ input, placeholder, ...rest }) => {
  return (
    <div className="custom-textarea">
      <div className="custom-textarea__container">
        <div className="custom-textarea__textarea">
          <textarea placeholder={placeholder} {...input} {...rest} />
          <label className="custom-textarea__label">{placeholder}</label>
        </div>
      </div>
    </div>
  );
};

CustomTextarea.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
};

export default memo(CustomTextarea);
