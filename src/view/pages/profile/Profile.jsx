import React, { useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
import Sidebar from "@view/pages/profile/sidebar/Sidebar";
import { getProfile, getProfileIsLoading } from "@selectors/profileSelector";
import Spinner from "@commonComponents/spinner/Spinner";
import { profileDataRequest } from "@helpers/profileRequest";
import PitcherSummary from "./pitcherSummary/PitcherSummary";
import CardStatistic from "./cardStatistic/CardStatistic";
import PropTypes from "prop-types";
import "./profile.css";

export const ProfileContext = createContext();

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

  const updateProfile = (profile) => {
    setUserProfile(profile);
  };

  return !currentProfile || !userProfile || isLoading ? (
    <Spinner />
  ) : (
    <>
      {hasError ? (
        <div className="profile-error">{hasError}</div>
      ) : (
        <ProfileContext.Provider
          value={{ profile: userProfile, updateProfile }}
        >
          <div className="profile">
            <div className="profile__container">
              <div className="profile__content">
                <Sidebar />
                <main className="profile__main">
                  <PitcherSummary />
                  <CardStatistic />
                </main>
              </div>
            </div>
          </div>
        </ProfileContext.Provider>
      )}
    </>
  );
};

Profile.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
};

export default Profile;
