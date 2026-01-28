import Game from "./core/game";
import Gameboard from "./core/gameboard";
import Player from "./core/player";
import Ship from "./core/ship";

import * as gameScreen from "./elements/game-screen";
import * as shipPlacementScreen from "./elements/ship-placement-screen";

function createGame(gameboard1, gameboard2) {
  return new Game(
    new Player("player1", gameboard1),
    new Player("player2", gameboard2),
  );
}

function updateBoards(game) {
  gameScreen.playerBoard.update(game.getCurrentPlayer().gameboard);
  gameScreen.enemyBoard.update(game.getCurrentEnemy().gameboard);
}

async function playGame(game) {
  while (true) {
    const { x, y } = await gameScreen.enemyBoard.waitClick();
    const isRoundPlayed = game.playRound(x, y);
    if (isRoundPlayed) {
      const winner = game.getWinner();
      if (winner) {
        alert(`${winner.name} is a winner! Congratulations!!!`);
        return;
      }
    }
    updateBoards(game);
  }
}

export default async function ScreenController() {
  gameScreen.init();
  shipPlacementScreen.init();
  shipPlacementScreen.show();
  const gameboard1 = await shipPlacementScreen.waitGameboard();
  const gameboard2 = await shipPlacementScreen.waitGameboard();
  shipPlacementScreen.hide();
  gameScreen.show();
  while (true) {
    const game = createGame(gameboard1, gameboard2);
    updateBoards(game);
    await playGame(game);
  }
}
