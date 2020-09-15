import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBattingSummaryData } from "@ducks/battingSummary/battingSummaryRoutines";
import { getBattingSummary } from "@ducks/battingSummary/battingSummarySelector";
import PropTypes from "prop-types";
import "./battingSummary.css";

const BattingSummary = () => {
  const dispatch = useDispatch();
  const battingSummary = useSelector(getBattingSummary);

  useEffect(() => {
    dispatch(fetchBattingSummaryData({}));
  }, []);

  const renderHeader = () => (
    <div className="c-table__header">
      <div className="ss-table__header">
        <div className="summary-batting__header-item">Pitch Type</div>
        <div className="summary-batting__header-item">Distance</div>
        <div className="summary-batting__header-item">Launch Angle</div>
        <div className="summary-batting__header-item">Exit Velocity</div>
      </div>
    </div>
  );

  const renderRows = (items) => {
    const filteredItems = items.filter((item) => item.pitch_type);
    return filteredItems.length ? (
      filteredItems.map((item, index) => (
        <div key={index} className="c-table__row">
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
      ))
    ) : (
      <div className="summary__row-empty">
        <div>{"There's no info yet!"}</div>
      </div>
    );
  };

  return (
    <>
      {battingSummary &&
      (battingSummary.top_values.length ||
        battingSummary.average_values.length) ? (
        <div className="summary__wrapper">
          <div className="top-batting">
            <div className="top-batting__title">Top Batting Values</div>
            <div className="ss-table c-table">{renderHeader()}</div>
            <div className="c-table__content">
              {renderRows(battingSummary.top_values)}
            </div>
          </div>
          <div className="average-batting">
            <div className="average-batting__title">Average Batting Values</div>
            <div className="ss-table c-table">{renderHeader()}</div>
            <div className="c-table__content">
              {renderRows(battingSummary.average_values)}
            </div>
          </div>
        </div>
      ) : (
        <div className="summary__empty">{"There's no info yet!"}</div>
      )}
    </>
  );
};

BattingSummary.propTypes = {
  type: PropTypes.string,
};

export default BattingSummary;
