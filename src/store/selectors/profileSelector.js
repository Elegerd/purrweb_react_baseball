export const getProfile = (state) =>
  state.profile.data && state.profile.data.profile
    ? state.profile.data.profile
    : null;

export const getCurrentProfile = (state) =>
  state.profile.data && state.profile.data.currentProfile
    ? state.profile.data.currentProfile
    : null;

export const getProfileError = (state) => state.profile.error;

export const getProfileIsLoading = (state) => state.profile.loading;
