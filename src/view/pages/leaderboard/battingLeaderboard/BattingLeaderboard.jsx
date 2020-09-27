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
import { getObjectById } from "@helpers/utilities";
import Spinner from "@commonComponents/spinner/Spinner";
import { updateFavoriteProfileRequest } from "@helpers/request/profileRequest";
import LeaderboardTableHeader from "../leaderboardTableHeader/LeaderboardTableHeader";
import BattingLeaderboardTableRow from "./battingLeaderboardTableRow/BattingLeaderboardTableRow";
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

  const renderRows = useCallback(() => {
    return battingLeaderboard.map((item, index) => (
      <BattingLeaderboardTableRow
        key={index}
        index={index + 1}
        item={item}
        onClickFavorite={handleOnClickFavorite}
      />
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
        <LeaderboardTableHeader
          items={leaderboardBattingHeader}
          itemClass={"leaderboard-batting__header-item"}
        />
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
