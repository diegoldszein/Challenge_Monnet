import axios from 'axios';

export async function getPokemonData(identifier: string | number) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  return response.data;
}
