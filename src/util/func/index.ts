import translate from "../../../public/jsons/poke_lang.json";

export const getRandomNumber = (start: number, end: number): number =>
  Math.floor(Math.random() * (end - start + 1) + start);

export const fillZero = (str: string, width: number) =>
  str.length >= width ? str : new Array(width - str.length + 1).join("0") + str;

export const translateName = (id: number, lang: string) => {
  return (translate as any)[id][lang];
};
