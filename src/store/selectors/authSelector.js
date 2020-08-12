export const getAuth = (state) => state.auth.data;

export const getIsAuth = (state) => !!state.auth.data;

export const getAuthError = (state) => state.auth.error;

export const getAuthIsLoading = (state) => state.auth.loading;
