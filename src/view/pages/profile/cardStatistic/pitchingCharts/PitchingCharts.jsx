import React, { useEffect, useState } from "react";
import Menu, { Item as MenuItem } from "rc-menu";
import { pitchTypes } from "@constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getBattingGraph,
  getBattingGraphIsLoading,
} from "@ducks/battingGraph/battingGraphSelector";
import { fetchBattingGraphData } from "@ducks/battingGraph/battingGraphRoutines";
import Spinner from "@commonComponents/spinner/Spinner";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import PropTypes from "prop-types";
import "./pitchingCharts.css";

const PitchingCharts = () => {
  const dispatch = useDispatch();
  const batterGraph = useSelector(getBattingGraph);
  const isLoadingBatterGraph = useSelector(getBattingGraphIsLoading);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchBattingGraphData({ pitch_type: selectedItem }));
  }, [selectedItem]);

  const handleOnClickItem = (e) => {
    setSelectedItem(
      e.item.props["data-item"] !== "None" ? e.item.props["data-item"] : null
    );
  };

  const renderMenuType = () => (
    <Menu
      selectable={false}
      onClick={handleOnClickItem}
      className="dropdown-panel dropdown-statistic"
    >
      {pitchTypes.map((item, index) => (
        <MenuItem className="dropdown-panel__item" data-item={item} key={index}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className="charts__wrapper">
      <div className="charts__actions">
        <div className="charts__pitch-type">
          <ButtonDropdown
            trigger={["click"]}
            overlay={renderMenuType()}
            text={`Pitch Type ${selectedItem ? selectedItem : ""}`}
            arrowContainerClass={"charts-actions__arrow"}
          />
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

PitchingCharts.propTypes = {
  type: PropTypes.string,
};

export default PitchingCharts;
