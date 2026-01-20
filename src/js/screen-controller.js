import Game from "./core/game";
import Gameboard from "./core/gameboard";
import Player from "./core/player";
import Ship from "./core/ship";

import { playerBoard, enemyBoard, init as initBoards } from "./elements/boards";

function createPlayer(name) {
  const gameboard = new Gameboard();
  gameboard.placeShip(new Ship(1), 6, 3);
  gameboard.placeShip(new Ship(1), 6, 5);
  gameboard.placeShip(new Ship(1), 8, 9);
  gameboard.placeShip(new Ship(1), 10, 9);
  gameboard.placeShip(new Ship(2), 1, 1, "vertical");
  gameboard.placeShip(new Ship(2), 2, 4, "horizontal");
  gameboard.placeShip(new Ship(2), 3, 10, "horizontal");
  gameboard.placeShip(new Ship(3), 2, 6, "horizontal");
  gameboard.placeShip(new Ship(3), 3, 8, "horizontal");
  gameboard.placeShip(new Ship(4), 8, 2, "vertical");
  return new Player(name, gameboard);
}

function createGame() {
  return new Game(createPlayer("player1"), createPlayer("player2"));
}

function updateBoards(game) {
  playerBoard.update(game.getCurrentPlayer().gameboard);
  enemyBoard.update(game.getCurrentEnemy().gameboard);
}

export default async function ScreenController() {
  initBoards();
  const game = createGame();
  updateBoards(game);

  while (true) {
    const { x, y } = await enemyBoard.waitClick();
    if (game.playRound(x, y)) {
      updateBoards(game);
    }
  }
}
