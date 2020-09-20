import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BattingLeaderboard from "./BattingLeaderboard/BattingLeaderboard";
import PitchingLeaderboard from "./PitchingLeaderboard/PitchingLeaderboard";
import "./leaderboard.css";

const Leaderboard = () => {
  const [date, setDate] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [position, setPosition] = useState(null);
  const [age, setAge] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="leaderboard__container">
      <div className="leaderboard">
        <div className="leaderboard__header">
          <div className="leaderboard__header-title">Leaderboard</div>
          <div className="l-header-filters">
            <div className="l-header-filters__date"></div>
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
