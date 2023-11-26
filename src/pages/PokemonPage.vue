
<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>Quién es este pokémon?</h1>
    <PokemonPicture :pokemon-id="pokemon?.id" :show-pokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer($event)" />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame()">Nuevo juego</button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from "../components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";
import getPokemonsOptions from "@/helpers/getPokemonsOptions";

getPokemonsOptions();
export default {
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: null,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonsOptions();
      this.pokemon = this.pokemonArr[Math.floor(Math.random() * 4)];
    },
    checkAnswer(pokemonId) {
      if (this.pokemon.id === pokemonId) {
        this.showPokemon = true;
        this.showAnswer = true;
        this.message = `Correcto!, ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.mixPokemonArray().then(() => {
        this.showPokemon = false;
        this.showAnswer = false;
        this.message = "";
      });
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style>

button{
   cursor: pointer;
  }
</style>

