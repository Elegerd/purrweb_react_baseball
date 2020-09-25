import React, { memo } from "react";
import PropTypes from "prop-types";

const BattingLogRow = ({ item }) => {
  return (
    <div className="c-table__row">
      <div className="c-table__row-item log-batting__row-item">
        <div>{item.date || "-"}</div>
      </div>
      <div className="c-table__row-item log-batting__row-item">
        <div>{item.pitcher_name || "-"}</div>
      </div>
      <div className="c-table__row-item log-batting__row-item">
        <div>{item.pitcher_handedness || "-"}</div>
      </div>
      <div className="c-table__row-item log-batting__row-item">
        <div>{item.pitch_type || "-"}</div>
      </div>
      <div className="c-table__row-item log-batting__row-item">
        <div>{item.pitch_call || "-"}</div>
      </div>
    </div>
  );
};

BattingLogRow.propTypes = {
  item: PropTypes.object,
};

export default memo(BattingLogRow);
