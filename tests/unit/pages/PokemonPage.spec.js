import { shallowMount, mount } from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';
import { pokemons } from '../mocks/pokemons.mock';

describe('`PokemonPage Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage);
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('debe de llamar el mixPokemonArray al montar', () => {
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');
        shallowMount(PokemonPage);
        expect(mixPokemonArraySpy).toHaveBeenCalled();
    })

    test('debe de hacer match con el snapshot, cuando cargan los pokemon', () => {
        const wrapper = mount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('debe de mostrar los componentes PokemonPicture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })
        const pokemonPicture = wrapper.find('pokemon-picture-stub');
        expect(pokemonPicture.exists()).toBeTruthy();
        expect(pokemonPicture.attributes('pokemonid')).toBe('1');
        const pokemonOptions = wrapper.find('pokemon-options-stub');
        expect(pokemonOptions.exists()).toBeTruthy();
        expect(pokemonOptions.attributes('pokemons')).toBeTruthy();
    })

    test('pruebas con checkAnswer',async()=>{
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })
        await wrapper.vm.checkAnswer(1);
        const h2 = wrapper.find('h2');
        expect(h2.exists()).toBeTruthy();
        expect(h2.text()).toBe(`Correcto!, ${pokemons[0].name}`)
        expect(wrapper.vm.showPokemon).toBe(true);   
    })
    

})