import Game from "./game/game";
import Gameboard from "./game/gameboard";
import Player from "./game/player";
import Ship from "./game/ship";

import * as boards from "./elements/boards";

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

export default function ScreenController() {
  boards.init();
  const game = createGame();
}
