import React, { useState } from "react";
import { Arrow } from "@commonComponents/svg";
import Dropdown from "rc-dropdown";
import PropTypes from "prop-types";

const ButtonDropdown = ({
  text = "",
  arrowComponent: ArrowComponent = Arrow,
  arrowContainerClass = "",
  buttonClass = "",
  ...rest
}) => {
  const [visible, setVisible] = useState(false);

  const onVisibleChange = (visible) => setVisible(visible);

  const onOverlayClick = () => setVisible(false);

  return (
    <Dropdown
      {...rest}
      onVisibleChange={onVisibleChange}
      onOverlayClick={onOverlayClick}
    >
      <button className={buttonClass}>
        {text}
        <span
          style={{
            transform: visible ? "rotate(180deg)" : "inherit",
          }}
          className={arrowContainerClass}
        >
          <ArrowComponent />
        </span>
      </button>
    </Dropdown>
  );
};

ButtonDropdown.propTypes = {
  text: PropTypes.string,
  arrowComponent: PropTypes.elementType,
  arrowContainerClass: PropTypes.string,
  buttonClass: PropTypes.string,
};

export default ButtonDropdown;
