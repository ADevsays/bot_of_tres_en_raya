import {defineStore} from 'pinia';
import {POSSIBLE_SIGNS as SIGNS} from '../const/signs';

const POSSIBLE_SIGNS = [SIGNS.equis, SIGNS.circle];

let positionState = true;

export const useSignUseStore = defineStore('useSign', {
    state: ()=>({
        signToUse: POSSIBLE_SIGNS[1],
        finishPlay: false,
        winnerData: {}
    }),
    actions:{
        updateState(){
            const position = positionState ? 0 : 1;
            this.signToUse = POSSIBLE_SIGNS[position];
            positionState = !positionState;
        },
        finishGame(arrayWinner, player){
            this.finishPlay = true;
            this.winnerData = {
                winner: player,
                arrayWinner
            }
        },
        resetFinish(){
            this.finishPlay = false
        }
    }
}); 