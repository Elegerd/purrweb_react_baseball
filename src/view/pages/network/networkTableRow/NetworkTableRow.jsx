import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartO } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

const NetworkTableRow = ({ item, onClickFavorite }) => {
  return (
    <div className="network-row network__row c-table__row">
      <div className="network-row__item">
        <Link className="network-row__link" to={`/profile/${item.id}`}>
          {`${item.first_name} ${item.last_name}`}
        </Link>
      </div>
      <div className="network-row__item">
        {item.events.length ? item.events.length : "-"}
      </div>
      <div className="network-row__item">
        {item.school ? item.school.name : "-"}
      </div>
      <div className="network-row__item">
        {item.teams.length ? item.teams[0].name : "-"}
      </div>
      <div className="network-row__item">{item.age || "-"}</div>
      <div className="network-row__item">
        <FontAwesomeIcon
          className="icon blue-icon icon-button"
          onClick={onClickFavorite({
            profile_id: item.id,
            favorite: !item.favorite,
          })}
          icon={item.favorite ? faHeart : faHeartO}
        />
      </div>
    </div>
  );
};

NetworkTableRow.propTypes = {
  item: PropTypes.object,
  onClickFavorite: PropTypes.func,
};

export default NetworkTableRow;
