import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@view/pages/profile/sidebar/Sidebar";
import {
  getProfile,
  getProfileIsLoading,
} from "@ducks/profile/profileSelector";
import Spinner from "@commonComponents/spinner/Spinner";
import { fetchViewedProfileData } from "@ducks/viewedProfile/viewedProfileRoutines";
import CardSummary from "./cardSummary/CardSummary";
import CardStatistic from "./cardStatistic/CardStatistic";
import {
  getViewedProfile,
  getViewedProfileError,
  getViewedProfileIsLoading,
} from "@ducks/viewedProfile/viewedProfileSelector";
import PropTypes from "prop-types";
import "./profile.css";

const Profile = ({ match: { params } }) => {
  const dispatch = useDispatch();
  const [isUserProfile, setIsUserProfile] = useState(null);
  const currentProfile = useSelector(getProfile);
  const viewedProfile = useSelector(getViewedProfile);
  const isLoadingViewedProfile = useSelector(getViewedProfileIsLoading);
  const viewedProfileError = useSelector(getViewedProfileError);
  const isLoadingProfile = useSelector(getProfileIsLoading);

  useEffect(() => {
    const profileId =
      typeof params.id !== "undefined" ? params.id : currentProfile.id;
    setIsUserProfile(typeof params.id === "undefined");
    dispatch(fetchViewedProfileData({ id: profileId }));
  }, [params]);

  return !currentProfile ||
    !viewedProfile ||
    isLoadingProfile ||
    isLoadingViewedProfile ? (
    <Spinner />
  ) : (
    <>
      {viewedProfileError ? (
        <div className="profile-error">{viewedProfileError}</div>
      ) : (
        <div className="profile">
          <div className="profile__container">
            <div className="profile__content">
              <Sidebar profile={viewedProfile} isUserProfile={isUserProfile} />
              <main className="profile__main">
                <CardSummary />
                <CardStatistic isUserProfile={isUserProfile} />
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
