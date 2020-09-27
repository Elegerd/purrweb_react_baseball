import React, { memo } from "react";
import PropTypes from "prop-types";

const LeaderboardTableHeader = ({ items = [], itemClass = "" }) => {
  return (
    <div className="c-table__header">
      <div className="ss-table__header leaderboard-table__header">
        {items.map((item, index) => (
          <div className={`${itemClass} leaderboard-header-item`} key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

LeaderboardTableHeader.propTypes = {
  items: PropTypes.array,
  itemClass: PropTypes.string,
};

export default memo(LeaderboardTableHeader);
