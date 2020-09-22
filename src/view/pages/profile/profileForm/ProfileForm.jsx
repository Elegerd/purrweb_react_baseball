import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { required } from "@helpers/validators";
import {
  positionOptions,
  schoolYearOptions,
  throwAndBatOptions,
} from "@constants";
import CustomInput from "@commonComponents/customInput/CustomInput";
import CustomTextarea from "@commonComponents/customTextarea/CustomTextarea";
import CustomSelect from "@commonComponents/customSelect/CustomSelect";
import { updateProfile } from "@ducks/profile/routines";
import { getProfileIsRequesting } from "@ducks/profile/selector";
import { getSchoolsIsLoading } from "@ducks/schools/selector";
import { getFacilitiesIsLoading } from "@ducks/facilities/selector";
import { getTeamsIsLoading } from "@ducks/teams/selector";
import { setProfileValidField } from "@helpers/utilities";
import PropTypes from "prop-types";
import "./profileForm.css";

const ProfileForm = ({
  profile,
  teams,
  facilities,
  schools,
  onChangeIsEditing,
  handleOnClickCancel = () => {},
}) => {
  const dispatch = useDispatch();
  const isLoadingSchool = useSelector(getSchoolsIsLoading);
  const isLoadingFacilities = useSelector(getFacilitiesIsLoading);
  const isLoadingTeams = useSelector(getTeamsIsLoading);
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

  useEffect(() => {
    if (!isLoadingFacilities)
      setDefaultValues((prevState) => ({
        ...prevState,
        facilities: getDefaultValues(facultyOptions, profile.facilities),
      }));
    if (!isLoadingSchool)
      setDefaultValues((prevState) => ({
        ...prevState,
        school: getDefaultValue(
          schoolOptions,
          profile.school ? profile.school.id : undefined
        ),
      }));

    if (!isLoadingTeams)
      setDefaultValues((prevState) => ({
        ...prevState,
        teams: getDefaultValues(teamOptions, profile.teams),
      }));
  }, [isLoadingFacilities, isLoadingSchool, isLoadingTeams]);

  const teamOptions = teams.map((team) => {
    return { value: team.id, label: team.name };
  });

  const schoolOptions = schools.map((school) => {
    return { value: school.id, label: school.name };
  });

  const facultyOptions = facilities.map((faculty) => {
    return { value: faculty.id, label: faculty.u_name };
  });

  const renderBlockTitle = (title) => (
    <div className="edit-profile__block-title">
      <div className="edit-profile__block-text">{title}</div>
    </div>
  );

  const getDefaultValues = (options = [], values = []) =>
    options.filter((option) =>
      values.map((value) => value.id).includes(option.value)
    );

  const getDefaultValue = (options, value) =>
    options.find((option) => option.value === value);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, errors }) => {
        return (
          <form className="edit-profile" onSubmit={handleSubmit}>
            <div className="edit-profile__names">
              <Field
                name="first_name"
                type="text"
                validate={required}
                defaultValue={profile.first_name}
                render={(props) => (
                  <CustomInput
                    placeholder={"First Name *"}
                    title={"First Name *"}
                    {...props}
                  />
                )}
              />
              <Field
                defaultValue={profile.last_name}
                name="last_name"
                type="text"
                validate={required}
                render={(props) => (
                  <CustomInput
                    placeholder={"Last Name *"}
                    title={"Last Name *"}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="edit-profile__position">
              <Field
                name="position"
                defaultValue={defaultValues.position}
                render={(props) => (
                  <CustomSelect
                    placeholder={"Position in Game *"}
                    title={"Position in Game *"}
                    options={positionOptions}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="edit-profile__position2">
              <Field
                name="position2"
                defaultValue={defaultValues.position2}
                render={(props) => (
                  <CustomSelect
                    placeholder={"Secondary Position in Game"}
                    options={[
                      { value: undefined, label: "-" },
                      ...positionOptions,
                    ]}
                    {...props}
                  />
                )}
              />
            </div>
            {renderBlockTitle("Personal Info")}
            <div className="edit-profile__age">
              <Field
                defaultValue={profile.age}
                name="age"
                validate={required}
                render={(props) => (
                  <CustomInput
                    type="number"
                    step="1"
                    min="0"
                    placeholder={"Age *"}
                    title={"Age *"}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="edit-profile__feet-and-inches">
              <div className="feet-and-inches__container">
                <Field
                  defaultValue={profile.feet}
                  name="feet"
                  validate={required}
                  render={(props) => (
                    <CustomInput
                      type="number"
                      step="1"
                      min="0"
                      placeholder={"Feet *"}
                      title={"Feet *"}
                      {...props}
                    />
                  )}
                />
                <Field
                  defaultValue={profile.inches}
                  name="inches"
                  validate={required}
                  render={(props) => (
                    <CustomInput
                      step="1"
                      min="0"
                      type="number"
                      placeholder={"Inches *"}
                      title={"Inches *"}
                      {...props}
                    />
                  )}
                />
              </div>
            </div>
            <div className="edit-profile__weight">
              <Field
                defaultValue={profile.weight}
                name="weight"
                validate={required}
                render={(props) => (
                  <CustomInput
                    type="number"
                    step="1"
                    min="1"
                    placeholder={"Weight *"}
                    title={"Weight *"}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="edit-profile__throws-and-bats">
              <div className="throws-and-bats__container">
                <Field
                  name="throws_hand"
                  validate={required}
                  defaultValue={defaultValues.throws_hand}
                  render={(props) => (
                    <CustomSelect
                      title={"Throws *"}
                      placeholder={"Throws *"}
                      options={throwAndBatOptions}
                      {...props}
                    />
                  )}
                />
                <Field
                  name="bats_hand"
                  validate={required}
                  defaultValue={defaultValues.bats_hand}
                  render={(props) => (
                    <CustomSelect
                      title={"Bats *"}
                      placeholder={"Bats *"}
                      options={throwAndBatOptions}
                      {...props}
                    />
                  )}
                />
              </div>
            </div>
            {renderBlockTitle("School")}
            <div className="edit-profile__school">
              <Field
                defaultValue={defaultValues.school}
                name="school"
                render={(props) => (
                  <CustomSelect
                    isLoading={isLoadingSchool}
                    isSearchable={true}
                    placeholder={"School"}
                    options={schoolOptions}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="edit-profile__school-year">
              <Field
                name="school_year"
                defaultValue={defaultValues.school_year}
                render={(props) => (
                  <CustomSelect
                    isSearchable={true}
                    placeholder={"School Year"}
                    options={schoolYearOptions}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="edit-profile__teams">
              <Field
                defaultValue={defaultValues.teams}
                name="teams"
                render={(props) => (
                  <CustomSelect
                    isLoading={isLoadingTeams}
                    isMulti={true}
                    isClearable={false}
                    isSearchable={true}
                    placeholder={"Team"}
                    options={teamOptions}
                    {...props}
                  />
                )}
              />
            </div>
            {renderBlockTitle("Facility")}
            <div className="edit-profile__facility">
              <Field
                defaultValue={defaultValues.facilities}
                name="facilities"
                render={(props) => (
                  <CustomSelect
                    isLoading={isLoadingFacilities}
                    isMulti={true}
                    isClearable={false}
                    isSearchable={true}
                    placeholder={"Facility"}
                    options={facultyOptions}
                    {...props}
                  />
                )}
              />
            </div>
            {renderBlockTitle("About")}
            <div className="edit-profile__facility">
              <Field
                defaultValue={profile.biography}
                name="biography"
                render={(props) => (
                  <CustomTextarea
                    placeholder={"Describe yourself in a few words"}
                    {...props}
                  />
                )}
              />
            </div>
            {Object.keys(errors).length ? (
              <span className="error">* Fill out the required fields</span>
            ) : null}
            <div className="edit-profile__buttons">
              <button className="button-cancel" onClick={handleOnClickCancel}>
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
  handleOnClickCancel: PropTypes.func,
  onChangeIsEditing: PropTypes.func,
  schools: PropTypes.array,
  teams: PropTypes.array,
  facilities: PropTypes.array,
};

export default ProfileForm;
