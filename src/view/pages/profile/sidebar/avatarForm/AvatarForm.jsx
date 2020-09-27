import React, { memo } from "react";
import { Form, Field } from "react-final-form";
import AvatarInput from "./avatarInput/AvatarInput";
import PropTypes from "prop-types";
import "./avatarForm.css";

const AvatarForm = ({ profile }) => {
  const onSubmit = async (values) => {
    console.log("Submit");
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values: { avatarFile } }) => {
        const isChooseAvatar = avatarFile;
        const avatar = isChooseAvatar ? avatarFile.base64 : profile.avatar;
        return (
          <form>
            <div className="avatar-form">
              <div className="avatar-form__container">
                <div className="avatar__container">
                  <div
                    className="avatar"
                    alt={`User Photo - ${profile.first_name} ${profile.last_name}`}
                    style={{ backgroundImage: `url(${avatar})` }}
                  />
                </div>
              </div>
              <div className="choose-avatar">
                <div className="choose-avatar__container">
                  <div className="choose-avatar__input">
                    <Field
                      name="avatarFile"
                      type="file"
                      id="avatar-file"
                      accept="image/png,image/jpeg,image/jpg"
                      component={AvatarInput}
                    />
                  </div>
                  {isChooseAvatar && (
                    <div className="file-name">
                      <label htmlFor="avatar-file">{avatarFile.name}</label>
                    </div>
                  )}
                  <div className="choose-avatar__upload-photo">
                    {isChooseAvatar ? (
                      <div className="submit-photo">
                        <div className="submit-photo__submit-avatar">
                          <a onClick={handleSubmit} className="submit-avatar">
                            Upload Photo
                          </a>
                        </div>
                        <a
                          onClick={form.reset}
                          htmlFor="avatar-file"
                          className="cancel-avatar"
                        >
                          Cancel
                        </a>
                      </div>
                    ) : (
                      <div className="upload-photo">
                        <label
                          htmlFor="avatar-file"
                          className="upload-photo__label"
                        >
                          Choose Photo
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};

AvatarForm.propTypes = {
  profile: PropTypes.object,
};

export default memo(AvatarForm);
