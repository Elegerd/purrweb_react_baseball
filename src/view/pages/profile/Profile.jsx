import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "@view/pages/profile/sidebar/Sidebar";
import { getProfile, getProfileIsLoading } from "@selectors/profileSelector";
import Spinner from "@commonComponents/spinner/Spinner";
import { profileDataRequest } from "@helpers/profileRequest";
import ProgressBars from "./progressBars/ProgressBars";
import CardStatistic from "./cardStatistic/CardStatistic";
import PropTypes from "prop-types";
import "./profile.css";

const Profile = ({ match: { params } }) => {
  const [hasError, setHasError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const currentProfile = useSelector(getProfile);
  const isLoading = useSelector(getProfileIsLoading);

  useEffect(() => {
    (async () => {
      try {
        const profileId =
          typeof params.id !== "undefined" ? params.id : currentProfile.id;
        const {
          data: { profile },
        } = await profileDataRequest({ id: profileId });
        setUserProfile(profile);
        setHasError(null);
      } catch (e) {
        setHasError(e);
      }
    })();
  }, [params]);

  return !currentProfile || !userProfile || isLoading ? (
    <Spinner />
  ) : (
    <>
      {hasError ? (
        <div className="profile-error">{hasError}</div>
      ) : (
        <div className="profile">
          <div className="profile__container">
            <div className="profile__content">
              <Sidebar profile={userProfile} />
              <main className="profile__main">
                <ProgressBars />
                <CardStatistic />
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Profile.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
};

export default Profile;
