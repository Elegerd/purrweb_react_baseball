import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import customStyles from "./customSelectStyle";
import "./customSelect.css";

const CustomSelect = ({
  input,
  title,
  placeholder,
  meta,
  isSearchable = false,
  isMulti = false,
  ...rest
}) => {
  return (
    <div className="custom-base-select">
      <div className="custom-base-select__container">
        <div className="custom-base-select__input">
          <Select
            styles={customStyles}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isMulti={isMulti}
            {...input}
            {...rest}
          />
          <label className="custom-base-select__label">{placeholder}</label>
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

CustomSelect.propTypes = {
  input: PropTypes.object,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
};

export default CustomSelect;
