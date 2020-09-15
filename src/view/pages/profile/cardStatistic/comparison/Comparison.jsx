import React from "react";
import { useSelector } from "react-redux";
import { getViewedProfile } from "@ducks/viewedProfile/viewedProfileSelector";
import user from "@assets/img/user.png";
import PropTypes from "prop-types";
import "./comparison.css";

const Comparison = ({}) => {
  const viewedProfile = useSelector(getViewedProfile);
  const avatarUrl = viewedProfile.avatar ? viewedProfile.avatar : user;

  return (
    <div className="comparison__container">
      <div className="comparison">
        <div className="comparison__header">
          <div className="c-header__left-profile">
            <div className="c-header__avatar">
              <div
                alt={`User Photo - ${viewedProfile.first_name} ${viewedProfile.last_name}`}
                style={{ backgroundImage: `url(${avatarUrl})` }}
              />
            </div>
            <button className="left-profile__button">{`${viewedProfile.first_name} ${viewedProfile.last_name}`}</button>
          </div>
          <div className="c-header__right-profile">
            <div className="c-header__avatar">
              <div style={{ backgroundImage: `url(${user})` }} />
            </div>
            <div className="rp-search"></div>
          </div>
        </div>
        <div className="comparison__content">
          <div className="comparison-age comparison-row">
            <div>Age:&nbsp;&nbsp; {viewedProfile.age || "-"}</div>
            <div>Age:&nbsp;&nbsp; {"-"}</div>
          </div>
          <div className="comparison-height comparison-row">
            <div>
              Height:&nbsp;&nbsp;{" "}
              {`${viewedProfile.feet || 0} ft ${
                viewedProfile.inches || 0
              } in` || "-"}
            </div>
            <div>Height:&nbsp;&nbsp; {"-"}</div>
          </div>
          <div className="comparison-weight comparison-row">
            <div>Weight:&nbsp;&nbsp; {viewedProfile.weight || "-"}</div>
            <div>Weight:&nbsp;&nbsp; {"-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comparison.propTypes = {};

export default Comparison;
