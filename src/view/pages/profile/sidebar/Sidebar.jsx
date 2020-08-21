import React from "react";
import { ReactComponent as Age } from "@assets/svg/age.svg";
import { ReactComponent as Height } from "@assets/svg/height.svg";
import { ReactComponent as Weight } from "@assets/svg/weight.svg";
import { ReactComponent as Throws } from "@assets/svg/throws.svg";
import { ReactComponent as Bats } from "@assets/svg/bats.svg";
import { ReactComponent as Edit } from "@assets/svg/edit.svg";
import { firstLetterToUppercase } from "@helpers/utilities";
import PropTypes from "prop-types";
import "./sidebar.css";

const Sidebar = ({ profile }) => {
  const renderPersonalInfo = () => {
    const { age, feet, inches, weight, throws_hand, bats_hand } = profile;
    const renderItem = (title, value, Icon) => {
      return (
        <div className="personal-info__item">
          <span className="icon">
            <Icon />
          </span>
          <span>{title}</span>
          <span>{value}</span>
        </div>
      );
    };
    return (
      <div className="personal-info">
        <div className="personal-info__content">
          {renderItem("Age", age, Age)}
          {renderItem("Height", `${feet || 0} ft ${inches || 0} in`, Height)}
          {renderItem("Weight", `${weight || 0} lbs`, Weight)}
          {renderItem("Throws", firstLetterToUppercase(throws_hand), Throws)}
          {renderItem("Bats", firstLetterToUppercase(bats_hand), Bats)}
        </div>
      </div>
    );
  };

  const renderUserInfo = () => {
    const { avatar, first_name, last_name, position, position2 } = profile;
    return (
      <div className="user-info">
        <button className="edit-button">
          <span>
            <Edit />
          </span>
        </button>
        <div className="user-info__avatar">
          <div className="avatar__container">
            <div
              className="avatar"
              alt={`User Photo - ${first_name} ${last_name}`}
              style={{ backgroundImage: `url(${avatar})` }}
            />
          </div>
        </div>
        <div className="user-info__name-and-role">
          <div className="user-info__name">{`${first_name || ""} ${
            last_name || ""
          }`}</div>
          {position && (
            <div className="user-info__first-role">
              {firstLetterToUppercase(position)}
            </div>
          )}
          {position2 && (
            <div className="user-info__second-role">
              {firstLetterToUppercase(position2)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSchoolInfo = () => {
    const { school, school_year, teams, facilities, biography } = profile;
    const renderSchoolInfoItem = (title, value) => {
      return (
        <div className="school-info__item">
          <div className="item__title">{title}</div>
          <div className="item__value">{value}</div>
        </div>
      );
    };
    return (
      <div className="school-info">
        {school && renderSchoolInfoItem("School", school.name)}
        {school_year &&
          renderSchoolInfoItem(
            "School Year",
            firstLetterToUppercase(school_year)
          )}
        {teams && teams.length
          ? renderSchoolInfoItem("Team", teams[0].name)
          : null}
        {facilities && facilities.length
          ? renderSchoolInfoItem("Facility", facilities[0].u_name)
          : null}
        {biography && biography.length ? (
          <>
            <div className="school-info__about-title">
              <div>About</div>
            </div>
            <div className="school-info__about-value">{biography}</div>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <aside className="side-bar">
      {renderUserInfo()}
      {renderPersonalInfo()}
      {renderSchoolInfo()}
    </aside>
  );
};

Sidebar.propTypes = {
  profile: PropTypes.object,
};

export default Sidebar;
