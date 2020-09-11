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
  profile.position === "pitcher" || profile.position === "pitcher";

export const profileIsBatting = (profile) =>
  (profile.position && profile.position !== "pitcher") ||
  (profile.position2 && profile.position2 !== "pitcher");
