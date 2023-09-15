import { defineStore } from "pinia";


export const useBot = defineStore('useBot',{
    state: ()=> ({
        botOrPlayer: '',
        difficulty: 'Player',
        canPlay: true
    }),
    actions:{
        updateRival(rival){
            this.botOrPlayer = rival;
        },
        updateDifficulty(difficulty){
            this.difficulty = difficulty;
        },
        updateCanPlay(canPlay){
            this.canPlay = canPlay;
        }
    }
});