import React, { memo } from "react";
import PropTypes from "prop-types";

const BattingSummaryRow = ({ item }) => {
  return (
    <div className="c-table__row">
      <div className="c-table__row-item summary-batting__row-item">
        <div>{item.pitch_type || "-"}</div>
      </div>
      <div className="c-table__row-item summary-batting__row-item">
        <div>{item.distance || "-"}</div>
      </div>
      <div className="c-table__row-item summary-batting__row-item">
        <div>{item.launch_angle || "-"}</div>
      </div>
      <div className="c-table__row-item summary-batting__row-item">
        <div>{item.exit_velocity || "-"}</div>
      </div>
    </div>
  );
};

BattingSummaryRow.propTypes = {
  item: PropTypes.object,
};

export default memo(BattingSummaryRow);
