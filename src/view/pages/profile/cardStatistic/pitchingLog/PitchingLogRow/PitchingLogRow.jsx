import React, { memo } from "react";
import PropTypes from "prop-types";

const PitchingLogRow = ({ item }) => {
  return (
    <div className="c-table__row">
      <div className="c-table__row-item log-pitching__row-item">
        <div>{item.date || "-"}</div>
      </div>
      <div className="c-table__row-item log-pitching__row-item">
        <div>{item.batter_name || "-"}</div>
      </div>
      <div className="c-table__row-item log-pitching__row-item">
        <div>{item.pitch_type || "-"}</div>
      </div>
      <div className="c-table__row-item log-pitching__row-item">
        <div>{item.pitch_call || "-"}</div>
      </div>
      <div className="c-table__row-item log-pitching__row-item">
        <div>{item.velocity || "-"}</div>
      </div>
      <div className="c-table__row-item log-pitching__row-item">
        <div>{item.spin_rate || "-"}</div>
      </div>
      <div className="c-table__row-item log-pitching__row-item">
        <div>{item.spin_axis || "-"}</div>
      </div>
    </div>
  );
};

PitchingLogRow.propTypes = {
  item: PropTypes.object,
};

export default memo(PitchingLogRow);
