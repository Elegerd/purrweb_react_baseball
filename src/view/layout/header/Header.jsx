import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@routines/authRoutines";
import { ReactComponent as BaseballCloud } from "@assets/svg/baseballCloud.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow.svg";
import { Link } from "react-router-dom";
import { getProfile } from "@selectors/profileSelector";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import "./header.css";

const Header = () => {
  const history = useHistory();
  const profile = useSelector(getProfile);
  const dispatch = useDispatch();

  const handleOnClickLogOut = (v) => {
    dispatch(signOut());
  };

  const handleOnClickProfile = (v) => {
    history.push("/profile");
  };

  const menuItems = [
    <MenuItem
      onClick={handleOnClickProfile}
      className="dropdown-panel__item"
      key="1"
    >
      My Profile
    </MenuItem>,
    <MenuItem
      onClick={handleOnClickLogOut}
      className="dropdown-panel__item"
      key="2"
    >
      Log Out
    </MenuItem>,
  ];

  const menu = (
    <Menu selectable={false} className="dropdown-panel">
      {menuItems}
    </Menu>
  );

  return (
    <header className={"header"}>
      <div className={"header__logo-bs"}>
        <div className={"logo-bs"}>
          <Link to={"/profile"}>
            <BaseballCloud />
          </Link>
        </div>
      </div>
      {profile && (
        <div className="nav nav-header">
          <div className="nav-header__link">
            <nav>
              <Link to="/leaderboard"> Leaderboard </Link>
              <Link to="/network"> Network </Link>
            </nav>
          </div>
          <div className="nav-header__header-panel">
            <div className="header-panel">
              <div className="header-panel__container">
                <div className="header-panel__header-avatar">
                  <Link to="/profile">
                    <div
                      className="header-avatar"
                      alt={`User Photo - ${profile.first_name} ${profile.last_name}`}
                      style={{ backgroundImage: `url(${profile.avatar})` }}
                    />
                  </Link>
                </div>
                <div className="header-panel__dropdown-panel">
                  <Dropdown trigger={["click"]} overlay={menu}>
                    <button className="dropdown-panel__button">
                      {`${profile.first_name} ${profile.last_name}`}
                      <span className="dropdown-panel__arrow">
                        <Arrow />
                      </span>
                    </button>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {};

export default Header;
