import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getViewedProfile } from "@ducks/viewedProfile/viewedProfileSelector";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Menu, { Item as MenuItem } from "rc-menu";
import Dropdown from "rc-dropdown";
import Summary from "@view/pages/profile/cardStatistic/summary/Summary";
import Charts from "@view/pages/profile/cardStatistic/charts/Charts";
import Log from "@view/pages/profile/cardStatistic/log/Log";
import Sessions from "@view/pages/profile/cardStatistic/sussions/Sessions";
import { profileIsBatting, profileIsPitching } from "@helpers/utilities";
import PropTypes from "prop-types";
import "./cardStatistic.css";

const CardStatistic = ({ isUserProfile }) => {
  const tabBattingRef = useRef(null);
  const tabPitchingRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState("0");
  const viewedProfile = useSelector(getViewedProfile);
  const isPitching = profileIsPitching(viewedProfile);
  const isBatting = profileIsBatting(viewedProfile);

  const handleOnClickBattingItem = (e) => {
    setSelectedItem(e.key);
    tabBattingRef.current.node.click();
  };

  const handleOnClickPitchingItem = (e) => {
    setSelectedItem(e.key);
    tabPitchingRef.current.node.click();
  };

  const menuBattingItems = (items) =>
    items.map((value, index) => (
      <MenuItem className="dropdown-panel__item" key={index}>
        {value}
      </MenuItem>
    ));

  const menuBatting = (
    <Menu
      selectable={false}
      onClick={handleOnClickBattingItem}
      className="dropdown-panel dropdown-statistic"
    >
      {menuBattingItems(["Summary", "Charts", "Log"])}
    </Menu>
  );

  const menuPitching = (
    <Menu
      selectable={false}
      onClick={handleOnClickPitchingItem}
      className="dropdown-panel dropdown-statistic"
    >
      {menuBattingItems(["Summary", "Charts", "Log"])}
    </Menu>
  );

  const renderPitching = () => {
    return (
      <TabPanel>
        {selectedItem === "0" && <Summary type={"pitching"} />}
        {selectedItem === "1" && <Charts type={"pitching"} />}
        {selectedItem === "2" && <Log type={"pitching"} />}
      </TabPanel>
    );
  };

  const renderBatting = () => {
    return (
      <TabPanel>
        {selectedItem === "0" && <Summary type={"batting"} />}
        {selectedItem === "1" && <Charts type={"batting"} />}
        {selectedItem === "2" && <Log type={"batting"} />}
      </TabPanel>
    );
  };

  const renderSessions = () => {
    return (
      <TabPanel>
        <Sessions />
      </TabPanel>
    );
  };

  const renderComparison = () => {
    return (
      <TabPanel>
        <h2>Any content 3</h2>
      </TabPanel>
    );
  };

  return (
    <div className="card-statistic c-card">
      <Tabs>
        <TabList>
          {isPitching && (
            <Tab ref={tabPitchingRef}>
              <Dropdown overlay={menuPitching}>
                <span>Pitching</span>
              </Dropdown>
            </Tab>
          )}
          {isBatting && (
            <Tab ref={tabBattingRef}>
              <Dropdown overlay={menuBatting}>
                <span>Batting</span>
              </Dropdown>
            </Tab>
          )}
          <Tab>Session Reports</Tab>
          <Tab>Comparison</Tab>
        </TabList>
        {isPitching && renderPitching()}
        {isBatting && renderBatting()}
        {renderSessions()}
        {renderComparison()}
      </Tabs>
    </div>
  );
};

CardStatistic.propTypes = {
  isUserProfile: PropTypes.bool,
};

export default CardStatistic;
