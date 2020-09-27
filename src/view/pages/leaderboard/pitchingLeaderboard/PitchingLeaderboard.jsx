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
import { getObjectById } from "@helpers/utilities";
import Spinner from "@commonComponents/spinner/Spinner";
import LeaderboardTableHeader from "../leaderboardTableHeader/LeaderboardTableHeader";
import PitchingLeaderboardTableRow from "./pitchingLeaderboardTableRow/PitchingLeaderboardTableRow";
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

  const renderRows = useCallback(() => {
    return patchingLeaderboard.map((item, index) => (
      <PitchingLeaderboardTableRow
        key={index}
        index={index + 1}
        item={item}
        onClickFavorite={handleOnClickFavorite}
      />
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
        <LeaderboardTableHeader
          items={leaderboardPitchingHeader}
          itemClass={"leaderboard-pitching__header-item"}
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

PitchingLeaderboard.propTypes = {
  filter: PropTypes.object,
};

export default memo(PitchingLeaderboard);
