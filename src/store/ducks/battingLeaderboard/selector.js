export const getBattingLeaderboard = (state) => state.battingLeaderboard.data;

export const getBattingLeaderboardError = (state) =>
  state.battingLeaderboard.error;

export const getBattingLeaderboardIsLoading = (state) =>
  state.battingLeaderboard.loading;
