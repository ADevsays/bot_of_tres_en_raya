<script setup>
import { onMounted, ref, watch } from 'vue';
import Equis from '../components/SVG/Equis.vue';
import Circle from '../components/SVG/Circle.vue';
import { limitBorder } from '../helpers/limitBorder';
import { base3 } from '../helpers/base3';
import { useSignUseStore } from '../store/signUse';
import { useBot } from '../store/bot';
import {useAudio} from '../store/controlAudio';
import { POSSIBLE_SIGNS } from '../const/signs';
import { WHO_PLAY } from '../const/bot_or_player';
import {playSounds} from '../helpers/playSounds';
import { disableAutoUnmount } from '@vue/test-utils';
//Define store
const store = useSignUseStore();
const storeBot = useBot();
const storeAudio = useAudio();
//Define props
const props = defineProps({
    square: Number,
});
const { square } = props;

//Define states
const borderLimit = ref('');
const signToUse = ref('');
const changeOnce = ref(true);
const changeColorA = ref('text-red-700');
const changeColorB = ref('text-green-700');
const hoverState = ref(false);
//Cicle of life methods
onMounted(() => {
    borderLimit.value = limitBorder(square);
});

//Emit

const emit = defineEmits(['getTheSquare']);



//Methods
function updateState() {
    //Check if the global state allow play sound
    const {botOrPlayer, difficulty} = storeBot;
    const canPlayAudio = storeAudio.canUseAudio && botOrPlayer && difficulty && !store.finishPlay;
    if (canPlayAudio) playSounds();
    
    if (changeOnce.value && !store.finishPlay && storeBot.botOrPlayer && difficulty) {
        //Check if the user try do click before the bot thinks
        //Bloque que se intente jugar antes de que el bot juegue.
        const {botOrPlayer, canPlay} = storeBot;
        const timePass = botOrPlayer == WHO_PLAY.bot && !canPlay;
        if(timePass) return;

        store.updateState();
        signToUse.value = store.signToUse;
        hoverState.value = false;
        changeOnce.value = false;
        emit('getTheSquare', { position: square, sign: signToUse.value });
    };
};

function asyncTransition(reactive) {
    setTimeout(() => {
        reactive.value = `text-yellow-400`;
    }, (base3(square) * 100));
};

function setHover() {
    if (changeOnce.value 
        && !store.finishPlay 
        && storeBot.botOrPlayer) {
        const {circle, equis} = POSSIBLE_SIGNS;
        const checkSignStore = store.signToUse == circle ? equis : circle;
        signToUse.value = checkSignStore;
        hoverState.value = true;
    }
    if (storeBot.botOrPlayer == WHO_PLAY.bot 
        && changeOnce.value 
        && !store.finishPlay) {
        signToUse.value = POSSIBLE_SIGNS.equis;
    }
};

function exitHover() {
    if (hoverState.value && changeOnce.value ) {
        signToUse.value = '';
        hoverState.value = false;
    }
}

//Watchers
watch(() => store.finishPlay, () => {
    const { winner, arrayWinner } = store.winnerData;
    if (arrayWinner.includes(square)) {
        if (winner == POSSIBLE_SIGNS.equis) {
            asyncTransition(changeColorA);
        }
        else {
            asyncTransition(changeColorB);
        }
    };
});

</script> 

<template>
    <div class="border-4 hover:bg-gray-100 transition-all  border-black p-2 h-32 sm:h-auto w-full grid place-content-center"
        :class="borderLimit"
        id="square">
        <span class="flex justify-center w-40 h-40 items-center text-6xl" :id="square" :class="{ 'opacity-40': hoverState }"
            @click="updateState" @mouseenter="setHover" @mouseleave="exitHover">
            <Equis v-if="signToUse == POSSIBLE_SIGNS.equis" :class="changeColorA" :style="`transition: color 0.${square}s`" />
            <Circle v-if="signToUse == POSSIBLE_SIGNS.circle" :class="changeColorB" :style="`transition: color 0.${square}s`" />
        </span>
    </div>
</template>

<style scoped>
.border-t-0 {
    border-top: none;
}

.border-b-0 {
    border-bottom: none;
}

.border-r-0 {
    border-right: none;
}

.border-l-0 {
    border-left: none;
}
</style>