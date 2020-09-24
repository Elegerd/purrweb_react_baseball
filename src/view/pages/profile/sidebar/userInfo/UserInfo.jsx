import React from "react";
import { Edit, Heart, HeartFill } from "@commonComponents/svg";
import { letterToUppercase } from "@helpers/utilities";
import user from "@assets/img/user.png";
import PropTypes from "prop-types";

const UserInfo = ({ profile, isUserProfile, onClickEdit, onClickLike }) => {
  const { avatar, first_name, last_name, position, position2 } = profile;
  const avatarUrl = avatar ? avatar : user;

  return (
    <div className="user-info">
      {isUserProfile === true && (
        <button className="edit-button" onClick={onClickEdit}>
          <span>
            <Edit />
          </span>
        </button>
      )}
      {isUserProfile === false && (
        <button className="like-button" onClick={onClickLike}>
          <span>{profile.favorite ? <HeartFill /> : <Heart />}</span>
        </button>
      )}
      <div className="user-info__avatar">
        <div className="avatar__container">
          <div
            className="avatar"
            alt={`User Photo - ${first_name} ${last_name}`}
            style={{ backgroundImage: `url(${avatarUrl})` }}
          />
        </div>
      </div>
      <div className="user-info__name-and-role">
        <div className="user-info__name">{`${first_name || ""} ${
          last_name || ""
        }`}</div>
        {position && (
          <div className="user-info__first-role">
            {letterToUppercase(position)}
          </div>
        )}
        {position2 && (
          <div className="user-info__second-role">
            {letterToUppercase(position2)}
          </div>
        )}
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  profile: PropTypes.object,
  isUserProfile: PropTypes.bool,
  onClickEdit: PropTypes.func,
  onClickLike: PropTypes.func,
};

export default UserInfo;
