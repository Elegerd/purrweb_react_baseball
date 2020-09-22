import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@ducks/auth/routines";
import { BaseballCloud } from "@commonComponents/svg";
import { TriangularArrow } from "@commonComponents/svg";
import { Link } from "react-router-dom";
import { getProfile } from "@ducks/profile/profileSelector";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
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

  const renderMenuHeader = () => (
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
                  <ButtonDropdown
                    trigger={["click"]}
                    overlay={renderMenuHeader()}
                    text={`${profile.first_name} ${profile.last_name}`}
                    buttonClass={"dropdown-panel__button"}
                    arrowContainerClass={"dropdown-panel__arrow"}
                    arrowComponent={TriangularArrow}
                  />
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
