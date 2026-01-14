import "./event-handlers/toggle-player-button";

import * as boards from "./elements/boards";

import Gameboard from "./game/gameboard";
import Player from "./game/player";
import Ship from "./game/ship";

import * as gameState from "./states/game";
import * as screenController from "./screen";

async function main() {
  const gameboard1 = new Gameboard();
  const gameboard2 = new Gameboard();

  gameboard1.placeShip(new Ship(1), 1, 1, "horizontal");
  gameboard1.placeShip(new Ship(1), 10, 10, "horizontal");
  gameboard2.placeShip(new Ship(1), 1, 2, "horizontal");
  gameboard1.hit(10, 10);
  gameboard2.hit(1, 1);
  gameboard2.hit(1, 2);

  const player1 = new Player("p1", gameboard1);
  const player2 = new Player("p2", gameboard2);

  gameState.init(player1, player2);

  boards.init();
  screenController.update();
}

main();
