import React, { useEffect, useState } from "react";
import { Line } from "rc-progress";
import { profileIsBatting, profileIsPitching } from "@helpers/utilities";
import PropTypes from "prop-types";
import "./cardSummary.css";

const CardSummary = ({
  isUserProfile,
  profile: {
    pitcher_summary: pitcherSummary = {},
    batter_summary: batterSummary = {},
    ...profile
  },
}) => {
  const [isPitching, setIsPitching] = useState(false);
  const [isBatting, setIsBatting] = useState(false);

  useEffect(() => {
    setIsPitching(profileIsPitching(profile));
    setIsBatting(profileIsBatting(profile));
  }, []);

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
      {isPitching ? (
        <div className="summary-card c-card">
          <div className="summary-card__title">
            <div>Top Pitching Values</div>
          </div>
          <div className="summary-card__content">
            {pitcherSummaryItem(
              "Fastball Velocity",
              pitcherSummary.length ? pitcherSummary[0].velocity : undefined
            )}
            {pitcherSummaryItem(
              "Spin Rate",
              pitcherSummary.length ? pitcherSummary[0].spin_rate : undefined
            )}
            {pitcherSummaryItem(
              "Pitch Movement",
              pitcherSummary.length
                ? pitcherSummary[0].horizontal_break
                : undefined
            )}
          </div>
        </div>
      ) : null}
      {isBatting ? (
        <div className="summary-card c-card">
          <div className="summary-card__title">
            <div>Top Batting Values</div>
          </div>
          <div className="summary-card__content">
            {pitcherSummaryItem(
              "Exit Velocity",
              batterSummary.length ? batterSummary[0].exit_velocity : undefined
            )}
            {pitcherSummaryItem(
              "Carry Distance",
              batterSummary.length ? batterSummary[0].distance : undefined
            )}
            {pitcherSummaryItem(
              "Launch Angle",
              batterSummary.length ? batterSummary[0].launch_angle : undefined
            )}
          </div>
        </div>
      ) : null}
      {isUserProfile && (
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
      )}
    </div>
  );
};

CardSummary.propTypes = {
  isUserProfile: PropTypes.bool,
  profile: PropTypes.object,
  pitcher_summary: PropTypes.object,
  batter_summary: PropTypes.object,
};

export default CardSummary;
