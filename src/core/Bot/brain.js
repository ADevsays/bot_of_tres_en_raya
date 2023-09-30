import { hasTwoSimilarElements } from "../../helpers/hasTwoElements";
import winnerConditional from "../winnerConditional";
import { GAME_MODE } from "../../const/game_mode";
import { CENTER_SQUARE } from "../../const/botConst";

export class Bot {
  constructor(difficulty) {
    this.difficulty = difficulty;
  };
  play(squareToPlay) {
    setTimeout(() => {
      squareToPlay.click();
    }, 300);
  };  
  getElement(id) {
    return document.getElementById(id);
  };
  firstPlay(arrayMvmts) {
    if (this.difficulty == GAME_MODE.hard) {
      const firstMove = arrayMvmts[0];
      const possibleMovs = Array.from(Array(10).keys())
        .filter(realMvs => realMvs != firstMove);
      const randomIndex = Math.floor(Math.random() * possibleMovs.length)
      return possibleMovs[randomIndex != 0 ? randomIndex : 1];
    } else {
      if (!arrayMvmts.includes(CENTER_SQUARE)) {
        return CENTER_SQUARE;
      }
      return this.calcRandomCorner();
    }
  };
  calcMove(humanMoves, botMoves) {
    //Check if player is able to win
    const humanSet = new Set(humanMoves);
    const botSet = new Set(botMoves);
    const possibleMoveOfPlayer = winnerConditional.filter(arrayWin => {
      const [a, b, c] = arrayWin;
      if (humanSet.has(a)
        || humanSet.has(b)
        || humanSet.has(c)) {
        return arrayWin;
      }
    });
    return possibleMoveOfPlayer.filter(currentArr => {
      const [a, b, c] = currentArr;
      if (!(botSet.has(a)
        || botSet.has(b)
        || botSet.has(c))) {
        return currentArr;
      }
    });
  };
  tryWin(possibleWin, moves) {
    let max = 0;
    let result = [];
    for (let i = 0; i < possibleWin.length; i++) {
      const subarray = possibleWin[i];
      let coincidences = 0;
      for (let j = 0; j < subarray.length; j++) {
        if (moves.includes(subarray[j])) {
          coincidences++;
        };
      };
      if (coincidences > max) {
        max = coincidences;
        result = subarray;
      };
    };
    return result;
  };
  calcSquareEmpty(closest, bothPositions) {
    return closest.filter(move => !bothPositions.includes(move));
  };
  selectBlockOrWin({ moveToBlock, moveToWin, human, bot }) {
    const both = human.concat(bot);
    const stateOfHuman = winnerConditional.filter(arrayWin => hasTwoSimilarElements(arrayWin, human));
    const stateOfBot = winnerConditional.filter(arrayWin => hasTwoSimilarElements(arrayWin, bot));
    const corners = [1, 3, 7, 9];
    let result = moveToWin;
    if (stateOfBot[0] && moveToWin[0]) {
      result = moveToWin;
    } else if (stateOfHuman[0] && moveToBlock[0]) {
      result = moveToBlock;
    }
    
    const exceptionWin = [...winnerConditional].splice(6,9);
    const humanExpeption = exceptionWin.filter(array=> hasTwoSimilarElements(array, human));

    if (hasTwoSimilarElements(corners, human) 
        && (!(stateOfBot[0]))
        && this.difficulty == GAME_MODE.impossible
        && humanExpeption[0]) {
        result = moveToWin;
    } else if ((!(stateOfHuman[0]) && !(stateOfBot[0])
      && this.difficulty == GAME_MODE.impossible)) {
        result = [this.calcRandomCorner(both)];
    }
    return moveToWin[0] ? result : moveToBlock;
  };
  selectCorner(array) {
    const cornersAndCenter = [1, 3, 7, 9, 5];
    const filterCorner = cornersAndCenter.filter(el => array.includes(el))[0];
    return filterCorner ? filterCorner : array[0];
  };
  calcRandomCorner(notMoves = []) {
    const corners = [1, 3, 7, 9];
    if (!notMoves[0]) {
      const randomIndex = Math.floor(Math.random() * (corners.length));
      return corners[randomIndex];
    }
    const cornersAvailable = corners.filter(corner => !notMoves.includes(corner));
    const randomIndex = Math.floor(Math.random() * (cornersAvailable.length));
    return cornersAvailable[randomIndex];
  };
}