import React, { memo } from "react";
import { letterToUppercase } from "@helpers/utilities";
import PropTypes from "prop-types";

const renderSchoolInfoItem = (title, value) => {
  return (
    <div className="school-info__item">
      <div className="item__title">{title}</div>
      <div className="item__value">{value}</div>
    </div>
  );
};

const SchoolInfo = ({ profile }) => {
  const { school, school_year, teams, facilities, biography } = profile;

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

SchoolInfo.propTypes = {
  profile: PropTypes.object,
};

export default memo(SchoolInfo);
