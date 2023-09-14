<script>
import Square from './components/Square.vue';
import WinnerModal from './components/WinnerModal.vue';
import winnerConditional from './core/winnerConditional';
import Button from './components/button.vue';
import RivalModal from './components/rival_modal.vue';
import { useSignUseStore } from './store/signUse';
import { useBot } from './store/bot';
import { arrIn } from './helpers/arrIn';
import { Bot } from './core/Bot/brain'
import { POSSIBLE_SIGNS } from './const/signs';
import { WHO_PLAY } from './const/bot_or_player'
import { GAME_MODE } from './const/game_mode';

export default {
  components: {
    Square,
    WinnerModal,
    Button,
    RivalModal
  },
  data() {
    return {
      squares: Array(9).fill(0).map((_, i) => i + 1),
      positionPlayerA: [],
      positionPlayerB: [],
      winnerPlayer: '',
      thereWinner: false,
      selectRivalValue: '',
      myBot: {},
      difficulty: ''
    }
  },
  mounted() {
    this.$store = useSignUseStore();
    this.$storeBot = useBot();
    this.WHO_PLAY = WHO_PLAY;
    this.TIE = 'Empate';
    this.GAME_MODE = GAME_MODE;
  },
  watch: {
    difficulty(value) {
      this.myBot = new Bot(value);
    }
  },
  methods: {
    getPosition(value) {
      if (value.sign == POSSIBLE_SIGNS.equis) {
        this.positionPlayerA.push(value.position);
      } else {
        this.positionPlayerB.push(value.position);
      }
      const bothPlayers = this.positionPlayerA.concat(this.positionPlayerB);
      if (bothPlayers.length > 4) {
        this.getVictoryOrTie(bothPlayers.length, value.sign);
      }
      if (this.selectRivalValue == WHO_PLAY.bot) {
        this.botPlaying(value.sign);
      }
    },
    blockUserPlayment() {
      this.$storeBot.updateCanPlay(false);
      setTimeout(() => {
        this.$storeBot.updateCanPlay(true);
      }, 300);
    },
    botPlaying(shift) {
      if (shift == POSSIBLE_SIGNS.equis && !this.$store.finishPlay) {
        const playerMvts = this.positionPlayerA;
        if (this.positionPlayerB.length == 0) {
          this.blockUserPlayment();
          const firstMove = this.myBot.firstPlay(playerMvts);
          const element = this.myBot.getElement(firstMove);
          this.myBot.play(element);
        } else {
          const human = this.positionPlayerA;
          const bot = this.positionPlayerB;
          const movesToBlock = this.myBot.calcMove(human, bot);
          const bothPositions = this.positionPlayerA.concat(this.positionPlayerB);
          const closestToBlock = this.myBot.tryWin(movesToBlock, human);
          const moveToBlock = this.myBot.calcSquareEmpty(closestToBlock, bothPositions);
          const closetsToWin = this.myBot.tryWin(winnerConditional, bot);
          const moveToWin = this.myBot.calcSquareEmpty(closetsToWin, bothPositions);
          const moveToSelected = this.myBot.selectBlockOrWin({ moveToBlock, moveToWin, human, bot });
          if (moveToSelected.length < 2) {
            const element = this.myBot.getElement(moveToSelected[0]);
            this.blockUserPlayment();
            this.myBot.play(element);
          } else {
            const betterMove = this.myBot.selectCorner(moveToSelected);
            const element = this.myBot.getElement(betterMove);
            this.myBot.play(element);
          }
        }
      }
    },
    getVictoryOrTie(bothPlayers, sign) {
      if (this.checkWinner(this.positionPlayerA, sign)
        || this.checkWinner(this.positionPlayerB, sign)) {
        this.thereWinner = true;
        setTimeout(() => {
          this.thereWinner = false;
        }, 2000);
      } else if (bothPlayers == 9) {
        this.winnerPlayer = this.TIE;
        this.$store.finishGame([], '');
        setTimeout(() => {
          this.winnerPlayer = '';
        }, 2000);
      }
    },
    restartGame() {
      window.location.reload();
    },
    checkWinner(res, player) {
      for (let i = 0; i < winnerConditional.length; i++) {
        const [a, b, c] = winnerConditional[i];
        if (arrIn(res, a)
          && arrIn(res, b)
          && arrIn(res, c)) {
          this.winnerPlayer = player;
          this.$store.finishGame(winnerConditional[i], player);
          return true;
        }
      }
    },
    selectRival(rival) {
      this.$storeBot.updateRival(rival);
      this.selectRivalValue = this.$storeBot.botOrPlayer;
    },
    selectDifficulty(difficulty) {
      this.difficulty = difficulty;
      this.$store.resetFinish();
    }
  }
}
</script>






<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <h1 class="text-center text-5xl m-8 font-bold">Tres en raya</h1>
    <div class="grid grid-cols-3">
      <Square v-for="square in squares" :key="square" :square="square" @get-the-square="getPosition" />
    </div>
    <RivalModal :condition="!selectRivalValue" content="¿Contra quién vas a " sub="jugar?">
      <Button class="bg-emerald-600" :onClick="() => selectRival(this.WHO_PLAY.bot)">
        Bot
      </Button>
      <Button class="bg-red-700" :onClick="() => selectRival(this.WHO_PLAY.player)">
        Jugador
      </Button>
    </RivalModal>
    <RivalModal :condition="selectRivalValue != '' && !difficulty && selectRivalValue != WHO_PLAY.player"
      content="Selecciona tu " sub="dificultad">
      <Button class="bg-orange-600" :onClick="() => selectDifficulty(this.GAME_MODE.hard)">Difícil</Button>
      <Button class="bg-red-700" :onClick="() => selectDifficulty(this.GAME_MODE.impossible)">IMPOSIBLE</Button>
    </RivalModal>
    <WinnerModal :condition="thereWinner" :winnerPlayer="winnerPlayer" content="El ganador es " />
    <WinnerModal :condition="winnerPlayer == this.TIE" :winnerPlayer="winnerPlayer" content="Hay un " />
    <Button class="bg-indigo-600" :onClick="() => restartGame()">Reiniciar</Button>
  </div>
</template>

<style> @media (max-width: 624px) {
   *:not(#square) {
     transform: scale(.95);
   }

   #square span {
     /* background-color: black; */
     transform: scale(.78);
   }
 }
</style>