import React, { useRef, useState, useEffect, useCallback } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Menu, { Item as MenuItem } from "rc-menu";
import Dropdown from "rc-dropdown";
import BattingSummary from "@view/pages/profile/cardStatistic/battingSummary/BattingSummary";
import BattingCharts from "@view/pages/profile/cardStatistic/battingCharts/BattingCharts";
import BattingLog from "@view/pages/profile/cardStatistic/battingLog/BattingLog";
import PitchingSummary from "@view/pages/profile/cardStatistic/pitchingSummary/PitchingSummary";
import PitchingCharts from "@view/pages/profile/cardStatistic/pitchingCharts/PitchingCharts";
import PitchingLog from "@view/pages/profile/cardStatistic/pitchingLog/PitchingLog";
import Sessions from "@view/pages/profile/cardStatistic/sussions/Sessions";
import Comparison from "@view/pages/profile/cardStatistic/comparison/Comparison";
import { profileIsBatting, profileIsPitching } from "@helpers/utilities";
import { cardStatisticItems } from "@constants";
import PropTypes from "prop-types";
import "./cardStatistic.css";
import "./summary.css";
import "./log.css";

const CardStatistic = ({ profile, isUserProfile }) => {
  const tabBattingRef = useRef(null);
  const tabPitchingRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState("0");
  const [isPitching, setIsPitching] = useState(false);
  const [isBatting, setIsBatting] = useState(false);

  useEffect(() => {
    setIsPitching(profileIsPitching(profile));
    setIsBatting(profileIsBatting(profile));
  }, [profile]);

  const handleOnClickBattingItem = (e) => {
    setSelectedItem(e.key);
    tabBattingRef.current.node.click();
  };

  const handleOnClickPitchingItem = (e) => {
    setSelectedItem(e.key);
    tabPitchingRef.current.node.click();
  };

  const renderMenuBatting = useCallback(
    () => (
      <Menu
        selectable={false}
        onClick={handleOnClickBattingItem}
        className="dropdown-panel dropdown-statistic"
      >
        {cardStatisticItems.map((value, index) => (
          <MenuItem className="dropdown-panel__item" key={index}>
            {value}
          </MenuItem>
        ))}
      </Menu>
    ),
    [cardStatisticItems]
  );

  const renderMenuPitching = useCallback(
    () => (
      <Menu
        selectable={false}
        onClick={handleOnClickPitchingItem}
        className="dropdown-panel dropdown-statistic"
      >
        {cardStatisticItems.map((value, index) => (
          <MenuItem className="dropdown-panel__item" key={index}>
            {value}
          </MenuItem>
        ))}
      </Menu>
    ),
    [cardStatisticItems]
  );

  const renderTabPanels = () => (
    <>
      {isPitching && (
        <TabPanel>
          {selectedItem === "0" && <PitchingSummary />}
          {selectedItem === "1" && <PitchingCharts />}
          {selectedItem === "2" && <PitchingLog />}
        </TabPanel>
      )}
      {isBatting && (
        <TabPanel>
          {selectedItem === "0" && <BattingSummary />}
          {selectedItem === "1" && <BattingCharts />}
          {selectedItem === "2" && <BattingLog />}
        </TabPanel>
      )}
      {isUserProfile && (
        <TabPanel>
          <Sessions />
        </TabPanel>
      )}
      <TabPanel>
        <Comparison profile={profile} />
      </TabPanel>
    </>
  );

  return (
    <div className="card-statistic c-card">
      <Tabs>
        <TabList>
          {isPitching && (
            <Tab ref={tabPitchingRef}>
              <Dropdown overlay={renderMenuPitching()}>
                <span>Pitching</span>
              </Dropdown>
            </Tab>
          )}
          {isBatting && (
            <Tab ref={tabBattingRef}>
              <Dropdown overlay={renderMenuBatting()}>
                <span>Batting</span>
              </Dropdown>
            </Tab>
          )}
          {isUserProfile && <Tab>Session Reports</Tab>}
          <Tab>Comparison</Tab>
        </TabList>
        {renderTabPanels()}
      </Tabs>
    </div>
  );
};

CardStatistic.propTypes = {
  profile: PropTypes.object,
  isUserProfile: PropTypes.bool,
};

export default CardStatistic;
