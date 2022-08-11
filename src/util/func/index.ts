import translate from "../../../public/jsons/poke_lang.json";

export const getRandomNumber = (start: number, end: number): number =>
  Math.floor(Math.random() * (end - start + 1) + start);

export const translateName = (id: number, lang: string) => {
  return (translate as any)[id][lang];
};
