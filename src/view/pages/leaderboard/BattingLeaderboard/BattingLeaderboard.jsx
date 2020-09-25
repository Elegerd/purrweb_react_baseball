import React, { useState, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaderboardBattingHeader, leaderboardBattingTypes } from "@constants";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import CustomMenu from "@commonComponents/customMenu/CustomMenu";
import { fetchBattingLeaderboardData } from "@ducks/battingLeaderboard/routines";
import {
  getBattingLeaderboard,
  getBattingLeaderboardIsLoading,
} from "@ducks/battingLeaderboard/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartO } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { getObjectById } from "@helpers/utilities";
import Spinner from "@commonComponents/spinner/Spinner";
import { updateFavoriteProfileRequest } from "@helpers/request/profileRequest";
import PropTypes from "prop-types";
import "./battingLeaderboard.css";

const BattingLeaderboard = ({ filter }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(leaderboardBattingTypes[0]);
  const battingLeaderboard = useSelector(getBattingLeaderboard);
  const isLoadingLeaderboard = useSelector(getBattingLeaderboardIsLoading);

  useEffect(() => {
    dispatch(
      fetchBattingLeaderboardData({ ...filter, type: selectedType.field })
    );
  }, [filter, selectedType]);

  const handleOnClickMenuItem = (e) => {
    const type = getObjectById(
      leaderboardBattingTypes,
      e.item.props["data-item"]
    );
    setSelectedType(type);
  };

  const handleOnClickFavorite = (data) => async () => {
    await updateFavoriteProfileRequest(data);
    dispatch(
      fetchBattingLeaderboardData({ ...filter, type: selectedType.field })
    );
  };

  const renderHeader = useCallback(
    () => (
      <div className="c-table__header">
        <div className="ss-table__header leaderboard-table__header">
          {leaderboardBattingHeader.map((item, index) => (
            <div
              className="leaderboard-batting__header-item leaderboard-header-item"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    [leaderboardBattingHeader]
  );

  const renderRows = useCallback(() => {
    return battingLeaderboard.map((item, index) => (
      <div
        key={index}
        className="leaderboard-row leaderboard-batting__row c-table__row"
      >
        <div className="leaderboard-row__item">{index + 1}</div>
        <div className="leaderboard-row__item">
          <Link
            className="leaderboard-row__link"
            to={`/profile/${item.batter_datraks_id}`}
          >
            {item.batter_name}
          </Link>
        </div>
        <div className="leaderboard-row__item">{item.age || "-"}</div>
        <div className="leaderboard-row__item">
          {item.school ? item.school.name : "-"}
        </div>
        <div className="leaderboard-row__item">
          {item.teams.length ? item.teams[0].name : "-"}
        </div>
        <div className="leaderboard-row__item">{item.exit_velocity || "-"}</div>
        <div className="leaderboard-row__item">{item.launch_angle || "-"}</div>
        <div className="leaderboard-row__item">{item.distance || "-"}</div>
        <div className="leaderboard-row__item">
          <FontAwesomeIcon
            className="icon blue-icon icon-button"
            onClick={handleOnClickFavorite({
              profile_id: item.batter_datraks_id,
              favorite: !item.favorite,
            })}
            icon={item.favorite ? faHeart : faHeartO}
          />
        </div>
      </div>
    ));
  }, [battingLeaderboard]);

  return (
    <div className="leaderboard__content">
      <div className="leaderboard__velocity">
        <ButtonDropdown
          trigger={["click"]}
          overlay={() => (
            <CustomMenu
              items={leaderboardBattingTypes}
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

BattingLeaderboard.propTypes = {
  filter: PropTypes.object,
};

export default memo(BattingLeaderboard);
