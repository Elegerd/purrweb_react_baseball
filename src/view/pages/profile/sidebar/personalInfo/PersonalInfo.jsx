import React, { memo } from "react";
import { letterToUppercase } from "@helpers/utilities";
import { Age, Bats, Height, Throws, Weight } from "@commonComponents/svg";
import PropTypes from "prop-types";

const PersonalInfo = ({ profile }) => {
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

PersonalInfo.propTypes = {
  profile: PropTypes.object,
};

export default memo(PersonalInfo);
