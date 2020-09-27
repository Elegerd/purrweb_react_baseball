import React, { memo } from "react";
import { signOut } from "@ducks/auth/routines";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Menu, { Item as MenuItem } from "rc-menu";

const HeaderMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnClickLogOut = (v) => {
    dispatch(signOut());
  };

  const handleOnClickProfile = (v) => {
    history.push("/profile");
  };

  return (
    <Menu selectable={false} className="dropdown-panel dropdown-header">
      <MenuItem
        onClick={handleOnClickProfile}
        className="dropdown-panel__item"
        key="1"
      >
        My Profile
      </MenuItem>
      <MenuItem
        onClick={handleOnClickLogOut}
        className="dropdown-panel__item"
        key="2"
      >
        Log Out
      </MenuItem>
    </Menu>
  );
};

export default memo(HeaderMenu);
