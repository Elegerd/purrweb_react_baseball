import React, { memo } from "react";
import { Field } from "react-final-form";
import { required } from "@helpers/validators";
import CustomInput from "@commonComponents/customInput/CustomInput";
import CustomSelect from "@commonComponents/customSelect/CustomSelect";
import { throwAndBatOptions } from "@constants";
import PropTypes from "prop-types";

const PersonalProfileBlock = ({
  profile,
  defaultValues: { throws_hand, bats_hand },
}) => {
  return (
    <>
      <div className="edit-profile__block-title">
        <div className="edit-profile__block-text">Personal Info</div>
      </div>
      <div className="edit-profile__age">
        <Field
          defaultValue={profile.age}
          name="age"
          validate={required}
          type="number"
          step="1"
          min="0"
          placeholder={"Age *"}
          title={"Age *"}
          component={CustomInput}
        />
      </div>
      <div className="edit-profile__feet-and-inches">
        <div className="feet-and-inches__container">
          <Field
            defaultValue={profile.feet}
            name="feet"
            validate={required}
            type="number"
            step="1"
            min="0"
            placeholder={"Feet *"}
            title={"Feet *"}
            component={CustomInput}
          />
          <Field
            defaultValue={profile.inches}
            name="inches"
            validate={required}
            step="1"
            min="0"
            type="number"
            placeholder={"Inches *"}
            title={"Inches *"}
            component={CustomInput}
          />
        </div>
      </div>
      <div className="edit-profile__weight">
        <Field
          defaultValue={profile.weight}
          name="weight"
          validate={required}
          type="number"
          step="1"
          min="1"
          placeholder={"Weight *"}
          title={"Weight *"}
          component={CustomInput}
        />
      </div>
      <div className="edit-profile__throws-and-bats">
        <div className="throws-and-bats__container">
          <Field
            name="throws_hand"
            validate={required}
            defaultValue={throws_hand}
            title={"Throws *"}
            placeholder={"Throws *"}
            options={throwAndBatOptions}
            component={CustomSelect}
          />
          <Field
            name="bats_hand"
            validate={required}
            defaultValue={bats_hand}
            title={"Bats *"}
            placeholder={"Bats *"}
            options={throwAndBatOptions}
            component={CustomSelect}
          />
        </div>
      </div>
    </>
  );
};

PersonalProfileBlock.propTypes = {
  profile: PropTypes.object,
  defaultValues: PropTypes.object,
};

export default memo(PersonalProfileBlock);
