import React from "react";
import { Line } from "rc-progress";
import "./cardSummary.css";

const CardSummary = () => {
  const pitcherSummaryItem = (title, value) => {
    return (
      <div className="summary-card__sc-item">
        <div className="sc-item">
          <div className="sc-item__title">{title}</div>
          <div className="sc-item__value">{value || "N/A"}</div>
        </div>
        <Line
          className="sc-item__progress-bar"
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
      <div className="summary-card c-card">
        <div className="summary-card__title">
          <div>Top Batting Values</div>
        </div>
        <div className="summary-card__content">
          {pitcherSummaryItem("Exit Velocity", 0)}
          {pitcherSummaryItem("Carry Distance", 0)}
          {pitcherSummaryItem("Launch Angle", 0)}
        </div>
      </div>
      <div className="summary-card c-card">
        <div className="summary-card__title">
          <div>Top Pitching Values</div>
        </div>
        <div className="summary-card__content">
          {pitcherSummaryItem("Fastball Velocity", 0)}
          {pitcherSummaryItem("Spin Rate", 0)}
          {pitcherSummaryItem("Pitch Movement", 0)}
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

export default CardSummary;
