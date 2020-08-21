import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@routines/authRoutines";
import { ReactComponent as BaseballCloud } from "@assets/svg/baseballCloud.svg";
import { Link } from "react-router-dom";
import { getProfile } from "@selectors/profileSelector";
import "./header.css";

const Header = () => {
  const profile = useSelector(getProfile);
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };

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
              <a onClick={handleOnClick} style={{ cursor: "pointer" }}>
                Logout
              </a>
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
                <div className="header-panel__dropdown-panel"></div>
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
