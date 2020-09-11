import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu, { Item as MenuItem } from "rc-menu";
import { pitchTypes } from "@constants/index";
import { ReactComponent as Arrow } from "@assets/svg/arrow2.svg";
import Dropdown from "rc-dropdown";
import SearchInput from "@commonComponents/searchInput/SearchInput";
import {
  getBattingLog,
  getBattingLogIsLoading,
} from "@ducks/battingLog/battingLogSelector";
import { fetchBattingLogData } from "@ducks/battingLog/battingLogRoutines";
import { fetchPitchingLogData } from "@ducks/pitchingLog/pitchingLogRoutines";
import Spinner from "@commonComponents/spinner/Spinner";
import PropTypes from "prop-types";
import "./log.css";

const Log = ({ type }) => {
  const dispatch = useDispatch();
  const battingLog = useSelector(getBattingLog);
  const isLoadingBattingLog = useSelector(getBattingLogIsLoading);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const getMenuTypeItems = (items) =>
    items.map((item, index) => (
      <MenuItem className="dropdown-panel__item" data-item={item} key={index}>
        {item}
      </MenuItem>
    ));

  const handleOnClickItem = (e) => {
    setSelectedItem(
      e.item.props["data-item"] !== "None" ? e.item.props["data-item"] : null
    );
  };

  const menuType = (
    <Menu
      selectable={false}
      onClick={handleOnClickItem}
      className="dropdown-panel dropdown-statistic"
    >
      {getMenuTypeItems(pitchTypes)}
    </Menu>
  );

  useEffect(() => {
    if (type === "batting")
      dispatch(
        fetchBattingLogData({
          pitcher_name: searchValue,
          pitch_type: selectedItem,
        })
      );
    else if (type === "pitching")
      dispatch(
        fetchPitchingLogData({
          batter_name: searchValue,
          pitch_type: selectedItem,
        })
      );
  }, [searchValue, selectedItem]);

  return (
    <div className="log__wrapper">
      <div className="log-search">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          name="player_name"
        />
        <div className="log-search__type">
          <Dropdown trigger={["click"]} overlay={menuType}>
            <button>
              Pitch Type {selectedItem ? `(${selectedItem})` : null}
              <span className="log-search__arrow">
                <Arrow />
              </span>
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="log-search__title">
        {type === "pitching" && "Pitching"}
        {type === "batting" && "Batting"} Log
      </div>
      {isLoadingBattingLog ? (
        <div className="log-table__content">
          <Spinner />
        </div>
      ) : (
        <div className="log-search__log-table">
          <div className="log-table__header c-table__header">
            <div className="log-table__item c-table__header-item">Date</div>
            <div className="log-table__item c-table__header-item">
              Pitcher Name
            </div>
            <div className="log-table__item c-table__header-item">
              Pitcher Handedness
            </div>
            <div className="log-table__item c-table__header-item">
              Pitch Type
            </div>
            <div className="log-table__item c-table__header-item">
              Pitch Call
            </div>
          </div>
          <div className="log-table__content c-table__content">
            {battingLog && battingLog.total_count
              ? "There's no info yet!"
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

Log.propTypes = {
  type: PropTypes.string,
};

export default Log;
