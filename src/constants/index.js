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
