import axios from "axios";
import { getRandomNumber } from "../util/func";

export const getRandomPokemon = async () => {
  const id = getRandomNumber(1, 251);
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return data;
};
