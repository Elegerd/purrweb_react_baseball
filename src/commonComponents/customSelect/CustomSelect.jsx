import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import customSelectStyle from "./customSelectStyle";
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
  const customSelectMultiStyle = useMemo(() => {
    return {
      input: (provided) => ({
        ...provided,
        color: "#667784",
        paddingLeft: isMulti ? "8px" : "0",
        marginLeft: isMulti ? "5px" : "0",
      }),
      valueContainer: (provided) => ({
        ...provided,
        minHeight: "38px",
        padding: "0",
        fontSize: "16px",
        fontWeight: "400",
        color: "#667784",
        paddingLeft: isMulti ? "0" : "16px",
        overflow: "hidden",
        cursor: "default",
      }),
    };
  }, [isMulti]);

  return (
    <div className="custom-base-select">
      <div className="custom-base-select__container">
        <div className="custom-base-select__input">
          <Select
            styles={{ ...customSelectMultiStyle, ...customSelectStyle }}
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

export default memo(CustomSelect);
