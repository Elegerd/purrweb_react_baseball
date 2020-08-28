export const firstLetterToUppercase = (string) =>
  string && string.length ? string[0].toUpperCase() + string.substring(1) : "";

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
