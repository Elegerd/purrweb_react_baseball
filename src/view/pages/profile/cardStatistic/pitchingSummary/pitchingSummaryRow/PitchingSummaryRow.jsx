import React, { memo } from "react";
import PropTypes from "prop-types";

const PitchingSummaryRow = ({ item }) => {
  return (
    <div className="c-table__row">
      <div className="c-table__row-item summary-pitching__row-item">
        <div>{item.pitch_type || "-"}</div>
      </div>
      <div className="c-table__row-item summary-pitching__row-item">
        <div>{item.velocity || "-"}</div>
      </div>
      <div className="c-table__row-item summary-pitching__row-item">
        <div>{item.spin_rate || "-"}</div>
      </div>
    </div>
  );
};

PitchingSummaryRow.propTypes = {
  item: PropTypes.object,
};

export default memo(PitchingSummaryRow);
