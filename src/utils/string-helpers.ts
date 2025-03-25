export const removeNonIntegersFromString = (str: string | null): string => {
  if (!str) return "";
  return str.replace(/\D/g, "");
};

const SPECIAL_CHARACTERS = ["@", "$", "!", "%", "*", "?", "&"];

export const checkIfHasSpecialCharacters = (str: string): boolean =>
  SPECIAL_CHARACTERS.some((character) => str.includes(character));

export const checkIfHasUpperCase = (str: string): boolean => !!str.match(/[A-Z]/);
export const checkIfHasLoweCase = (str: string): boolean => !!str.match(/[a-z]/);
export const checkIfHasNumbers = (str: string): boolean => /\d/.test(str);

export const checkIfIsAllSameDigit = (str: string): boolean => {
  let allSameDigit = true;
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[0]) {
      allSameDigit = false;
      break;
    }
  }
  return allSameDigit;
};
export const emptyStringToNull = <T>(value: T): T | null => {
  if (typeof value === "string" && value.trim() === "") {
    return null;
  }
  return value;
};

export const normalizeEmptyStrings = <T extends { [key: string]: unknown }>(data: T): T =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, emptyStringToNull(value)])
  ) as T;
