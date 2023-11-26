
import pokemonApi from "@/api/pokemonApi";
const getPokemons = ()=>{
    const pokemonsArrs = Array.from(Array(650));
    return pokemonsArrs.map((_,index)=> index+1);
}

const getPokemonOptions = async ()=>{
  const mixedPokemons = getPokemons().sort(()=> Math.random() - 0.5);
  const pokemonOpts = await getPokemonData(mixedPokemons.splice(0, 4));
  return pokemonOpts;
}

const getPokemonData = async  (pokemons)=>{
    const resp = await Promise.all(pokemons.map(id => pokemonApi.get(`/${id}`))); 
    return resp.map((pok,ind) => ({name:pok.data.name,id:pokemons[ind]}))
}

export default getPokemonOptions;