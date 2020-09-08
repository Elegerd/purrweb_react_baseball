import React, { useContext } from "react";
import { ProfileContext } from "@view/pages/profile/Profile";
import "./summary.css";

const Summary = () => {
  const {
    profile: { batter_summary = [] },
  } = useContext(ProfileContext);

  return (
    <>
      {batter_summary.length ? (
        <div className="summary__wrapper">
          <div className="top-batting">
            <div className="top-batting__title">Top Batting Values</div>
          </div>
          <div className="average-batting">
            <div className="average-batting__title">Average Batting Values</div>
          </div>{" "}
        </div>
      ) : (
        <div className="summary__empty">{"There's no info yet!"}</div>
      )}
    </>
  );
};

export default Summary;
