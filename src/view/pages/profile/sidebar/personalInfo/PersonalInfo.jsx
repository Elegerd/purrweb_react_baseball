import React, { memo } from "react";
import { letterToUppercase } from "@helpers/utilities";
import { Age, Bats, Height, Throws, Weight } from "@commonComponents/svg";
import PropTypes from "prop-types";

const renderPersonalItem = (title, value, Icon) => {
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

const PersonalInfo = ({ profile }) => {
  const { age, feet, inches, weight, throws_hand, bats_hand } = profile;

  return (
    <div className="personal-info">
      <div className="personal-info__content">
        {renderPersonalItem("Age", age, Age)}
        {renderPersonalItem(
          "Height",
          `${feet || 0} ft ${inches || 0} in`,
          Height
        )}
        {renderPersonalItem("Weight", `${weight || 0} lbs`, Weight)}
        {renderPersonalItem("Throws", letterToUppercase(throws_hand), Throws)}
        {renderPersonalItem("Bats", letterToUppercase(bats_hand), Bats)}
      </div>
    </div>
  );
};

PersonalInfo.propTypes = {
  profile: PropTypes.object,
};

export default memo(PersonalInfo);
