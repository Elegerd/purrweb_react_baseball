import React, { useEffect, useState } from "react";
import Menu, { Item as MenuItem } from "rc-menu";
import { ReactComponent as Arrow } from "@assets/svg/arrow2.svg";
import Dropdown from "rc-dropdown";
import { pitchTypes } from "@constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getBattingGraph,
  getBattingGraphIsLoading,
} from "@ducks/battingGraph/battingGraphSelector";
import { fetchBattingGraphData } from "@ducks/battingGraph/battingGraphRoutines";
import Spinner from "@commonComponents/spinner/Spinner";
import PropTypes from "prop-types";
import "./battingCharts.css";

const BattingCharts = () => {
  const dispatch = useDispatch();
  const batterGraph = useSelector(getBattingGraph);
  const isLoadingBatterGraph = useSelector(getBattingGraphIsLoading);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchBattingGraphData({ pitch_type: selectedItem }));
  }, [selectedItem]);

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

  return (
    <div className="charts__wrapper">
      <div className="charts__actions">
        <div className="charts__pitch-type">
          <Dropdown trigger={["click"]} overlay={menuType}>
            <button>
              Pitch Type {selectedItem ? `(${selectedItem})` : null}
              <span className="charts-actions__arrow">
                <Arrow />
              </span>
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="charts__content">
        {isLoadingBatterGraph ? (
          <Spinner />
        ) : (
          <>{batterGraph ? "There's no info yet!" : null}</>
        )}
      </div>
    </div>
  );
};

BattingCharts.propTypes = {
  type: PropTypes.string,
};

export default BattingCharts;
