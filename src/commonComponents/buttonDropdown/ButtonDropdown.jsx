import React, { memo, useState } from "react";
import { Arrow } from "@commonComponents/svg";
import Dropdown from "rc-dropdown";
import PropTypes from "prop-types";

const ButtonDropdown = ({
  text = "",
  arrowComponent: ArrowComponent = Arrow,
  arrowContainerClass = "",
  buttonClass = "",
  popupContainerId = "container",
  ...rest
}) => {
  const [visible, setVisible] = useState(false);

  const onVisibleChange = (visible) => setVisible(visible);

  const onOverlayClick = () => setVisible(false);

  return (
    <Dropdown
      {...rest}
      animation={"slide-up"}
      onVisibleChange={onVisibleChange}
      onOverlayClick={onOverlayClick}
      getPopupContainer={() => document.getElementById(popupContainerId)}
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
  popupContainerId: PropTypes.string,
  text: PropTypes.string,
  arrowComponent: PropTypes.elementType,
  arrowContainerClass: PropTypes.string,
  buttonClass: PropTypes.string,
};

export default memo(ButtonDropdown);
