export const getBattingSummary = (state) => state.battingSummary.data;

export const getBattingSummaryError = (state) => state.battingSummary.error;

export const getBattingSummaryIsLoading = (state) =>
  state.battingSummary.loading;
