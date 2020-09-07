import React, { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { required } from "@helpers/validators";
import CustomInput from "@commonComponents/customInput/CustomInput";
import CustomTextarea from "@commonComponents/customTextarea/CustomTextarea";
import CustomSelect from "@commonComponents/customSelect/CustomSelect";
import { updateProfile } from "@routines/profileRoutines";
import { getProfileIsRequesting } from "@selectors/profileSelector";
import { ProfileContext } from "@view/pages/profile/Profile";
import PropTypes from "prop-types";
import "./profileForm.css";

const ProfileForm = ({
  profile,
  teams,
  facilities,
  schools,
  isLoading,
  onChangeIsEditing,
  handleOnClickCancel = () => {},
}) => {
  const { updateProfile: setProfile } = useContext(ProfileContext);
  const dispatch = useDispatch();
  const isRequesting = useSelector(getProfileIsRequesting);
  const onSubmit = (values) => {
    const profile = { ...values };
    const callback = (profile) => {
      setProfile(profile);
      onChangeIsEditing(false);
    };
    profile.bats_hand = profile.bats_hand ? profile.bats_hand.value : "none";
    profile.throws_hand = profile.throws_hand
      ? profile.throws_hand.value
      : "none";
    profile.position = profile.position ? profile.position.value : null;
    profile.position2 = profile.position2 ? profile.position2.value : null;
    profile.facilities = profile.facilities.map((faculty) => {
      return { id: faculty.value, u_name: faculty.label };
    });
    profile.school = profile.school
      ? { id: profile.school.value, name: profile.school.label }
      : null;
    profile.school_year = profile.school_year
      ? profile.school_year.value
      : null;
    profile.teams = profile.teams.map((team) => {
      return { id: team.value, name: team.label };
    });
    dispatch(updateProfile({ profile, callback }));
  };
  const [defaultFacultyOptions, setDefaultFacultyOptions] = useState(undefined);
  const [defaultTeamOptions, setDefaultTeamOptions] = useState(undefined);
  const [defaultSchoolOption, setDefaultSchoolOption] = useState(undefined);
  const [defaultThrowOption, setDefaultThrowOption] = useState(undefined);
  const [defaultBatOption, setDefaultBatOption] = useState(undefined);
  const [defaultSchoolYear, setDefaultSchoolYear] = useState(undefined);
  const [defaultPosition, setDefaultPosition] = useState(undefined);
  const [defaultPosition2, setDefaultPosition2] = useState(undefined);

  useEffect(() => {
    setDefaultThrowOption(
      getDefaultValue(throwAndBatOptions, profile.throws_hand)
    );
    setDefaultBatOption(getDefaultValue(throwAndBatOptions, profile.bats_hand));
    setDefaultSchoolYear(
      getDefaultValue(schoolYearOptions, profile.school_year)
    );
    setDefaultPosition(getDefaultValue(positionOptions, profile.position));
    setDefaultPosition2(getDefaultValue(positionOptions, profile.position2));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setDefaultFacultyOptions(
        getDefaultValues(facultyOptions, profile.facilities)
      );
      setDefaultSchoolOption(
        getDefaultValue(
          schoolOptions,
          profile.school ? profile.school.id : undefined
        )
      );
      setDefaultTeamOptions(getDefaultValues(teamOptions, profile.teams));
    }
  }, [isLoading]);

  const teamOptions = teams.map((team) => {
    return { value: team.id, label: team.name };
  });

  const schoolOptions = schools.map((school) => {
    return { value: school.id, label: school.name };
  });

  const facultyOptions = facilities.map((faculty) => {
    return { value: faculty.id, label: faculty.u_name };
  });

  const schoolYearOptions = [
    { value: "freshman", label: "Freshman" },
    { value: "sophomore", label: "Sophomore" },
    { value: "junior", label: "Junior" },
    { value: "senior", label: "Senior" },
    { value: "none", label: "None" },
  ];

  const throwAndBatOptions = [
    { value: "r", label: "R" },
    { value: "l", label: "L" },
  ];

  const positionOptions = [
    { value: "catcher", label: "Catcher" },
    { value: "first_base", label: "First Base" },
    { value: "second_base", label: "Second Base" },
    { value: "shortstop", label: "Shortstop" },
    { value: "third_base", label: "Third Base" },
    { value: "outfield", label: "Outfield" },
    { value: "pitcher", label: "Pitcher" },
  ];

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
      render={({
        handleSubmit,
        form,
        errors,
        submitting,
        pristine,
        values,
      }) => {
        return (
          <form className="edit-profile" onSubmit={handleSubmit}>
            <div className="edit-profile__names">
              <Field
                defaultValue={profile.first_name}
                name="first_name"
                type="text"
                validate={required}
              >
                {({ input, meta }) => (
                  <CustomInput
                    placeholder={"First Name *"}
                    title={"First Name *"}
                    input={input}
                    error={meta.error && meta.touched ? meta.error : null}
                  />
                )}
              </Field>
              <Field
                defaultValue={profile.last_name}
                name="last_name"
                type="text"
                validate={required}
              >
                {({ input, meta }) => (
                  <CustomInput
                    placeholder={"Last Name *"}
                    title={"Last Name *"}
                    input={input}
                    error={meta.error && meta.touched ? meta.error : null}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__position">
              <Field defaultValue={defaultPosition} name="position">
                {({ input, meta }) => (
                  <CustomSelect
                    placeholder={"Position in Game *"}
                    title={"Position in Game *"}
                    options={positionOptions}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__position2">
              <Field defaultValue={defaultPosition2} name="position2">
                {({ input, meta }) => (
                  <CustomSelect
                    placeholder={"Secondary Position in Game"}
                    options={[
                      { value: undefined, label: "-" },
                      ...positionOptions,
                    ]}
                    input={input}
                  />
                )}
              </Field>
            </div>
            {renderBlockTitle("Personal Info")}
            <div className="edit-profile__age">
              <Field defaultValue={profile.age} name="age" validate={required}>
                {({ input, meta }) => (
                  <CustomInput
                    type="number"
                    step="1"
                    min="0"
                    placeholder={"Age *"}
                    title={"Age *"}
                    input={input}
                    error={meta.error && meta.touched ? meta.error : null}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__feet-and-inches">
              <div className="feet-and-inches__container">
                <Field
                  defaultValue={profile.feet}
                  name="feet"
                  validate={required}
                >
                  {({ input, meta }) => (
                    <CustomInput
                      type="number"
                      step="1"
                      min="0"
                      placeholder={"Feet *"}
                      title={"Feet *"}
                      input={input}
                      error={meta.error && meta.touched ? meta.error : null}
                    />
                  )}
                </Field>
                <Field
                  defaultValue={profile.inches}
                  name="inches"
                  validate={required}
                >
                  {({ input, meta }) => (
                    <CustomInput
                      step="1"
                      min="0"
                      type="number"
                      placeholder={"Inches *"}
                      title={"Inches *"}
                      input={input}
                      error={meta.error && meta.touched ? meta.error : null}
                    />
                  )}
                </Field>
              </div>
            </div>
            <div className="edit-profile__weight">
              <Field
                defaultValue={profile.weight}
                name="weight"
                validate={required}
              >
                {({ input, meta }) => (
                  <CustomInput
                    type="number"
                    step="1"
                    min="1"
                    placeholder={"Weight *"}
                    title={"Weight *"}
                    input={input}
                    error={meta.error && meta.touched ? meta.error : null}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__throws-and-bats">
              <div className="throws-and-bats__container">
                <Field
                  defaultValue={defaultThrowOption}
                  name="throws_hand"
                  validate={required}
                >
                  {({ input, meta }) => (
                    <CustomSelect
                      title={"Throws *"}
                      placeholder={"Throws *"}
                      options={throwAndBatOptions}
                      input={input}
                      error={meta.error && meta.touched ? meta.error : null}
                    />
                  )}
                </Field>
                <Field defaultValue={defaultBatOption} name="bats_hand">
                  {({ input, meta }) => (
                    <CustomSelect
                      title={"Bats *"}
                      placeholder={"Bats *"}
                      options={throwAndBatOptions}
                      input={input}
                      error={meta.error && meta.touched ? meta.error : null}
                    />
                  )}
                </Field>
              </div>
            </div>
            {renderBlockTitle("School")}
            <div className="edit-profile__school">
              <Field defaultValue={defaultSchoolOption} name="school">
                {({ input, meta }) => (
                  <CustomSelect
                    isLoading={isLoading}
                    isSearchable={true}
                    placeholder={"School"}
                    options={schoolOptions}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__school-year">
              <Field defaultValue={defaultSchoolYear} name="school_year">
                {({ input, meta }) => (
                  <CustomSelect
                    isSearchable={true}
                    placeholder={"School Year"}
                    options={schoolYearOptions}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__teams">
              <Field defaultValue={defaultTeamOptions} name="teams">
                {({ input, meta }) => (
                  <CustomSelect
                    isLoading={isLoading}
                    isMulti={true}
                    isClearable={false}
                    isSearchable={true}
                    placeholder={"Team"}
                    options={teamOptions}
                    input={input}
                  />
                )}
              </Field>
            </div>
            {renderBlockTitle("Facility")}
            <div className="edit-profile__facility">
              <Field defaultValue={defaultFacultyOptions} name="facilities">
                {({ input, meta }) => (
                  <CustomSelect
                    isLoading={isLoading}
                    isMulti={true}
                    isClearable={false}
                    isSearchable={true}
                    placeholder={"Facility"}
                    options={facultyOptions}
                    input={input}
                  />
                )}
              </Field>
            </div>
            {renderBlockTitle("About")}
            <div className="edit-profile__facility">
              <Field defaultValue={profile.biography} name="biography">
                {({ input, meta }) => (
                  <CustomTextarea
                    placeholder={"Describe yourself in a few words"}
                    input={input}
                  />
                )}
              </Field>
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
  isLoading: PropTypes.bool,
  handleOnClickCancel: PropTypes.func,
  onChangeIsEditing: PropTypes.func,
  schools: PropTypes.array,
  teams: PropTypes.array,
  facilities: PropTypes.array,
};

export default ProfileForm;
