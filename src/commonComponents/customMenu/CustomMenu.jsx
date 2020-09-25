import React, { memo } from "react";
import Menu, { Item as MenuItem } from "rc-menu";
import PropTypes from "prop-types";

const CustomMenu = ({ items = [], onClick = () => {} }) => (
  <Menu selectable={false} onClick={onClick} className="dropdown-panel">
    {items.map((item) => (
      <MenuItem
        className="dropdown-panel__item"
        data-item={item.id}
        key={item.id}
      >
        {item.title}
      </MenuItem>
    ))}
  </Menu>
);

CustomMenu.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
};

export default memo(CustomMenu);
