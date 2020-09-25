export const letterToUppercase = (string) =>
  string && string.length
    ? string
        .replace(/_/g, " ")
        .split(/\s+/)
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(" ")
    : "";

export const handleRequestError = (response) => {
  if (typeof response.errors !== "undefined") throw new Error(response.errors);
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const profileIsPitching = (profile) =>
  profile.position === "pitcher" || profile.position2 === "pitcher";

export const profileIsBatting = (profile) =>
  (profile.position && profile.position !== "pitcher") ||
  (profile.position2 && profile.position2 !== "pitcher");

export const getObjectById = (array, id) => {
  return array.find((item) => item.id === id) || null;
};

export const setProfileValidField = (profile) => {
  profile.bats_hand = profile.bats_hand ? profile.bats_hand.value : "none";
  profile.throws_hand = profile.throws_hand
    ? profile.throws_hand.value
    : "none";
  profile.position = profile.position ? profile.position.value : null;
  profile.position2 = profile.position2 ? profile.position2.value : null;
  profile.facilities = profile.facilities.map((faculty) => {
    return { id: faculty.value, u_name: faculty.label };
  });
  profile.school = profile.school
    ? { id: profile.school.value, name: profile.school.label }
    : "";
  profile.feet = parseInt(profile.feet, 10) || 1;
  profile.inches = parseInt(profile.inches, 10) || 0;
  profile.weight = parseInt(profile.weight, 10) || 1;
  profile.age = parseInt(profile.age, 10) || 1;
  profile.school_year = profile.school_year ? profile.school_year.value : null;
  profile.teams = profile.teams.map((team) => {
    return { id: team.value, name: team.label };
  });
  return profile;
};

export const getRequiredProfileFields = (profile) => {
  return {
    id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    position: profile.position,
    position2: profile.position2,
    avatar: profile.avatar,
    throws_hand: profile.throws_hand,
    bats_hand: profile.bats_hand,
    biography: profile.biography,
    school_year: profile.school_year,
    feet: profile.feet,
    inches: profile.inches,
    weight: profile.weight,
    age: profile.age,
    school: profile.school,
    teams: profile.teams,
    facilities: profile.facilities,
  };
};
