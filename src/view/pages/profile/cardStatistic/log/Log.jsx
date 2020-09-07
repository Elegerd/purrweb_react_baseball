import React, { useContext, useEffect, useState } from "react";
import { battingLogRequest } from "@helpers/dataRequest";
import { ProfileContext } from "@view/pages/profile/Profile";
import "./log.css";

const Log = () => {
  const { profile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [battingLog, setBattingLog] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await battingLogRequest({
          profile_id: profile.id,
          count: 10,
          offset: 0,
        });
        setBattingLog(response);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="log__wrapper">
      <div className="log-search">
        <div className="log-search__input"></div>
        <div className="log-search__type"></div>
      </div>
      <div className="log-search__title">Batting Log</div>
      <div className="log-search__log-table">
        <div className="log-table__header c-table__header">
          <div className="log-table__item c-table__header-item">Date</div>
          <div className="log-table__item c-table__header-item">
            Pitcher Name
          </div>
          <div className="log-table__item c-table__header-item">
            Pitcher Handedness
          </div>
          <div className="log-table__item c-table__header-item">Pitch Type</div>
          <div className="log-table__item c-table__header-item">Pitch Call</div>
        </div>
        <div className="log-table__content c-table__content">
          {true ? "There's no info yet!" : null}
        </div>
      </div>
    </div>
  );
};

export default Log;
