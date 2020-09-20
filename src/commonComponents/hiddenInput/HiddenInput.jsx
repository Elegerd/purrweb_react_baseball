import React, { useState } from "react";
import { ReactComponent as Arrow } from "@assets/svg/arrow2.svg";
import PropTypes from "prop-types";
import "./hiddenInput.css";

const HiddenInput = ({
  arrowContainerClass = "",
  inputClass = "",
  ...input
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleOnFocus = (e) => {
    setIsFocus(true);
  };

  const handleOnBlur = (e) => {
    setIsFocus(false);
  };

  return (
    <div className={"hidden-input__container"}>
      <input
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        className={`hidden-input ${inputClass}`}
        {...input}
      />
      <span
        style={{
          transform: isFocus ? "rotate(180deg)" : "inherit",
        }}
        className={arrowContainerClass}
      >
        <Arrow />
      </span>
    </div>
  );
};

HiddenInput.propTypes = {
  inputClass: PropTypes.string,
  arrowContainerClass: PropTypes.string,
};

export default HiddenInput;
