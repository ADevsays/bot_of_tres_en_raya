import { defineStore } from "pinia";
import {getLocalS} from '../helpers/saveInLocalStorage';

const prevAudioState = getLocalS('Audio State') ?? true;
export const useAudio = defineStore('useAudio', {
    state: ()=>({
        canUseAudio: prevAudioState
    }),
    actions:{
        updateCanUseAudio(){
            this.canUseAudio = !this.canUseAudio;
        }
    }
});