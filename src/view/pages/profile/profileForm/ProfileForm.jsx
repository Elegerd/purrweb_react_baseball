import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { required } from "@helpers/validators";
import CustomInput from "@commonComponents/customInput/CustomInput";
import CustomTextarea from "@commonComponents/customTextarea/CustomTextarea";
import CustomSelect from "@commonComponents/customSelect/CustomSelect";
import PropTypes from "prop-types";
import "./profileForm.css";

const ProfileForm = ({
  profile,
  teams,
  facilities,
  schools,
  isRequesting,
  handleOnClickCancel = () => {},
}) => {
  const onSubmit = (values) => {
    console.log(values);
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
    if (!isRequesting) {
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
  }, [isRequesting]);

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

  const states = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "cat", label: "Cat" },
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
      render={({ handleSubmit, form, submitting, pristine, values }) => {
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
                    options={states}
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
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__throws-and-bats">
              <div className="throws-and-bats__container">
                <Field
                  defaultValue={defaultThrowOption}
                  name="throws"
                  validate={required}
                >
                  {({ input, meta }) => (
                    <CustomSelect
                      placeholder={"Throws *"}
                      options={throwAndBatOptions}
                      input={input}
                    />
                  )}
                </Field>
                <Field defaultValue={defaultBatOption} name="bats">
                  {({ input, meta }) => (
                    <CustomSelect
                      placeholder={"Bats *"}
                      options={throwAndBatOptions}
                      input={input}
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
                    isLoading={isRequesting}
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
                    isLoading={isRequesting}
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
                    isLoading={isRequesting}
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
            <div className="edit-profile__buttons">
              <button className="button-cancel" onClick={handleOnClickCancel}>
                Cancel
              </button>
              <button type="submit" className="button-save">
                Save
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
  isRequesting: PropTypes.bool,
  handleOnClickCancel: PropTypes.func,
  schools: PropTypes.array,
  teams: PropTypes.array,
  facilities: PropTypes.array,
};

export default ProfileForm;
