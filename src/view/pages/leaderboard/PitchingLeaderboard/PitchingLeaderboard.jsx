import React, { useState, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import CustomMenu from "@commonComponents/customMenu/CustomMenu";
import {
  leaderboardPitchingHeader,
  leaderboardPitchingTypes,
} from "@constants";
import { fetchPitchingLeaderboardData } from "@ducks/pitchingLeaderboard/routines";
import { updateFavoriteProfileRequest } from "@helpers/request/profileRequest";
import {
  getPitchingLeaderboard,
  getPitchingLeaderboardIsLoading,
} from "@ducks/pitchingLeaderboard/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartO } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { getObjectById } from "@helpers/utilities";
import Spinner from "@commonComponents/spinner/Spinner";
import PropTypes from "prop-types";
import "./pitchingLeaderboard.css";

const PitchingLeaderboard = ({ filter }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(leaderboardPitchingTypes[0]);
  const patchingLeaderboard = useSelector(getPitchingLeaderboard);
  const isLoadingLeaderboard = useSelector(getPitchingLeaderboardIsLoading);

  useEffect(() => {
    dispatch(
      fetchPitchingLeaderboardData({ ...filter, type: selectedType.field })
    );
  }, [filter, selectedType]);

  const handleOnClickMenuItem = (e) => {
    const type = getObjectById(
      leaderboardPitchingTypes,
      e.item.props["data-item"]
    );
    setSelectedType(type);
  };

  const handleOnClickFavorite = (data) => async () => {
    await updateFavoriteProfileRequest(data);
    dispatch(
      fetchPitchingLeaderboardData({ ...filter, type: selectedType.field })
    );
  };

  const renderHeader = useCallback(
    () => (
      <div className="c-table__header">
        <div className="ss-table__header leaderboard-table__header">
          {leaderboardPitchingHeader.map((item, index) => (
            <div
              className="leaderboard-pitching__header-item leaderboard-header-item"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    [leaderboardPitchingHeader]
  );

  const renderRows = useCallback(() => {
    return patchingLeaderboard.map((item, index) => (
      <div
        key={index}
        className="leaderboard-row leaderboard-pitching__row c-table__row"
      >
        <div className="leaderboard-row__item">{index + 1}</div>
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
            onClick={handleOnClickFavorite({
              profile_id: item.pitcher_datraks_id,
              favorite: !item.favorite,
            })}
            icon={item.favorite ? faHeart : faHeartO}
          />
        </div>
      </div>
    ));
  }, [patchingLeaderboard]);

  return (
    <div className="leaderboard__content">
      <div className="leaderboard__velocity">
        <ButtonDropdown
          trigger={["click"]}
          overlay={() => (
            <CustomMenu
              items={leaderboardPitchingTypes}
              onClick={handleOnClickMenuItem}
            />
          )}
          text={selectedType.title}
          buttonClass={"lv-button"}
          arrowContainerClass={"lv-button__arrow"}
        />
      </div>
      <div className="leaderboard__table c-table">
        {renderHeader()}
        {isLoadingLeaderboard ? (
          <div className="leaderboard__spinner-container">
            <Spinner />
          </div>
        ) : (
          <div className="c-table__content">{renderRows()}</div>
        )}
      </div>
    </div>
  );
};

PitchingLeaderboard.propTypes = {
  filter: PropTypes.object,
};

export default memo(PitchingLeaderboard);
