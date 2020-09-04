import React, { useEffect, useState } from "react";
import { ReactComponent as Age } from "@assets/svg/age.svg";
import { ReactComponent as Height } from "@assets/svg/height.svg";
import { ReactComponent as Weight } from "@assets/svg/weight.svg";
import { ReactComponent as Throws } from "@assets/svg/throws.svg";
import { ReactComponent as Bats } from "@assets/svg/bats.svg";
import { ReactComponent as Edit } from "@assets/svg/edit.svg";
import { letterToUppercase } from "@helpers/utilities";
import {
  facilitiesRequest,
  schoolsRequest,
  teamsRequest,
} from "@helpers/dataRequest";
import AvatarForm from "../avatarForm/AvatarForm";
import ProfileForm from "@view/pages/profile/profileForm/ProfileForm";
import PropTypes from "prop-types";
import "./sidebar.css";

const Sidebar = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [teams, setTeams] = useState([]);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    if (isEditing)
      (async () => {
        try {
          const promises = [
            schoolsRequest({}),
            teamsRequest({}),
            facilitiesRequest({}),
          ];
          setIsLoading(true);
          const response = await Promise.all(promises);
          setSchools(response[0]);
          setTeams(response[1]);
          setFacilities(response[2]);
          setIsLoading(false);
        } catch (e) {
          console.error(e);
        }
      })();
  }, [isEditing]);

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
          {renderItem("Throws", letterToUppercase(throws_hand), Throws)}
          {renderItem("Bats", letterToUppercase(bats_hand), Bats)}
        </div>
      </div>
    );
  };

  const renderUserInfo = () => {
    const { avatar, first_name, last_name, position, position2 } = profile;
    return (
      <div className="user-info">
        <button className="edit-button" onClick={handleOnClickEdit}>
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
              {letterToUppercase(position)}
            </div>
          )}
          {position2 && (
            <div className="user-info__second-role">
              {letterToUppercase(position2)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleOnClickEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleOnClickCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const onChangeIsEditing = (value) => {
    setIsEditing(value);
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
          renderSchoolInfoItem("School Year", letterToUppercase(school_year))}
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
      {isEditing ? (
        <>
          <AvatarForm profile={profile} />
          <ProfileForm
            profile={profile}
            isLoading={isLoading}
            schools={schools}
            teams={teams}
            facilities={facilities}
            handleOnClickCancel={handleOnClickCancel}
            onChangeIsEditing={onChangeIsEditing}
          />
        </>
      ) : (
        <>
          {renderUserInfo()}
          {renderPersonalInfo()}
          {renderSchoolInfo()}
        </>
      )}
    </aside>
  );
};

Sidebar.propTypes = {
  profile: PropTypes.object,
};

export default Sidebar;
