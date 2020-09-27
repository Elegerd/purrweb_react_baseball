import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBattingSummaryData } from "@ducks/battingSummary/routines";
import {
  getBattingSummary,
  getBattingSummaryIsLoading,
} from "@ducks/battingSummary/selector";
import { battingSummaryHeader } from "@constants";
import Spinner from "@commonComponents/spinner/Spinner";
import BattingSummaryRow from "./battingSummaryRow/BattingSummaryRow";
import PropTypes from "prop-types";
import "./battingSummary.css";

const renderRows = (items) => {
  const filteredItems = items.filter((item) => item.pitch_type);
  return filteredItems.length ? (
    filteredItems.map((item, index) => (
      <BattingSummaryRow key={index} item={item} />
    ))
  ) : (
    <div className="summary__row-empty">
      <div>{"There's no info yet!"}</div>
    </div>
  );
};

const renderHeader = () => (
  <div className="c-table__header">
    <div className="ss-table__header">
      {battingSummaryHeader.map((item, index) => (
        <div key={index} className="summary-batting__header-item">
          {index}
        </div>
      ))}
    </div>
  </div>
);

const BattingSummary = () => {
  const dispatch = useDispatch();
  const battingSummary = useSelector(getBattingSummary);
  const isLoadingBattingSummary = useSelector(getBattingSummaryIsLoading);

  useEffect(() => {
    dispatch(fetchBattingSummaryData({}));
  }, []);

  if (isLoadingBattingSummary)
    return (
      <div className="summary__empty">
        <Spinner />
      </div>
    );

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
