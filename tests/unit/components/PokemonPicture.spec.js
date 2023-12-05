
import { shallowMount } from '@vue/test-utils';
import PokemonPicture from '@/components/PokemonPicture';

describe('PokemonPicture component', () => {

    test('debe de hacer match con snapshot', () => {
        const wrapper = shallowMount(PokemonPicture,{props:{showPokemon:false}});
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('Debe de mostrar la imagen oculta y el pokemon 100', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,

                showPokemon: false
            }
        });
        const [img1, img2] = wrapper.findAll('img');
        expect(img1.exists()).toBeTruthy();
        expect(img2).toBeUndefined();
        expect(img1.classes('hidden-pokemon')).toBeTruthy();
     /*    expect() */
    })

    test('debe de mostrar el pokmemon si showPokemon está en true', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,

                showPokemon: true
            }
        });
        const img = wrapper.find('img');
        expect(img.exists()).toBeTruthy();
        expect(img.classes('hidden-pokemon')).toBeFalsy();
        expect(img.classes('fade-in')).toBeTruthy();
        expect(img.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg');
    })
})
