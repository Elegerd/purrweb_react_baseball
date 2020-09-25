import React, { memo } from "react";
import PropTypes from "prop-types";

const ComparisonRow = ({
  title,
  viewedProfile,
  selectedProfile,
  topType,
  selectedType,
}) => {
  const viewedBatting =
    viewedProfile && topType
      ? viewedProfile[topType.field].find((item) => item.pitch_type === title)
      : null;
  const selectedBatting =
    selectedProfile && topType
      ? selectedProfile[topType.field].find((item) => item.pitch_type === title)
      : null;
  return (
    <div className="tbv-table__tbv-row">
      <div className="tbv-row__item">
        <div>{title}</div>
      </div>
      <div className="tbv-row__item">
        <div>{viewedBatting ? viewedBatting[selectedType.field] : "-"}</div>
      </div>
      <div className="tbv-row__item">
        <div>{selectedBatting ? selectedBatting[selectedType.field] : "-"}</div>
      </div>
    </div>
  );
};

ComparisonRow.propTypes = {
  title: PropTypes.string,
  viewedProfile: PropTypes.object,
  selectedProfile: PropTypes.object,
  topType: PropTypes.object,
  selectedType: PropTypes.object,
};

export default memo(ComparisonRow);
