import React from "react";
import { useSelector } from "react-redux";
import { BaseballCloud } from "@commonComponents/svg";
import { TriangularArrow } from "@commonComponents/svg";
import { Link } from "react-router-dom";
import { getProfile } from "@ducks/profile/selector";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import HeaderMenu from "./headerMenu/HeaderMenu";
import "./header.css";

const Header = () => {
  const profile = useSelector(getProfile);

  return (
    <header id={"header"} className={"header"}>
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
                    overlay={() => <HeaderMenu />}
                    text={`${profile.first_name} ${profile.last_name}`}
                    buttonClass={"dropdown-panel__button"}
                    arrowContainerClass={"dropdown-panel__arrow"}
                    arrowComponent={TriangularArrow}
                    popupContainerId={"header"}
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
