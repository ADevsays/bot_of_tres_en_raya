import Square from '../../Square.vue';
import {beforeEach, describe, expect, it} from 'vitest';
import {mount, shallowMount} from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';
import { useSignUseStore } from '../../../store/signUse';


beforeEach(async (ctx) => {
    const wrapper = shallowMount(Square, {
        global: {
            plugins: [createTestingPinia({
                createSpy: () => { }
            })]
        }
    });
    ctx.wrapper = wrapper;
    setActivePinia(createPinia())
});

describe('The square will be render', ()=>{
    it('Renders square in screen', ({wrapper})=>{
        const component = wrapper.find('.transition-all');
        expect(component.classes()).toContain('place-content-center');
    });
    it('The first sign in game must be Circle', ()=>{
        const store = useSignUseStore();
        expect(store.signToUse).toBe('Circle');
    });
    it('The first sign to see when user made hover in Square must be Equis', 
    async ({wrapper})=>{
        const component = wrapper.find('.text-6xl');
        await component.trigger('mouseenter');
        const signToUse = wrapper.vm.signToUse;
        console.log('the sign', signToUse)
        
    });
});