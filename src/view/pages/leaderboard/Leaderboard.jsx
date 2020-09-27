import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BattingLeaderboard from "./battingLeaderboard/BattingLeaderboard";
import PitchingLeaderboard from "./pitchingLeaderboard/PitchingLeaderboard";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import HiddenInput from "@commonComponents/hiddenInput/HiddenInput";
import CustomMenu from "@commonComponents/customMenu/CustomMenu";
import { filterDate, filterPositions, filterFavorite } from "@constants";
import { getObjectById } from "@helpers/utilities";
import "./leaderboard.css";

const Leaderboard = () => {
  const [date, setDate] = useState(filterDate[0]);
  const [schoolName, setSchoolName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [position, setPosition] = useState(filterPositions[0]);
  const [age, setAge] = useState("");
  const [favorite, setFavorite] = useState(filterFavorite[0]);

  const handleOnClickDateItem = (e) => {
    const type = getObjectById(filterDate, e.item.props["data-item"]);
    setDate(type);
  };

  const handleOnClickPositionItem = (e) => {
    const type = getObjectById(filterPositions, e.item.props["data-item"]);
    setPosition(type);
  };

  const handleOnClickFavoriteItem = (e) => {
    const type = getObjectById(filterFavorite, e.item.props["data-item"]);
    setFavorite(type);
  };

  const filter = {
    date: date.field || undefined,
    age: parseInt(age, 10) || undefined,
    favorite: favorite.field ? 1 : undefined,
    position: position.field || undefined,
    school: schoolName || undefined,
    team: teamName || undefined,
  };

  return (
    <div id="container" className="leaderboard__container">
      <div className="leaderboard">
        <div className="leaderboard__header">
          <div className="leaderboard__header-title">Leaderboard</div>
          <div className="l-header-filters">
            <div className="l-header-filters__date">
              <ButtonDropdown
                trigger={["click"]}
                text={`Date${date.field ? ` (${date.title})` : ""}`}
                buttonClass={"l-header-filters__button"}
                arrowContainerClass={"l-header-filters__arrow"}
                overlay={() => (
                  <CustomMenu
                    items={filterDate}
                    onClick={handleOnClickDateItem}
                  />
                )}
              />
            </div>
            <div className="l-header-filters__school">
              <HiddenInput
                value={schoolName}
                inputClass={"l-header-filters__input-school"}
                arrowContainerClass={"l-header-filters__arrow-hidden"}
                name={"school"}
                placeholder={"School"}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
            <div className="l-header-filters__team">
              <HiddenInput
                value={teamName}
                inputClass={"l-header-filters__input-team"}
                arrowContainerClass={"l-header-filters__arrow-hidden"}
                name={"team"}
                placeholder={"Team"}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="l-header-filters__position">
              <ButtonDropdown
                trigger={["click"]}
                text={`${position.field ? `${position.title}` : "Position"}`}
                buttonClass={"l-header-filters__button"}
                arrowContainerClass={"l-header-filters__arrow"}
                overlay={() => (
                  <CustomMenu
                    items={filterPositions}
                    onClick={handleOnClickPositionItem}
                  />
                )}
              />
            </div>
            <div className="l-header-filters__age">
              <HiddenInput
                value={age}
                inputClass={"l-header-filters__input-age"}
                arrowContainerClass={"l-header-filters__arrow-hidden"}
                type={"number"}
                min={6}
                max={30}
                name={"age"}
                placeholder={"Age"}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="l-header-filters__favorite">
              <ButtonDropdown
                trigger={["click"]}
                text={`${favorite.field ? `${favorite.title}` : "All"}`}
                buttonClass={"l-header-filters__button"}
                arrowContainerClass={"l-header-filters__arrow"}
                overlay={() => (
                  <CustomMenu
                    items={filterFavorite}
                    onClick={handleOnClickFavoriteItem}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab>Batting</Tab>
          <Tab>Pitching</Tab>
        </TabList>
        <TabPanel>
          <BattingLeaderboard filter={filter} />
        </TabPanel>
        <TabPanel>
          <PitchingLeaderboard filter={filter} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
