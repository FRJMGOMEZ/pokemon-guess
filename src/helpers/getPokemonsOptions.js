
import pokemonApi from "@/api/pokemonApi";
export const getPokemons = ()=>{
    const pokemonsArrs = Array.from(Array(650));
    return pokemonsArrs.map((_,index)=> index+1);
}

export const getPokemonData = async  (pokemons)=>{
    const resp = await Promise.all(pokemons.map(id => pokemonApi.get(`/${id}`))); 
    return resp.map((pok,ind) => ({name:pok.data.name,id:pokemons[ind]}))
}

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const pokemonOpts = await getPokemonData(mixedPokemons.splice(0, 4));
  return pokemonOpts;
}

export default getPokemonOptions;