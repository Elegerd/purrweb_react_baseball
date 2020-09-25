import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu, { Item as MenuItem } from "rc-menu";
import { pitchingLogHeader, pitchTypes } from "@constants";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import SearchInput from "@commonComponents/searchInput/SearchInput";
import {
  getPitchingLog,
  getPitchingLogIsLoading,
} from "@ducks/pitchingLog/selector";
import { fetchPitchingLogData } from "@ducks/pitchingLog/routines";
import Spinner from "@commonComponents/spinner/Spinner";
import PitchingLogRow from "./PitchingLogRow/PitchingLogRow";
import Pagination from "react-paginate";
import PropTypes from "prop-types";
import "./pitchingLog.css";

const PitchingLog = ({}) => {
  const dispatch = useDispatch();
  const pitchingLog = useSelector(getPitchingLog);
  const isLoadingPitchingLog = useSelector(getPitchingLogIsLoading);
  const [activePage, setActivePage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOnClickItem = (e) => {
    setSelectedItem(
      e.item.props["data-item"] !== "None" ? e.item.props["data-item"] : null
    );
  };

  const renderMenuType = useCallback(
    () => (
      <Menu
        selectable={false}
        onClick={handleOnClickItem}
        className="dropdown-panel dropdown-statistic"
      >
        {pitchTypes.map((item, index) => (
          <MenuItem
            className="dropdown-panel__item"
            data-item={item}
            key={index}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    ),
    [pitchTypes]
  );

  const handlePageChange = (data) => {
    let selected = data.selected;
    setActivePage(selected);
  };

  useEffect(() => {
    const pitcher_name = searchValue ? searchValue : undefined;
    const pitch_type = selectedItem ? selectedItem : undefined;
    const offset = activePage ? Math.ceil(activePage * 10) : 0;

    dispatch(
      fetchPitchingLogData({
        pitcher_name,
        pitch_type,
        offset,
      })
    );
  }, [searchValue, selectedItem, activePage]);

  const renderRows = (items) => {
    return items.length ? (
      items.map((item, index) => <PitchingLogRow key={index} item={item} />)
    ) : (
      <div className="log__row-empty">
        <div>{"There's no info yet!"}</div>
      </div>
    );
  };

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
          <ButtonDropdown
            trigger={["click"]}
            overlay={renderMenuType()}
            text={`Pitch Type ${selectedItem ? selectedItem : ""}`}
            arrowContainerClass={"log-search__arrow"}
          />
        </div>
      </div>
      <div className="log-search__title">Pitching Log</div>
      {isLoadingPitchingLog ? (
        <div className="log-table__empty">
          <Spinner />
        </div>
      ) : (
        <div className="log-search__log-table">
          <div className="log-table__header c-table__header">
            {pitchingLogHeader.map((item, index) => (
              <div
                key={index}
                className="log-pitching__item c-table__header-item"
              >
                {item}
              </div>
            ))}
          </div>
          {pitchingLog && pitchingLog.total_count ? (
            <div>
              <div className="log-table__rows c-table__content">
                {renderRows(pitchingLog.pitching_log)}
              </div>
              <div className="log-table__pagination">
                <Pagination
                  previousLabel={"«"}
                  nextLabel={"»"}
                  forcePage={activePage}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  disabledClassName={"disabled"}
                  marginPagesDisplayed={1}
                  pageCount={Math.ceil(pitchingLog.total_count / 10)}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <div className="log-table__empty c-table__content">
              {"There's no info yet!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

PitchingLog.propTypes = {};

export default PitchingLog;
