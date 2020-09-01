export const letterToUppercase = (string) =>
  string && string.length
    ? string
        .replace(/_/g, " ")
        .split(/\s+/)
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(" ")
    : "";

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
