import React from "react";
import { Form, Field } from "react-final-form";
import { required } from "@helpers/validators";
import CustomInput from "@commonComponents/customInput/CustomInput";
import CustomTextarea from "@commonComponents/customTextarea/CustomTextarea";
import CustomSelect from "@commonComponents/customSelect/CustomSelect";
import "./profileForm.css";

const ProfileForm = () => {
  const onSubmit = () => {};

  const states = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const renderBlockTitle = (title) => (
    <div className="edit-profile__block-title">
      <div className="edit-profile__block-text">{title}</div>
    </div>
  );

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => {
        return (
          <form className="edit-profile">
            <div className="edit-profile__names">
              <Field name="first_name" type="text" validate={required}>
                {({ input, meta }) => (
                  <CustomInput placeholder={"First Name *"} input={input} />
                )}
              </Field>
              <Field name="last_name" type="text" validate={required}>
                {({ input, meta }) => (
                  <CustomInput placeholder={"Last Name *"} input={input} />
                )}
              </Field>
            </div>
            <div className="edit-profile__position">
              <Field name="position">
                {({ input, meta }) => (
                  <CustomSelect
                    placeholder={"Position in Game *"}
                    options={states}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__position2">
              <Field name="position2">
                {({ input, meta }) => (
                  <CustomSelect
                    placeholder={"Secondary Position in Game"}
                    options={states}
                    input={input}
                  />
                )}
              </Field>
            </div>
            {renderBlockTitle("Personal Info")}
            <div className="edit-profile__age">
              <Field name="age">
                {({ input, meta }) => (
                  <CustomInput
                    type="number"
                    step="1"
                    min="1"
                    placeholder={"Age *"}
                    options={states}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__feet-and-inches">
              <div className="feet-and-inches__container">
                <Field name="feet">
                  {({ input, meta }) => (
                    <CustomInput
                      type="number"
                      step="1"
                      min="1"
                      placeholder={"Feet *"}
                      input={input}
                    />
                  )}
                </Field>
                <Field name="inches">
                  {({ input, meta }) => (
                    <CustomInput
                      step="1"
                      min="0"
                      type="number"
                      placeholder={"Inches *"}
                      input={input}
                    />
                  )}
                </Field>
              </div>
            </div>
            <div className="edit-profile__weight">
              <Field name="weight">
                {({ input, meta }) => (
                  <CustomInput
                    type="number"
                    step="1"
                    min="1"
                    placeholder={"Weight *"}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__throws-and-bats">
              <div className="throws-and-bats__container">
                <Field name="throws">
                  {({ input, meta }) => (
                    <CustomSelect
                      placeholder={"Throws *"}
                      options={states}
                      input={input}
                    />
                  )}
                </Field>
                <Field name="inches">
                  {({ input, meta }) => (
                    <CustomSelect
                      placeholder={"Bats *"}
                      options={states}
                      input={input}
                    />
                  )}
                </Field>
              </div>
            </div>
            {renderBlockTitle("School")}
            <div className="edit-profile__school">
              <Field name="school">
                {({ input, meta }) => (
                  <CustomSelect
                    isSearchable={true}
                    placeholder={"School"}
                    options={states}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__school-year">
              <Field name="school_year">
                {({ input, meta }) => (
                  <CustomSelect
                    isSearchable={true}
                    placeholder={"School Year"}
                    options={states}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__teams">
              <Field name="teams">
                {({ input, meta }) => (
                  <CustomSelect
                    isMulti={true}
                    isClearable={false}
                    isSearchable={true}
                    placeholder={"Team"}
                    options={states}
                    input={input}
                  />
                )}
              </Field>
            </div>
            {renderBlockTitle("Facility")}
            <div className="edit-profile__facility">
              <Field name="facilities">
                {({ input, meta }) => (
                  <CustomSelect
                    isMulti={true}
                    isClearable={false}
                    isSearchable={true}
                    placeholder={"Facility"}
                    options={states}
                    input={input}
                  />
                )}
              </Field>
            </div>
            {renderBlockTitle("About")}
            <div className="edit-profile__facility">
              <Field name="biography">
                {({ input, meta }) => (
                  <CustomTextarea
                    placeholder={"Describe yourself in a few words"}
                    input={input}
                  />
                )}
              </Field>
            </div>
            <div className="edit-profile__buttons">
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </form>
        );
      }}
    />
  );
};

export default ProfileForm;
