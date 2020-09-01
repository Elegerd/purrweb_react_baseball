import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "./customSelect.css";

const CustomSelect = ({
  input,
  placeholder,
  isSearchable = false,
  isMulti = false,
  ...rest
}) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      maxWidth: "100%",
      width: "100%",
      minHeight: "38px",
      "&:focus + .custom-base-select__label": {
        webkitTransform: "translate(6px, 0px) scale(0.8)",
        msTransform: "translate(6px, 0px) scale(0.8)",
        transform: "translate(6px, 0px) scale(0.8)",
        cursor: "pointer",
        visibility: "visible",
        background: "#fff",
        borderRadius: "4px",
      },
    }),
    control: (provided, { isFocused }) => ({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "100%",
      backgroundColor: isFocused ? "#fff" : "#eff1f3",
      borderColor: isFocused ? "#48bbff" : "transparent",
      border: `solid 1px ${isFocused ? "#48bbff" : "transparent"}`,
      minHeight: "38px",
      borderRadius: isFocused ? "4px 4px 0 0" : "4px",
      boxShadow: "0",
    }),
    indicatorsContainer: (provided, { selectProps }) => ({
      ...provided,
      minHeight: "38px",
      color: "#80919f",
      transform: selectProps.menuIsOpen ? "rotate(180deg)" : "inherit",
    }),
    dropdownIndicator: () => ({
      display: "flex",
      padding: "8px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    input: (provided, props) => {
      return {
        ...provided,
        color: "#667784",
        paddingLeft: isMulti ? "8px" : "0",
        marginLeft: isMulti ? "5px" : "0",
      };
    },
    placeholder: (provided, { isFocused }) => ({
      position: "absolute",
      right: "0",
      top: "0",
      bottom: "0",
      left: "0",
      paddingLeft: "16px",
      fontSize: "16px",
      lineHeight: "38px",
      fontWeight: "400",
      color: isFocused ? "#b0bac1" : "#667784",
      width: "auto",
      whiteSpace: "nowrap",
      overflow: "hidden",
      webkitTextOverflow: "ellipsis",
      textOverflow: "ellipsis",
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
    multiValue: (provided) => ({
      ...provided,
      display: "flex",
      flexDirection: "row-reverse",
      backgroundColor: "rgba(0,126,255,.08)",
      borderRadius: "2px",
      border: "1px solid rgba(0,126,255,.24)",
      lineHeight: "1.4",
      marginLeft: "5px",
      marginTop: "5px",
      verticalAlign: "top",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#007eff",
      fontSize: "18px",
      borderBottomRightRadius: "2px",
      borderTopRightRadius: "2px",
      cursor: "default",
      padding: "2px 5px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#007eff",
      fontSize: "18px",
      cursor: "pointer",
      borderBottomLeftRadius: "2px",
      borderTopLeftRadius: "2px",
      borderRight: "1px solid rgba(0,126,255,.24)",
      padding: "1px 5px 3px",
      display: "inherit",
      "&:hover": {
        backgroundColor: "rgba(0,113,230,.08)",
        color: "#0071e6",
      },
      "&:active": {
        backgroundColor: "rgba(0,126,255,.24)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 2,
    }),
    menuList: () => ({
      fontSize: "16px",
      lineHeight: "38px",
      fontWeight: "400",
      color: "#667784",
      overflowY: "overlay",
      maxHeight: "150px",
    }),
    option: (provided, { isOptionSelected }) => ({
      minHeight: "38px",
      backgroundColor: isOptionSelected ? "#e9f7ff" : "inherit",
      padding: "0 10px",
      margin: "2px 0",
      cursor: "default",
      "&:hover": {
        backgroundColor: "#e9f7ff",
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return {
        ...provided,
        opacity,
        transition,
        color: "#667784",
      };
    },
  };

  return (
    <div className="custom-base-select">
      <div className="custom-base-select__container">
        <div className="custom-base-select__input">
          <Select
            styles={customStyles}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isMulti={isMulti}
            valueRenderer={() => {}}
            {...input}
            {...rest}
          />
          <label className="custom-base-select__label">{placeholder}</label>
        </div>
      </div>
    </div>
  );
};

CustomSelect.propTypes = {
  input: PropTypes.object,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default CustomSelect;
