import Game from "./core/game";
import Gameboard from "./core/gameboard";
import Player from "./core/player";
import Ship from "./core/ship";

import * as gameScreen from "./elements/game-screen";
import * as shipPlacementScreen from "./elements/ship-placement-screen";

gameScreen.init();
shipPlacementScreen.init();

function createGame(gameboard1, gameboard2) {
  return new Game(
    new Player("player1", gameboard1),
    new Player("player2", gameboard2),
  );
}

function createShips() {
  return [new Ship(3), new Ship(2), new Ship(1)];
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
        return winner;
      }
    }
    updateBoards(game);
  }
}

while (true) {
  shipPlacementScreen.show();
  const gameboard1 = await shipPlacementScreen.waitFilledBoard(
    new Gameboard(),
    createShips(),
  );

  const gameboard2 = await shipPlacementScreen.waitFilledBoard(
    new Gameboard(),
    createShips(),
  );

  shipPlacementScreen.hide();
  gameScreen.show();

  const game = createGame(gameboard1, gameboard2);
  updateBoards(game);
  const winner = await playGame(game);
  alert(`${winner.name} is a winner! Congratulations!!!`);
  gameScreen.hide();
}
