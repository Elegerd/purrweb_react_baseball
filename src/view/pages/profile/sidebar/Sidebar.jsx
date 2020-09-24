import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolsData } from "@ducks/schools/routines";
import { fetchTeamsData } from "@ducks/teams/routines";
import { fetchFacilitiesData } from "@ducks/facilities/routines";
import { likeProfile } from "@ducks/profile/routines";
import { getSchools } from "@ducks/schools/selector";
import { getFacilities } from "@ducks/facilities/selector";
import { getTeams } from "@ducks/teams/selector";
import AvatarForm from "./avatarForm/AvatarForm";
import ProfileForm from "@view/pages/profile/sidebar/profileForm/ProfileForm";
import UserInfo from "./userInfo/UserInfo";
import PersonalInfo from "./personalInfo/PersonalInfo";
import SchoolInfo from "./schoolInfo/SchoolInfo";
import PropTypes from "prop-types";
import "./sidebar.css";

const Sidebar = ({ profile, isUserProfile }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const schools = useSelector(getSchools);
  const facilities = useSelector(getFacilities);
  const teams = useSelector(getTeams);

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchSchoolsData());
      dispatch(fetchTeamsData());
      dispatch(fetchFacilitiesData());
    }
  }, [isEditing]);

  const handleOnClickEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleOnClickLike = (e) => {
    e.preventDefault();
    const { id: profile_id, favorite } = profile;
    dispatch(likeProfile({ profile_id, favorite: !favorite }));
  };

  const handleOnClickCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const onChangeIsEditing = (value) => {
    setIsEditing(value);
  };

  return (
    <aside className="side-bar">
      {isEditing ? (
        <>
          <AvatarForm profile={profile} />
          <ProfileForm
            profile={profile}
            schools={schools}
            teams={teams}
            facilities={facilities}
            handleOnClickCancel={handleOnClickCancel}
            onChangeIsEditing={onChangeIsEditing}
          />
        </>
      ) : (
        <>
          <UserInfo
            profile={profile}
            isUserProfile={isUserProfile}
            onClickEdit={handleOnClickEdit}
            onClickLike={handleOnClickLike}
          />
          <PersonalInfo profile={profile} />
          <SchoolInfo profile={profile} />
        </>
      )}
    </aside>
  );
};

Sidebar.propTypes = {
  profile: PropTypes.object,
  isUserProfile: PropTypes.bool,
};

export default Sidebar;
