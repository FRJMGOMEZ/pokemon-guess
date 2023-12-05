import getPokemonOptions, { getPokemons, getPokemonData } from '@/helpers/getPokemonsOptions';




describe('getPokemonsOptionsHelpers', () => {
    test('getPokemons - debe de regresar un arreglo de números', () => {
        const pokemons = getPokemons();
        expect(pokemons.length).toBe(650);
    });
    test('getPokemonData - debe de retornar un arreglo de 4 elementos con nombres determinados', async () => {
        const fourPokemons = [1, 2, 3, 4];
        const pokemonsWithNames = await getPokemonData(fourPokemons);
        expect(pokemonsWithNames.length).toBe(4);
        const allPokemonHaveNames = pokemonsWithNames.reduce((allPokemonHaveNames, pokemon) => {
            if (allPokemonHaveNames && !pokemon.name) {
                allPokemonHaveNames = false;
            }
            return allPokemonHaveNames;
        }, true);
        expect(allPokemonHaveNames).toBeTruthy();
    });
    test('getPokemonOptions - debe de devolver un array de 4 pokemon mezclados', async () => {
        const pokemons = await getPokemonOptions();
        expect(pokemons.length).toBe(4);
        expect(pokemons).toEqual(
            [
                {
                    name: expect.any(String),
                    id: expect.any(Number)
                },
                {
                    name: expect.any(String),
                    id: expect.any(Number)
                },
                {
                    name: expect.any(String),
                    id: expect.any(Number)
                },
                {
                    name: expect.any(String),
                    id: expect.any(Number)
                }
            ]
        )
        console.log({ pokemons });
    })
});
