import React from "react";
import { Line } from "rc-progress";
import "./pitcherSummary.css";

const PitcherSummary = () => {
  const pitcherSummaryItem = (title, value) => {
    return (
      <div className="pitcher-summary__ps-item">
        <div className="ps-item">
          <div className="ps-item__title">{title}</div>
          <div className="ps-item__value">{value || "N/A"}</div>
        </div>
        <Line
          className="ps-item__progress-bar"
          percent={`${value || "0"}`}
          strokeWidth="1"
          strokeColor="#fcd126"
          trailColor="#eff1f3"
        />
      </div>
    );
  };

  return (
    <div className="summary-events-wrapper">
      <div className="pitcher-summary c-card">
        <div className="pitcher-summary__title">
          <div>Top Batting Values</div>
        </div>
        <div className="pitcher-summary__content">
          {pitcherSummaryItem("Exit Velocity", 0)}
          {pitcherSummaryItem("Carry Distance", 0)}
          {pitcherSummaryItem("Launch Angle", 0)}
        </div>
      </div>
      <div className="recent-events c-card">
        <div className="heading recent-events__title">
          <div>Recent Session Reports</div>
        </div>
        <div className="recent-events__content">
          <div className="recent-events__empty-message">
            No data currently linked to this profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitcherSummary;
