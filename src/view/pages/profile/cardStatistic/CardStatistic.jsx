import React, { useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Menu, { Item as MenuItem } from "rc-menu";
import Dropdown from "rc-dropdown";
import Summary from "@view/pages/profile/cardStatistic/summary/Summary";
import Charts from "@view/pages/profile/cardStatistic/charts/Charts";
import Log from "@view/pages/profile/cardStatistic/log/Log";
import Sessions from "@view/pages/profile/cardStatistic/sussions/Sessions";
import "./cardStatistic.css";

const CardStatistic = () => {
  const tabRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState("1");

  const handleOnClickItem = (e) => {
    setSelectedItem(e.key);
    tabRef.current.node.click();
  };

  const menuBattingItems = [
    <MenuItem className="dropdown-panel__item" key="1">
      Summary
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="2">
      Charts
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="3">
      Log
    </MenuItem>,
  ];

  const menuBatting = (
    <Menu
      selectable={false}
      onClick={handleOnClickItem}
      className="dropdown-panel dropdown-statistic"
    >
      {menuBattingItems}
    </Menu>
  );

  const renderBatting = () => {
    return (
      <TabPanel>
        {selectedItem === "1" && <Summary />}
        {selectedItem === "2" && <Charts />}
        {selectedItem === "3" && <Log />}
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
          <Tab ref={tabRef}>
            <Dropdown overlay={menuBatting}>
              <span>Batting</span>
            </Dropdown>
          </Tab>
          <Tab>Session Reports</Tab>
          <Tab>Comparison</Tab>
        </TabList>
        {renderBatting()}
        {renderSessions()}
        {renderComparison()}
      </Tabs>
    </div>
  );
};

export default CardStatistic;
