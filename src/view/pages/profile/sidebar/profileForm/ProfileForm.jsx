import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-final-form";
import {
  positionOptions,
  schoolYearOptions,
  throwAndBatOptions,
} from "@constants";
import MainProfileBlock from "./mainProfileBlock/MainProfileBlock";
import PersonalProfileBlock from "./personalProfileBlock/PersonalProfileBlock";
import SchoolProfileBlock from "./schoolProfileBlock/SchoolProfileBlock";
import FacilityProfileBlock from "./facilityProfileBlock/FacilityProfileBlock";
import AboutProfileBlock from "./aboutProfileBlock/AboutProfileBlock";
import { updateProfile } from "@ducks/profile/routines";
import { getProfileIsRequesting } from "@ducks/profile/selector";
import { setProfileValidField, getDefaultValue } from "@helpers/utilities";
import PropTypes from "prop-types";
import "./profileForm.css";

const ProfileForm = ({
  profile,
  teams,
  facilities,
  schools,
  onChangeIsEditing,
  onClickCancel = () => {},
}) => {
  const dispatch = useDispatch();
  const isRequesting = useSelector(getProfileIsRequesting);

  const onSubmit = (values) => {
    const profile = setProfileValidField({ ...values });
    const callback = () => onChangeIsEditing(false);
    dispatch(updateProfile({ profile, callback }));
  };
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    setDefaultValues({
      ...defaultValues,
      throws_hand: getDefaultValue(throwAndBatOptions, profile.throws_hand),
      bats_hand: getDefaultValue(throwAndBatOptions, profile.bats_hand),
      school_year: getDefaultValue(schoolYearOptions, profile.school_year),
      position: getDefaultValue(positionOptions, profile.position),
      position2: getDefaultValue(positionOptions, profile.position2),
    });
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, errors }) => {
        return (
          <form className="edit-profile" onSubmit={handleSubmit}>
            <MainProfileBlock profile={profile} defaultValues={defaultValues} />
            <PersonalProfileBlock
              profile={profile}
              defaultValues={defaultValues}
            />
            <SchoolProfileBlock
              profileSchool={profile.school ? profile.school : undefined}
              schools={schools}
              profileTeams={profile.teams}
              teams={teams}
              defaultValues={defaultValues}
            />
            <FacilityProfileBlock
              profileFacilities={profile.facilities}
              facilities={facilities}
            />
            <AboutProfileBlock profile={profile} />
            {Object.keys(errors).length ? (
              <span className="error">* Fill out the required fields</span>
            ) : null}
            <div className="edit-profile__buttons">
              <button className="button-cancel" onClick={onClickCancel}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isRequesting}
                className="button-save"
              >
                {isRequesting ? (
                  <ReactLoading
                    delay={1}
                    className="spinner"
                    type={"spinningBubbles"}
                    height={"15px"}
                    width={"15px"}
                    color={"#FFF"}
                  />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

ProfileForm.propTypes = {
  profile: PropTypes.object,
  onClickCancel: PropTypes.func,
  onChangeIsEditing: PropTypes.func,
  schools: PropTypes.array,
  teams: PropTypes.array,
  facilities: PropTypes.array,
};

export default ProfileForm;
