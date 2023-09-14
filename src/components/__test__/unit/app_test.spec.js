import { mount, shallowMount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from '../../../App.vue';
import RivalModal from '../../RivalModal.vue';
import Square from '../../Square.vue';
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";

beforeEach(async (ctx) => {
    const wrapper = shallowMount(App, {
        global: {
            plugins: [createTestingPinia({
                createSpy: () => { }
            })]
        }
    });
    ctx.wrapper = wrapper;
    setActivePinia(createPinia())
});

describe("The root app is render", () => {
    it("The title 'tres en raya' is show to user", ({ wrapper }) => {
        const component = wrapper.find('.text-5xl');
        expect(component.text()).toBe('Tres en raya')
    });
    it("The 'reiniciar' button will be render", ({ wrapper }) => {
        //Find by the tailwind class it set background color to button
        const component = wrapper.find('.bg-indigo-600');
        expect(component.classes()).toContain('bg-indigo-600');
    });
    it("When the user clicks in 'reiniciar' button the page will be reload", async () => {
        const fnMocekd = vi.fn();
        const wrapper = mount(App);
        wrapper.vm.restartGame = fnMocekd;
        const botButton = wrapper.find('.bg-indigo-600');
        await botButton.trigger('click');
        expect(fnMocekd).toHaveBeenCalledOnce(1);
    });
    it("The app must be render 9 squares", ({wrapper})=>{
        const squares = wrapper.findAllComponents(Square);
        expect(squares.length).toBe(9);
    });
});

describe("The modal component is render", () => {
    it("The modal is in App", ({ wrapper }) => {
        const modal = wrapper.findComponent(RivalModal);
        expect(modal.exists()).toBe(true);
    });
    it("The content prop will be 'Contra quien...'", () => {
        const wrapper = mount(App);
        const modal = wrapper.find(".font-bold.text-3xl.text-center");
        expect(modal.text()).toBe('¿Contra quién vas a  jugar?');
    });
    it("The bot button call one function", async () => {
        const fnMocekd = vi.fn();
        const wrapper = mount(App);
        wrapper.vm.selectRival = fnMocekd;
        const botButton = wrapper.find('.bg-emerald-600');
        await botButton.trigger('click');
        expect(fnMocekd).toHaveBeenCalledOnce();
    });
    it("The bot button will be open the difficulty modal", async () => {
        const wrapper = mount(App);
        const botButton = wrapper.find('.bg-emerald-600');
        await botButton.trigger('click');
        const hardButton = wrapper.find('.bg-orange-600');
        expect(hardButton.classes()).contain('bg-orange-600');
        expect(hardButton.text()).toBe('Difícil');
    });
    it("The 'jugador' button will be close the modal", async ()=>{
        const wrapper = mount(App);
        const fullModal = wrapper.find(".absolute.rounded-lg.flex");
        const playerButton = wrapper.find('.bg-red-700');
        await playerButton.trigger('click');
        const {style} = fullModal.element;
        expect(style._values.display).toBe('none');
    });
});