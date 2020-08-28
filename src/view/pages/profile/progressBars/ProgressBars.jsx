import React from "react";
import "./progressBars.css";

const ProgressBars = () => {
  return (
    <div className="progress-status-statistics card">
      <div className="statistic">
        <div className="statistic__title">
          <div>Top Batting Values</div>
        </div>
        <div className="statistic__progress-bars"></div>
      </div>
    </div>
  );
};

export default ProgressBars;
