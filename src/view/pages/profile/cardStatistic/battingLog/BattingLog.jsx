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
import Spinner from "@commonComponents/spinner/Spinner";
import Pagination from "react-paginate";
import PropTypes from "prop-types";
import "./battingLog.css";

const BattingLog = ({}) => {
  const dispatch = useDispatch();
  const battingLog = useSelector(getBattingLog);
  const isLoadingBattingLog = useSelector(getBattingLogIsLoading);
  const [activePage, setActivePage] = useState(0);
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
    const pitcher_name = searchValue ? searchValue : undefined;
    const pitch_type = selectedItem ? selectedItem : undefined;
    const offset = activePage ? Math.ceil(activePage * 10) : 0;

    dispatch(
      fetchBattingLogData({
        pitcher_name,
        pitch_type,
        offset,
      })
    );
  }, [searchValue, selectedItem, activePage]);

  const handlePageChange = (data) => {
    let selected = data.selected;
    setActivePage(selected);
  };

  const renderRows = (items) => {
    return items.length ? (
      items.map((item, index) => (
        <div key={index} className="c-table__row">
          <div className="c-table__row-item log-batting__row-item">
            <div>{item.date || "-"}</div>
          </div>
          <div className="c-table__row-item log-batting__row-item">
            <div>{item.pitcher_name || "-"}</div>
          </div>
          <div className="c-table__row-item log-batting__row-item">
            <div>{item.pitcher_handedness || "-"}</div>
          </div>
          <div className="c-table__row-item log-batting__row-item">
            <div>{item.pitch_type || "-"}</div>
          </div>
          <div className="c-table__row-item log-batting__row-item">
            <div>{item.pitch_call || "-"}</div>
          </div>
        </div>
      ))
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
      <div className="log-search__title">Batting Log</div>
      {isLoadingBattingLog ? (
        <div className="log-table__empty">
          <Spinner />
        </div>
      ) : (
        <div className="log-search__log-table">
          <div className="log-table__header c-table__header">
            <div className="log-batting__item c-table__header-item">Date</div>
            <div className="log-batting__item c-table__header-item">
              Pitcher Name
            </div>
            <div className="log-batting__item c-table__header-item">
              Pitcher Handedness
            </div>
            <div className="log-batting__item c-table__header-item">
              Pitch Type
            </div>
            <div className="log-batting__item c-table__header-item">
              Pitch Call
            </div>
          </div>
          {battingLog && battingLog.total_count ? (
            <div>
              <div className="log-table__rows c-table__content">
                {renderRows(battingLog.batting_log)}
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
                  pageCount={Math.ceil(battingLog.total_count / 10)}
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

BattingLog.propTypes = {};

export default BattingLog;