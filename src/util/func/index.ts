export const getRandomNumber = (start: number, end: number): number =>
  Math.floor(Math.random() * (end - start + 1) + start);
