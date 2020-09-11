import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBattingSummaryData } from "@ducks/battingSummary/battingSummaryRoutines";
import { getBattingSummary } from "@ducks/battingSummary/battingSummarySelector";
import PropTypes from "prop-types";
import "./summary.css";

const Summary = () => {
  const dispatch = useDispatch();
  const batterSummary = useSelector(getBattingSummary);
  useEffect(() => {
    dispatch(fetchBattingSummaryData({}));
  }, []);

  return (
    <>
      {batterSummary &&
      (batterSummary.top_values.length ||
        batterSummary.average_values.length) ? (
        <div className="summary__wrapper">
          <div className="top-batting">
            <div className="top-batting__title">Top Batting Values</div>
            <div className="ss-table c-table">
              <div className="c-table__header">
                <div className="ss-table__header">
                  <div className="ss-table__header-item">Date</div>
                  <div className="ss-table__header-item">Type</div>
                  <div className="ss-table__header-item">Name</div>
                  <div className="ss-table__header-item">Purchased</div>
                </div>
              </div>
            </div>
          </div>
          <div className="average-batting">
            <div className="average-batting__title">Average Batting Values</div>
          </div>
        </div>
      ) : (
        <div className="summary__empty">{"There's no info yet!"}</div>
      )}
    </>
  );
};

Summary.propTypes = {
  type: PropTypes.string,
};

export default Summary;
