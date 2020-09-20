export const schoolYearOptions = [
  { value: "freshman", label: "Freshman" },
  { value: "sophomore", label: "Sophomore" },
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
  { value: "none", label: "None" },
];

export const throwAndBatOptions = [
  { value: "r", label: "R" },
  { value: "l", label: "L" },
];

export const positionOptions = [
  { value: "catcher", label: "Catcher" },
  { value: "first_base", label: "First Base" },
  { value: "second_base", label: "Second Base" },
  { value: "shortstop", label: "Shortstop" },
  { value: "third_base", label: "Third Base" },
  { value: "outfield", label: "Outfield" },
  { value: "pitcher", label: "Pitcher" },
];

export const pitchTypes = [
  "None",
  "Four Seam Fastball",
  "Two Seam Fastball",
  "Curveball",
  "Changeup",
  "Slider",
];

export const sessionTypes = ["None", "Game", "Practice"];

export const cardStatisticItems = ["Summary", "Charts", "Log"];

export const initProfile = {
  first_name: "",
  last_name: "",
  biography: "",
  teams: [],
  facilities: [],
  throws_hand: "none",
  bats_hand: "none",
  position: null,
  position2: null,
  school: null,
  school_year: null,
};

export const topBattingType = [
  { id: 0, title: "Distance", field: "distance" },
  { id: 1, title: "Launch Angle", field: "launch_angle" },
  { id: 2, title: "Exit Velocity", field: "exit_velocity" },
];

export const topPitchingType = [
  { id: 0, title: "Pitch Velocity", field: "velocity" },
  { id: 1, title: "Spin Rate", field: "spin_rate" },
];

export const leaderboardBattingHeader = [
  "Rank",
  "Batter Name",
  "Age",
  "School",
  "Teams",
  "Exit Velocity",
  "Launch Angle",
  "Distance",
  "Favorite",
];

export const leaderboardBattingTypes = [
  { id: 0, title: "Exit Velocity", field: "exit_velocity" },
  { id: 1, title: "Carry Distance", field: "carry_distance" },
];

export const leaderboardPitchingHeader = [
  "Rank",
  "Pitcher Name",
  "Age",
  "School",
  "Teams",
  "Pitch Type",
  "Velocity",
  "Spin Rate",
  "Favorite",
];

export const leaderboardPitchingTypes = [
  { id: 0, title: "Pitch Velocity", field: "pitch_velocity" },
  { id: 1, title: "Spin Rate", field: "spin_rate" },
];

export const filterDate = [
  { id: 0, title: "All", field: null },
  { id: 1, title: "Last Week", field: "last_week" },
  { id: 2, title: "Last Month", field: "last_week" },
];

export const filterPositions = [
  { id: 0, title: "All", field: null },
  { id: 1, title: "Catcher", field: "catcher" },
  { id: 2, title: "First Base", field: "first_base" },
  { id: 3, title: "Second Base", field: "second_base" },
  { id: 4, title: "Shortstop", field: "shortstop" },
  { id: 5, title: "Third Base", field: "third_base" },
  { id: 6, title: "Outfield", field: "outfield" },
  { id: 7, title: "Pitcher", field: "pitcher" },
];

export const filterFavorite = [
  { id: 0, title: "All", field: false },
  { id: 1, title: "Favorite", field: true },
];
