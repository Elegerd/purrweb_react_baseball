import React, { memo } from "react";
import { Field } from "react-final-form";
import CustomTextarea from "@commonComponents/customTextarea/CustomTextarea";
import PropTypes from "prop-types";

const AboutProfileBlock = ({ profile }) => {
  return (
    <>
      <div className="edit-profile__block-title">
        <div className="edit-profile__block-text">About</div>
      </div>
      <div className="edit-profile__about">
        <Field
          defaultValue={profile.biography}
          name="biography"
          placeholder={"Describe yourself in a few words"}
          component={CustomTextarea}
        />
      </div>
    </>
  );
};

AboutProfileBlock.propTypes = {
  profile: PropTypes.object,
};

export default memo(AboutProfileBlock);
