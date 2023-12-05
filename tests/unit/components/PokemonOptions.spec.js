import { shallowMount } from '@vue/test-utils';
import PokemonOptions from '@/components/PokemonOptions';
import {pokemons} from '../mocks/pokemons.mock';

describe('PokemonOptions Component', () => {

    let wrapper;
    beforeEach(()=>{
        wrapper = shallowMount(PokemonOptions, { props: { pokemons } });
    })
    

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('Debe de mostrar las 4 opciones correctamente',()=>{
        const liArr = wrapper.findAll('li');
        expect(liArr.length).toBe(4);
        liArr.forEach((_,index)=>{
             expect(liArr[index].text()).toBe(pokemons[index].name);
        });
    })

    

    test('debe de emitir "selection-pokemon" con sus respectivos parámetros al hacer click',()=>{
        const liArr= wrapper.findAll('li');
        liArr.forEach((_, index) => {
            liArr[index].trigger('click');

            /// cuantas veces se ha disparado el resgitro ///
            const emissionsRegister = wrapper.emitted('selection');
            expect(emissionsRegister.length).toBe(index + 1);

            //// valores de la emisión de evento ////
            const emissionValues = emissionsRegister[index];
            expect(emissionValues.length).toBe(1);

            ///// primer valor de emisión /////
            const emissionFirstValue = emissionValues[0];
            expect(emissionFirstValue).toBe(pokemons[index].id);
        });   
    })
})
 