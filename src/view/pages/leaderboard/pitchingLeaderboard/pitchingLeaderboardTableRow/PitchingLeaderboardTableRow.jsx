import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartO } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

const PitchingLeaderboardTableRow = ({ index, item, onClickFavorite }) => {
  return (
    <div className="leaderboard-row leaderboard-pitching__row c-table__row">
      <div className="leaderboard-row__item">{index}</div>
      <div className="leaderboard-row__item">
        <Link
          className="leaderboard-row__link"
          to={`/profile/${item.pitcher_datraks_id}`}
        >
          {item.pitcher_name}
        </Link>
      </div>
      <div className="leaderboard-row__item">{item.age || "-"}</div>
      <div className="leaderboard-row__item">
        {item.school ? item.school.name : "-"}
      </div>
      <div className="leaderboard-row__item">
        {item.teams.length ? item.teams[0].name : "-"}
      </div>
      <div className="leaderboard-row__item">{item.pitch_type || "-"}</div>
      <div className="leaderboard-row__item">{item.velocity || "-"}</div>
      <div className="leaderboard-row__item">{item.spin_rate || "-"}</div>
      <div className="leaderboard-row__item">
        <FontAwesomeIcon
          className="icon blue-icon icon-button"
          onClick={onClickFavorite({
            profile_id: item.pitcher_datraks_id,
            favorite: !item.favorite,
          })}
          icon={item.favorite ? faHeart : faHeartO}
        />
      </div>
    </div>
  );
};

PitchingLeaderboardTableRow.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  onClickFavorite: PropTypes.func,
};

export default memo(PitchingLeaderboardTableRow);
