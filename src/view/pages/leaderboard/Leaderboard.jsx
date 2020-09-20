import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BattingLeaderboard from "./BattingLeaderboard/BattingLeaderboard";
import PitchingLeaderboard from "./PitchingLeaderboard/PitchingLeaderboard";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import { filterDate, filterPositions, filterFavorite } from "@constants";
import "./leaderboard.css";

const Leaderboard = () => {
  const filter = useState({});
  const [date, setDate] = useState(filterDate[0]);
  const [schoolName, setSchoolName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [position, setPosition] = useState(filterPositions[0]);
  const [age, setAge] = useState("");
  const [isFavorite, setIsFavorite] = useState(filterFavorite[0]);

  const menuDate = () => (
    <Menu
      selectable={false}
      onClick={handleOnClickType}
      className="dropdown-panel"
    >
      {topType &&
        topType.types.map((item) => (
          <MenuItem
            className="dropdown-panel__item"
            data-item={item.id}
            key={item.id}
          >
            {item.title}
          </MenuItem>
        ))}
    </Menu>
  );

  return (
    <div className="leaderboard__container">
      <div className="leaderboard">
        <div className="leaderboard__header">
          <div className="leaderboard__header-title">Leaderboard</div>
          <div className="l-header-filters">
            <div className="l-header-filters__date">
              {/*<ButtonDropdown text={"Date"} overlay={} />*/}
            </div>
            <div className="l-header-filters__school"></div>
            <div className="l-header-filters__team"></div>
            <div className="l-header-filters__position"></div>
            <div className="l-header-filters__age"></div>
            <div className="l-header-filters__favorite"></div>
          </div>
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab>Batting</Tab>
          <Tab>Pitching</Tab>
        </TabList>
        <TabPanel>
          <BattingLeaderboard />
        </TabPanel>
        <TabPanel>
          <PitchingLeaderboard />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
