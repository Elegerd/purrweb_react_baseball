import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import user from "@assets/img/user.png";
import { Search } from "@commonComponents/svg";
import Dropdown from "rc-dropdown";
import { fetchUserData } from "@ducks/users/routines";
import { getUsers, getUsersIsLoading } from "@ducks/users/selector";
import { getObjectById } from "@helpers/utilities";
import { topBattingType, topPitchingType, comparisonRows } from "@constants";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import CustomMenu from "@commonComponents/customMenu/CustomMenu";
import ReactLoading from "react-loading";
import Menu, { Item as MenuItem } from "rc-menu";
import ComparisonRow from "./comparisonRow/ComparisonRow";
import { profileDataRequest } from "@helpers/request/profileRequest";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./comparison.css";

const Comparison = ({ profile: viewedProfile }) => {
  const dispatch = useDispatch();
  const [profileName, setProfileName] = useState("");
  const [topType, setTopType] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const profileNames = useSelector(getUsers);
  const isLoadingProfileNames = useSelector(getUsersIsLoading);
  const avatarUrl = viewedProfile.avatar ? viewedProfile.avatar : user;

  useEffect(() => {
    const isPitcher = viewedProfile.position === "pitcher";
    setSelectedType(isPitcher ? topPitchingType[0] : topBattingType[0]);
    setTopType(
      isPitcher
        ? { field: "pitching_top_values", types: topPitchingType }
        : { field: "batting_top_values", types: topBattingType }
    );
  }, []);

  useEffect(() => {
    const player_name = profileName;
    dispatch(fetchUserData({ player_name }));
  }, [profileName]);

  const handleOnClickUser = async (e) => {
    const id = e.key;
    setProfileName(e.item.props["data-item"]);
    const {
      data: { profile },
    } = await profileDataRequest({ id });
    setSelectedProfile(profile);
  };

  const handleOnChangeProfileName = (e) => {
    setProfileName(e.target.value);
  };

  const handleOnClickType = (e) => {
    const type = getObjectById(topType.types, e.item.props["data-item"]);
    setSelectedType(type);
  };

  const renderMenuUsers = useCallback(
    () => (
      <Menu
        selectable={false}
        onClick={handleOnClickUser}
        className="dropdown-panel"
      >
        {profileNames.map((item) => {
          const fullName = `${item.first_name} ${item.last_name}`;
          return (
            <MenuItem
              className="dropdown-panel__item"
              data-item={fullName}
              key={item.id}
            >
              {fullName}
            </MenuItem>
          );
        })}
      </Menu>
    ),
    [profileNames]
  );

  const renderInput = useCallback(
    () => (
      <div className="rp-search">
        <div className="rp-search__input">
          <input
            value={profileName}
            name="compared_user"
            onChange={handleOnChangeProfileName}
            placeholder="Enter player name"
          />
        </div>
        <div className="rp-search__icon">
          <span>
            <Search />
          </span>
        </div>
      </div>
    ),
    [profileName]
  );

  return (
    <div className="comparison__container">
      <div className="comparison">
        <div className="comparison__header">
          <div className="c-header__left-profile">
            <div className="c-header__avatar">
              <div
                alt={`User Photo - ${viewedProfile.first_name} ${viewedProfile.last_name}`}
                style={{ backgroundImage: `url(${avatarUrl})` }}
              />
            </div>
            <button className="left-profile__button">{`${viewedProfile.first_name} ${viewedProfile.last_name}`}</button>
          </div>
          <div className="c-header__right-profile">
            {isLoadingProfileNames && (
              <div className="right-profile__spinner">
                <ReactLoading
                  delay={1}
                  className="spinner"
                  type={"bubbles"}
                  height={"30px"}
                  width={"30px"}
                  color={"#48bbff"}
                />
              </div>
            )}
            <div className="c-header__avatar">
              <div style={{ backgroundImage: `url(${user})` }} />
            </div>
            <Dropdown
              overlayClassName={classNames("dropdown-comparison", {
                "dropdown-comparison__hidden": !profileNames.length,
              })}
              trigger={["click"]}
              overlay={renderMenuUsers()}
            >
              {renderInput()}
            </Dropdown>
          </div>
        </div>
        <div className="comparison__content">
          <div className="comparison-age comparison-row">
            <div>Age:&nbsp;&nbsp; {viewedProfile.age || "-"}</div>
            <div>
              Age:&nbsp;&nbsp; {selectedProfile ? selectedProfile.age : "-"}
            </div>
          </div>
          <div className="comparison-height comparison-row">
            <div>
              Height:&nbsp;&nbsp;{" "}
              {`${viewedProfile.feet || 0} ft ${
                viewedProfile.inches || 0
              } in` || "-"}
            </div>
            <div>
              Height:&nbsp;&nbsp;{" "}
              {selectedProfile
                ? `${selectedProfile.feet || 0} ft ${selectedProfile.inches} in`
                : "-"}
            </div>
          </div>
          <div className="comparison-weight comparison-row">
            <div>
              Weight:&nbsp;&nbsp; {`${viewedProfile.weight} lbs` || "-"}
            </div>
            <div>
              Weight:&nbsp;&nbsp;{" "}
              {selectedProfile ? `${selectedProfile.weight} lbs` : "-"}
            </div>
          </div>
          <div className="top-batting-values">
            <div>
              <div className="top-batting-values__container">
                <div className="tbv-actions">
                  <ButtonDropdown
                    trigger={["click"]}
                    overlay={() => (
                      <CustomMenu
                        items={topType ? topType.types : []}
                        onClick={handleOnClickType}
                      />
                    )}
                    text={`Top Batting Values ${
                      selectedType ? ` - ${selectedType.title}` : ""
                    }`}
                    buttonClass={"tbv-actions__button"}
                    arrowContainerClass={"log-search__arrow"}
                  />
                </div>
              </div>
              <div className="top-batting-values__table">
                <div className="tbv-table">
                  {comparisonRows.map((item, index) => (
                    <ComparisonRow
                      key={index}
                      title={item}
                      viewedProfile={viewedProfile}
                      selectedProfile={selectedProfile}
                      topType={topType}
                      selectedType={selectedType}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comparison.propTypes = {
  profile: PropTypes.object,
};

export default Comparison;
